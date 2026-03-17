import type { FastifyInstance } from 'fastify';
import { successResponse } from '../lib/response.js';

export default async function userRoutes(fastify: FastifyInstance) {
  // 获取当前用户信息
  fastify.get('/me', { onRequest: [fastify.authenticate] }, async (request) => {
    const { userId } = request.user;

    const user = await fastify.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        bio: true,
        createdAt: true,
        _count: {
          select: {
            projects: true,
            yarnStash: true,
            posts: true,
          },
        },
      },
    });

    if (!user) {
      throw fastify.httpErrors.notFound('用户不存在');
    }

    const { _count, createdAt, ...userData } = user;

    return successResponse({
      ...userData,
      createdAt: createdAt.toISOString(),
      projectCount: _count.projects,
      yarnCount: _count.yarnStash,
      postCount: _count.posts,
    });
  });
}
