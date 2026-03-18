import apiClient from './axios';
import type {
  ApiResponse,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
  DashboardStats,
  PaginatedData,
  Project,
  PostWithUser,
  ProjectStatus,
} from '@knithub/types';

// 认证相关 API
export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post('/api/auth/login', data) as Promise<ApiResponse<AuthResponse>>,

  register: (data: RegisterRequest) =>
    apiClient.post('/api/auth/register', data) as Promise<ApiResponse<AuthResponse>>,
};

// 用户相关 API
export const userApi = {
  getMe: () =>
    apiClient.get('/api/users/me') as Promise<ApiResponse<User & { projectCount: number; yarnCount: number; postCount: number }>>,
};

// 统计相关 API
export const statsApi = {
  getStats: () =>
    apiClient.get('/api/stats') as Promise<ApiResponse<DashboardStats>>,
};

// 项目相关 API
export const projectApi = {
  getProjects: (params?: { status?: ProjectStatus; page?: number; limit?: number }) =>
    apiClient.get('/api/projects', { params }) as Promise<ApiResponse<PaginatedData<Project>>>,
};

// Feed 相关 API
export const feedApi = {
  getFeed: (params?: { page?: number; limit?: number }) =>
    apiClient.get('/api/feed', { params }) as Promise<ApiResponse<PaginatedData<PostWithUser>>>,
};
