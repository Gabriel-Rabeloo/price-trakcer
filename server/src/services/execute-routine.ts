import { Repository } from '../database/repository';
import { Browser } from 'puppeteer';
import { BestBuy } from '../adapters/best-buy';
import { GetPriceAdapter } from '../adapters/interface';
import { Aliexpress } from '../adapters/aliexpress';
import { validURL } from '../utils';
export class Routine {
    private adapters: Record<string, { adapter: GetPriceAdapter; name: string }> = {
        'https://www.bestbuy.ca': { adapter: new BestBuy(), name: BestBuy.name },
        'https://www.aliexpress.com': { adapter: new Aliexpress(), name: Aliexpress.name },
    };

    constructor(
        private readonly repository: Repository,
        private browser: Browser,
    ) {}

    private getAdapterByUrl(url: string): { adapter: GetPriceAdapter; name: string } | null {
        for (const key in this.adapters) {
            if (url.startsWith(key)) {
                return this.adapters[key];
            }
        }
        return null;
    }

    async execute(): Promise<void> {
        const products = await this.repository.getProducts({ include: { priceHistory: false } });

        console.log('Executing routine for products:', products.length);

        const page = await this.browser.newPage();

        for (const product of products) {
            if (!validURL(product.url)) {
                console.log('Invalid URL for product:', product.name);
                continue;
            }
            const { adapter, name } = this.getAdapterByUrl(product.url) || {};

            if (!adapter) {
                console.log(`Adapter not found for product: ${product.name}`);
                continue;
            }

            console.log(`Getting price from ${name}`);

            await page.goto(product.url, { waitUntil: ['networkidle0', 'networkidle2'], timeout: 0 });

            const price = await adapter.getPrice({
                page,
            });

            if (!price) {
                console.log(`Price not found for product: ${product.name}`);
                continue;
            }

            console.log(`Price found for ${product.name} $${price}`);

            await this.repository.setPrice({
                productId: product.id,
                price,
            });
        }

        await page.close();

        console.log('finished routine');
    }
}
