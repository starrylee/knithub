import type { FastifyInstance } from 'fastify';
import { successResponse } from '../lib/response.js';

export default async function healthRoutes(fastify: FastifyInstance) {
  fastify.get('/', async () => {
    return successResponse({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'knithub-api',
      version: '1.0.0',
    });
  });
}
