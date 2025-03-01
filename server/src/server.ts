import Fastify, { FastifyRequest } from 'fastify';
import cors from '@fastify/cors';
import cron from 'node-cron';

import { Repository } from './database/repository';
import { scrapeTask } from './scrape';

const server = Fastify({ logger: false });

server.post('/run', (_request, reply) => {
    console.log('Starting scraping task from API');
    scrapeTask();
    reply.status(202);
});

server.get('/products', async (_request, _reply) => {
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
        host: 'RENDER' in process.env ? `0.0.0.0` : `localhost`,
        port: Number(process.env.PORT || 4242),
    });

    cron.schedule(process.env.SCRAPE_SCHEDULE || '0 */6 * * *', () => {
        console.log('Starting scraping task from CRON');
        scrapeTask();
    });
})();
