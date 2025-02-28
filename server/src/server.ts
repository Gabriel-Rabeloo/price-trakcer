import Fastify from 'fastify';
import puppeteer from 'puppeteer';
import cors from '@fastify/cors';

import { Repository } from './database/repository';

const server = Fastify({ logger: true });

const url = 'https://www.apple.com/ca/shop/buy-iphone/iphone-16-pro';

server.post('/run', async (request, reply) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.setViewport({ width: 1920, height: 1080 });
    const data = await page.evaluate(() => {
        const scriptTag = document.getElementById('metrics');
        const jsonData = JSON.parse(scriptTag?.textContent || '');

        const iphonePrices: Array<{ price: number; name: string }> = jsonData.data.products.map((product: { price: { fullPrice: number }; name: string }) => {
            return { price: product.price.fullPrice + Math.floor(Math.random() * 6000) + 1, name: product.name };
        });
        return iphonePrices;
    });

    const repository = new Repository();

    for (const product of data) {
        const productExists = await repository.getProductByName(product.name);
        const databaseProduct = productExists ?? (await repository.addProduct({ url, name: product.name }));

        await repository.setPrice({ productId: databaseProduct.id, price: product.price });
    }

    return data;
});

server.get('/products', async (request, reply) => {
    const repository = new Repository();
    return repository.getProducts();
});

(async () => {
    await server.register(cors, {
        origin: '*',
    });
    await server.listen({
        port: 4242,
    });
})();
