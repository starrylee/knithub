import Fastify from 'fastify';
import cors from '@fastify/cors';
import sensible from '@fastify/sensible';

import configPlugin from './plugins/config.js';
import prismaPlugin from './plugins/prisma.js';
import redisPlugin from './plugins/redis.js';
import jwtPlugin from './plugins/jwt.js';

import healthRoutes from './routes/health.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import projectRoutes from './routes/projects.js';
import feedRoutes from './routes/feed.js';
import statsRoutes from './routes/stats.js';

async function bootstrap() {
  const fastify = Fastify({
    logger: {
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    },
  });

  // 注册 @fastify/sensible（提供 httpErrors 等工具）
  await fastify.register(sensible);

  // 注册配置插件
  await fastify.register(configPlugin);

  // 注册 CORS
  await fastify.register(cors, {
    origin: fastify.config.FRONTEND_URL,
    credentials: true,
  });

  // 注册数据库和缓存插件
  await fastify.register(prismaPlugin);
  await fastify.register(redisPlugin);
  await fastify.register(jwtPlugin);

  // 注册路由
  await fastify.register(healthRoutes, { prefix: '/api/health' });
  await fastify.register(authRoutes, { prefix: '/api/auth' });
  await fastify.register(userRoutes, { prefix: '/api/users' });
  await fastify.register(projectRoutes, { prefix: '/api/projects' });
  await fastify.register(feedRoutes, { prefix: '/api/feed' });
  await fastify.register(statsRoutes, { prefix: '/api/stats' });

  // 错误处理
  fastify.setErrorHandler((error, _request, reply) => {
    fastify.log.error(error);

    if (error.validation) {
      reply.status(400).send({
        success: false,
        data: null,
        error: {
          code: 'VALIDATION_ERROR',
          message: '请求数据验证失败',
          details: error.message,
        },
      });
      return;
    }

    const statusCode = error.statusCode ?? 500;
    
    reply.status(statusCode).send({
      success: false,
      data: null,
      error: {
        code: error.code ?? 'INTERNAL_ERROR',
        message: statusCode === 500 ? '服务器内部错误' : error.message,
      },
    });
  });

  // 启动服务器
  try {
    await fastify.listen({ port: fastify.config.PORT, host: '0.0.0.0' });
    fastify.log.info(`🚀 Server running at http://localhost:${fastify.config.PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

bootstrap();
