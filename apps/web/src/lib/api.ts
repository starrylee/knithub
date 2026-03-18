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
  login: async (data: LoginRequest) => {
    const res = await apiClient.post<ApiResponse<AuthResponse>>('/api/auth/login', data);
    return res.data;
  },
  
  register: async (data: RegisterRequest) => {
    const res = await apiClient.post<ApiResponse<AuthResponse>>('/api/auth/register', data);
    return res.data;
  },
};

// 用户相关 API
export const userApi = {
  getMe: async () => {
    const res = await apiClient.get<ApiResponse<User & { projectCount: number; yarnCount: number; postCount: number }>>('/api/users/me');
    return res.data;
  },
};

// 统计相关 API
export const statsApi = {
  getStats: async () => {
    const res = await apiClient.get<ApiResponse<DashboardStats>>('/api/stats');
    return res.data;
  },
};

// 项目相关 API
export const projectApi = {
  getProjects: async (params?: { status?: ProjectStatus; page?: number; limit?: number }) => {
    const res = await apiClient.get<ApiResponse<PaginatedData<Project>>>('/api/projects', { params });
    return res.data;
  },
};

// Feed 相关 API
export const feedApi = {
  getFeed: async (params?: { page?: number; limit?: number }) => {
    const res = await apiClient.get<ApiResponse<PaginatedData<PostWithUser>>>('/api/feed', { params });
    return res.data;
  },
};
