import type { FastifyInstance } from 'fastify';
import { successResponse } from '../lib/response.js';

export default async function statsRoutes(fastify: FastifyInstance) {
  // 获取首页统计数据
  fastify.get('/', { onRequest: [fastify.authenticate] }, async (request) => {
    const { userId } = request.user;

    const [activeProjects, yarnStashCount, completedProjects, totalPosts] = await Promise.all([
      fastify.prisma.project.count({
        where: { userId, status: 'active' },
      }),
      fastify.prisma.yarnStash.count({
        where: { userId },
      }),
      fastify.prisma.project.count({
        where: { userId, status: 'completed' },
      }),
      fastify.prisma.post.count({
        where: { userId },
      }),
    ]);

    return successResponse({
      activeProjects,
      yarnStashCount,
      completedProjects,
      totalPosts,
    });
  });
}
