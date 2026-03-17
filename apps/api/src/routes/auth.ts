import bcrypt from 'bcryptjs';
import type { FastifyInstance } from 'fastify';
import { successResponse, errorResponse } from '../lib/response.js';
import { registerSchema, loginSchema } from '../lib/schemas.js';
import type { AuthResponse } from '@knithub/types';

export default async function authRoutes(fastify: FastifyInstance) {
  // 注册
  fastify.post('/register', async (request, reply) => {
    const result = registerSchema.safeParse(request.body);
    
    if (!result.success) {
      reply.status(400);
      return errorResponse('VALIDATION_ERROR', '输入数据验证失败', result.error.flatten().fieldErrors);
    }

    const { email, username, password } = result.data;

    // 检查邮箱是否已存在
    const existingEmail = await fastify.prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      reply.status(409);
      return errorResponse('EMAIL_EXISTS', '该邮箱已被注册');
    }

    // 检查用户名是否已存在
    const existingUsername = await fastify.prisma.user.findUnique({
      where: { username },
    });

    if (existingUsername) {
      reply.status(409);
      return errorResponse('USERNAME_EXISTS', '该用户名已被使用');
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建用户
    const user = await fastify.prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        bio: true,
        createdAt: true,
      },
    });

    // 生成 JWT
    const accessToken = await reply.jwtSign({ userId: user.id, email: user.email });

    const response: AuthResponse = {
      user: {
        ...user,
        createdAt: user.createdAt.toISOString(),
      },
      tokens: {
        accessToken,
        refreshToken: accessToken, // 简化处理，实际应该生成不同的 token
      },
    };

    return successResponse(response);
  });

  // 登录
  fastify.post('/login', async (request, reply) => {
    const result = loginSchema.safeParse(request.body);
    
    if (!result.success) {
      reply.status(400);
      return errorResponse('VALIDATION_ERROR', '输入数据验证失败', result.error.flatten().fieldErrors);
    }

    const { email, password } = result.data;

    // 查找用户
    const user = await fastify.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      reply.status(401);
      return errorResponse('INVALID_CREDENTIALS', '邮箱或密码错误');
    }

    // 验证密码
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      reply.status(401);
      return errorResponse('INVALID_CREDENTIALS', '邮箱或密码错误');
    }

    // 生成 JWT
    const accessToken = await reply.jwtSign({ userId: user.id, email: user.email });

    const response: AuthResponse = {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        bio: user.bio,
        createdAt: user.createdAt.toISOString(),
      },
      tokens: {
        accessToken,
        refreshToken: accessToken,
      },
    };

    return successResponse(response);
  });
}
