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
    apiClient.post<ApiResponse<AuthResponse>>('/api/auth/login', data),
  
  register: (data: RegisterRequest) =>
    apiClient.post<ApiResponse<AuthResponse>>('/api/auth/register', data),
};

// 用户相关 API
export const userApi = {
  getMe: () =>
    apiClient.get<ApiResponse<User & { projectCount: number; yarnCount: number; postCount: number }>>('/api/users/me'),
};

// 统计相关 API
export const statsApi = {
  getStats: () =>
    apiClient.get<ApiResponse<DashboardStats>>('/api/stats'),
};

// 项目相关 API
export const projectApi = {
  getProjects: (params?: { status?: ProjectStatus; page?: number; limit?: number }) =>
    apiClient.get<ApiResponse<PaginatedData<Project>>>('/api/projects', { params }),
};

// Feed 相关 API
export const feedApi = {
  getFeed: (params?: { page?: number; limit?: number }) =>
    apiClient.get<ApiResponse<PaginatedData<PostWithUser>>>('/api/feed', { params }),
};
