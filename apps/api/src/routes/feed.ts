import type { FastifyInstance } from 'fastify';
import { successResponse } from '../lib/response.js';
import { feedQuerySchema } from '../lib/schemas.js';

export default async function feedRoutes(fastify: FastifyInstance) {
  // 获取社区动态 Feed
  fastify.get('/', async (request, reply) => {
    const result = feedQuerySchema.safeParse(request.query);
    
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

    const { page, limit } = result.data;

    const [posts, total] = await Promise.all([
      fastify.prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              username: true,
              avatar: true,
            },
          },
        },
      }),
      fastify.prisma.post.count(),
    ]);

    type PostWithUser = {
      id: string;
      content: string;
      imageUrl: string | null;
      userId: string;
      likesCount: number;
      commentsCount: number;
      createdAt: Date;
      updatedAt: Date;
      user: {
        id: string;
        username: string;
        avatar: string | null;
      };
    };

    return successResponse({
      items: (posts as PostWithUser[]).map((p) => ({
        id: p.id,
        content: p.content,
        imageUrl: p.imageUrl,
        userId: p.userId,
        likesCount: p.likesCount,
        commentsCount: p.commentsCount,
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
        user: p.user,
      })),
      total,
      page,
      limit,
      hasMore: page * limit < total,
    });
  });
}
