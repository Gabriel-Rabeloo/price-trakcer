import puppeteer from 'puppeteer';
import { Repository } from './database/repository';
import { Routine } from './services/execute-routine';

export const scrapeTask = async () => {
    const browser = await puppeteer.launch({
        headless: 'shell',
        args: ['--lang=en-US'],
        env: {
            LANG: 'en-US',
        },
    });
    const repository = new Repository();
    const routine = new Routine(repository, browser);

    try {
        await routine.execute();
    } catch (e) {
        console.log('Error in scrapeTask:', e);
    } finally {
        await browser.close();
    }
};
