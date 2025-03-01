import { Page } from 'puppeteer';
import { pricerNormalizer } from '../utils';

export class BestBuy {
    async getPrice({ page }: { page: Page }): Promise<number | null> {
        const price = await page.evaluate(async () => {
            if (!document.getElementsByClassName('style-module_price__ql4Q1 style-module_mediumLarge__QtUDJ')[0]?.childNodes?.[0]?.textContent) {
                await new Promise((r) => setTimeout(r, 10000));
            }

            return document.getElementsByClassName('style-module_price__ql4Q1 style-module_mediumLarge__QtUDJ')[0]?.childNodes?.[0]?.textContent;
        });

        return price ? pricerNormalizer(price) : null;
    }
}
