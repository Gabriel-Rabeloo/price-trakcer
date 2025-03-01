import { Page } from 'puppeteer';

export interface GetPriceAdapter {
    getPrice({ page }: { page: Page }): Promise<number | null>;
}
