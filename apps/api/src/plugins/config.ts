import fp from 'fastify-plugin';
import dotenv from 'dotenv';
import type { FastifyInstance, FastifyPluginAsync } from 'fastify';

dotenv.config();

export interface AppConfig {
  PORT: number;
  NODE_ENV: string;
  DATABASE_URL: string;
  REDIS_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  FRONTEND_URL: string;
}

declare module 'fastify' {
  interface FastifyInstance {
    config: AppConfig;
  }
}

const configPlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const config: AppConfig = {
    PORT: parseInt(process.env.PORT ?? '3000', 10),
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    DATABASE_URL: process.env.DATABASE_URL ?? '',
    REDIS_URL: process.env.REDIS_URL ?? 'redis://localhost:6379',
    JWT_SECRET: process.env.JWT_SECRET ?? 'default-secret-change-this',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '7d',
    FRONTEND_URL: process.env.FRONTEND_URL ?? 'http://localhost:5173',
  };

  fastify.decorate('config', config);
};

export default fp(configPlugin, { name: 'config' });
