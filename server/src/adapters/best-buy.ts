import { Page } from 'puppeteer';
import { pricerNormalizer } from '../utils';
import { GetPriceAdapter } from './interface';

export class BestBuy implements GetPriceAdapter {
    async getPrice({ page }: { page: Page }): Promise<number | null> {
        const price = await page.evaluate(async () => {
            let tries = 0;

            while (
                !document.getElementsByClassName('price--currentPriceText--V8_y_b5 pdp-comp-price-current product-price-value')?.[0]?.textContent &&
                tries < 200
            ) {
                await new Promise((r) => setTimeout(r, 1000));
                tries++;
            }

            return document.getElementsByClassName('style-module_price__ql4Q1 style-module_mediumLarge__QtUDJ')[0]?.childNodes?.[0]?.textContent;
        });

        return price ? pricerNormalizer(price) : null;
    }
}
