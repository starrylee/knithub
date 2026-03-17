import { z } from 'zod';

// 用户相关 Schema
export const registerSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
  username: z.string().min(2, '用户名至少需要2个字符').max(20, '用户名最多20个字符'),
  password: z.string().min(6, '密码至少需要6个字符'),
});

export const loginSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(1, '请输入密码'),
});

// 分页相关 Schema
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
});

// 项目查询 Schema
export const projectQuerySchema = z.object({
  status: z.enum(['active', 'completed', 'hibernating']).optional(),
  ...paginationSchema.shape,
});

// Feed 查询 Schema
export const feedQuerySchema = paginationSchema;

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type ProjectQueryInput = z.infer<typeof projectQuerySchema>;
export type FeedQueryInput = z.infer<typeof feedQuerySchema>;
