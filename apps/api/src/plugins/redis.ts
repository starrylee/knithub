import fp from 'fastify-plugin';
import Redis from 'ioredis';
import type { FastifyInstance, FastifyPluginAsync } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    redis: Redis;
  }
}

const redisPlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const redis = new Redis(fastify.config.REDIS_URL);

  fastify.decorate('redis', redis);

  fastify.addHook('onClose', async () => {
    await redis.quit();
  });
};

export default fp(redisPlugin, { name: 'redis' });
