import { Repository } from '../database/repository';
import { Browser } from 'puppeteer';
import { BestBuy } from '../adapters/best-buy';
export class Routine {
    constructor(
        private readonly repository: Repository,
        private browser: Browser,
    ) {}

    async execute(): Promise<void> {
        console.log('Executing routine');

        const products = await this.repository.getProducts();
        const scrapedAt = new Date();
        products.push({
            id: 2,
            name: 'iPhone 13 Pro',
            url: 'https://apple.com',
        });

        for (const product of products) {
            if (!product.url.startsWith('https://www.bestbuy.ca')) {
                continue;
            }

            // if (product.id === 34) continue;

            const page = await this.browser.newPage();

            const price = await BestBuy.getPrice({
                url: product.url,
                page,
            });

            if (!price) {
                console.log(`Price not found for product: ${product.name}`);
                continue;
            }

            console.log(`${product.name} oioioi ${price}`);

            await Promise.all([
                this.repository.setPrice({
                    productId: product.id,
                    price,
                    scrapedAt,
                }),
                page.close(),
            ]);
        }
    }
}
