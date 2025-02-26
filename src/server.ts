import Fastify from 'fastify';

const server = Fastify({ logger: true });

server.get('/', async (request, reply) => {
    console.log(request);

    return { hello: 'world' };
});

(async () => {
    await server.listen({
        port: 4242,
    });

    console.log(server.server.address());
})();
