import Fastify, { FastifyRequest } from 'fastify';
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

    try {
        await routine.execute();
        return reply.status(204).send();
    } catch (e) {
        console.log(e);
        return reply.status(500).send({ message: 'Internal server error' });
    } finally {
        await browser.close();
    }
});

server.get('/products', async (request, reply) => {
    const repository = new Repository();
    return repository.getProducts();
});

server.post('/products', async ({ body: { url, name } }: FastifyRequest<{ Body: Partial<{ name: string; url: string }> }>, reply) => {
    const repository = new Repository();

    if (!url || !name) {
        return reply.status(422).send({ message: 'Invalid request' });
    }

    return repository.addProduct({ url, name });
});

(async () => {
    await server.register(cors, {
        origin: '*',
    });
    await server.listen({
        port: 4242,
    });
})();
