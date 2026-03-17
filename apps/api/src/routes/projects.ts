import type { FastifyInstance } from 'fastify';
import { successResponse } from '../lib/response.js';
import { projectQuerySchema } from '../lib/schemas.js';
import type { ProjectStatus } from '@knithub/types';

export default async function projectRoutes(fastify: FastifyInstance) {
  // 获取项目列表（支持按状态筛选）
  fastify.get('/', { onRequest: [fastify.authenticate] }, async (request, reply) => {
    const result = projectQuerySchema.safeParse(request.query);
    
    if (!result.success) {
      reply.status(400);
      return {
        success: false,
        data: null,
        error: {
          code: 'VALIDATION_ERROR',
          message: '查询参数验证失败',
        },
      };
    }

    const { status, page, limit } = result.data;
    const { userId } = request.user;

    const where = {
      userId,
      ...(status && { status: status as ProjectStatus }),
    };

    const [projects, total] = await Promise.all([
      fastify.prisma.project.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          progress: true,
          patternName: true,
          coverImage: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      fastify.prisma.project.count({ where }),
    ]);

    return successResponse({
      items: projects.map(p => ({
        ...p,
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
      })),
      total,
      page,
      limit,
      hasMore: page * limit < total,
    });
  });
}
