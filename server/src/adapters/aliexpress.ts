import { Page } from 'puppeteer';
import { pricerNormalizer } from '../utils';
import { GetPriceAdapter } from './interface';

export class Aliexpress implements GetPriceAdapter {
    async getPrice({ page }: { page: Page }): Promise<number | null> {
        const price = await page.evaluate(async () => {
            if (!document.getElementsByClassName('price--currentPriceText--V8_y_b5 pdp-comp-price-current product-price-value')?.[0]?.textContent) {
                await new Promise((r) => setTimeout(r, 100000));
            }

            return document.getElementsByClassName('price--currentPriceText--V8_y_b5 pdp-comp-price-current product-price-value')?.[0]?.textContent;
        });

        return price ? pricerNormalizer(price) : null;
    }
}
