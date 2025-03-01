import { GetPriceAdapter } from './abstract';
import { Page } from 'puppeteer';
import { pricerNormalizer } from '../utils';

export class Apple extends GetPriceAdapter {
    protected priceClassname = 'rc-prices-fullprice';

    async getPrice({ page }: { page: Page }): Promise<number | null> {
        const price = await page.evaluate(
            async ({ priceClassname, tries, interval }) => {
                let i = 0;

                while (!document.getElementsByClassName(priceClassname)[0]?.textContent && i < tries) {
                    await new Promise((r) => setTimeout(r, interval));
                    i++;
                }

                return document.getElementsByClassName(priceClassname)[0]?.textContent;
            },
            { priceClassname: this.priceClassname, tries: this.defaultTries, interval: this.defaultInterval },
        );

        return price ? pricerNormalizer(price) : null;
    }
}
