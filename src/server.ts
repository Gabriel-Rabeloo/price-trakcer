import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const server = Fastify({ logger: true });

const prisma = new PrismaClient();

server.get('/', async (request, reply) => {
    await prisma.product.create({
        data: {
            name: 'oi',
            url: `http://localhost:8080${Math.random()}`,
        },
    });

    const products = await prisma.product.findMany();

    return { products };
});

(async () => {
    await server.listen({
        port: 4242,
    });

    console.log(server.server.address());
})();
