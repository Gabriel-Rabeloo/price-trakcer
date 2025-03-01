import { Page } from 'puppeteer';
import { pricerNormalizer } from '../utils';

export class BestBuy {
    static async getPrice({ url, page }: { url: string; page: Page }): Promise<number | null> {
        await page.goto(url, { waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2'], timeout: 0 });
        await page.setViewport({ width: 1920, height: 1080 });
        const price = await page.evaluate(async () => {
            if (!document.getElementsByClassName('style-module_price__ql4Q1 style-module_mediumLarge__QtUDJ')[0]?.childNodes?.[0]?.textContent) {
                await new Promise((r) => setTimeout(r, 10000));
            }

            return document.getElementsByClassName('style-module_price__ql4Q1 style-module_mediumLarge__QtUDJ')[0]?.childNodes?.[0]?.textContent;
        });

        return price ? pricerNormalizer(price) : null;
    }
}
