import { Browser } from 'puppeteer';

import { validURL } from '../utils';
import { Repository } from '../database/repository';

import { BestBuy } from '../strategies/best-buy';
import { GetPriceAdapter } from '../strategies/abstract';
import { Aliexpress } from '../strategies/aliexpress';
import { Apple } from '../strategies/apple';

export class Routine {
    private strategies: Record<string, { adapter: GetPriceAdapter; name: string }> = {
        'https://www.bestbuy.ca': { adapter: new BestBuy(), name: BestBuy.name },
        'https://www.aliexpress.com': { adapter: new Aliexpress(), name: Aliexpress.name },
        'https://www.apple.com/': { adapter: new Apple(), name: Apple.name },
    };

    constructor(
        private readonly repository: Repository,
        private browser: Browser,
    ) {}

    private defineStrategyByUrl(url: string): { adapter: GetPriceAdapter; name: string } | null {
        for (const key in this.strategies) {
            if (url.startsWith(key)) {
                return this.strategies[key];
            }
        }
        return null;
    }

    async execute(): Promise<void> {
        const products = await this.repository.getProducts({ include: { priceHistory: false } });

        console.log('Executing routine for products:', products.length);

        const page = await this.browser.newPage();

        const counters = {
            total: products.length,
            success: 0,
            error: 0,
            notFound: 0,
        };

        for (const product of products) {
            try {
                if (!validURL(product.url)) {
                    console.log('Invalid URL for product:', product.name);
                    counters.error++;
                    continue;
                }
                const { adapter, name } = this.defineStrategyByUrl(product.url) || {};

                if (!adapter) {
                    counters.notFound++;
                    console.log(`Adapter not found for product: ${product.name}`);
                    continue;
                }

                console.log(`Navigating to ${product.url}`);
                await page.goto(product.url, { waitUntil: ['networkidle0', 'networkidle2'], timeout: 0 });

                console.log(`Getting price from ${name}`);

                const price = await adapter.getPrice({
                    page,
                });

                if (!price) {
                    counters.notFound++;
                    console.log(`Price not found for product: ${product.name}`);
                    continue;
                }

                console.log(`Price found for ${product.name} $${price}`);

                await this.repository.setPrice({
                    productId: product.id,
                    price,
                });
            } catch (err) {
                counters.error++;
                console.log('Error while processing product:', product.name, err);
            }
        }

        await page.close();

        console.log('finished routine');
        console.log(counters);
    }
}
