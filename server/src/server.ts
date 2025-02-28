import Fastify from 'fastify';
import puppeteer from 'puppeteer';
import cors from '@fastify/cors';

import { Repository } from './database/repository';
import { Routine } from './services/execute-routine';

const server = Fastify({ logger: true });

server.post('/run', async (request, reply) => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const repository = new Repository();

    const routine = new Routine(repository, browser);
    await routine.execute();

    await browser.close();

    return reply.status(204).send();
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
