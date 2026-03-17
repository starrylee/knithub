// ==================== 用户相关 ====================

export interface User {
  id: string;
  email: string;
  username: string;
  avatar: string | null;
  bio: string | null;
  createdAt: string;
}

export interface UserWithStats extends User {
  projectCount: number;
  yarnCount: number;
  postCount: number;
}

// ==================== 项目相关 ====================

export type ProjectStatus = 'active' | 'completed' | 'hibernating';

export interface Project {
  id: string;
  title: string;
  description: string | null;
  status: ProjectStatus;
  progress: number;
  patternName: string | null;
  coverImage: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectWithUser extends Project {
  user: Pick<User, 'id' | 'username' | 'avatar'>;
}

// ==================== 线材库存相关 ====================

export type YarnWeight = 'lace' | 'fingering' | 'sport' | 'dk' | 'worsted' | 'bulky' | 'super-bulky';

export interface YarnStash {
  id: string;
  brand: string;
  name: string;
  color: string;
  colorCode: string | null;
  weight: YarnWeight;
  quantity: number;
  unit: 'skeins' | 'grams' | 'yards';
  notes: string | null;
  userId: string;
  createdAt: string;
}

// ==================== 帖子/作品相关 ====================

export interface Post {
  id: string;
  content: string;
  imageUrl: string | null;
  userId: string;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PostWithUser extends Post {
  user: Pick<User, 'id' | 'username' | 'avatar'>;
}

// ==================== API 响应 ====================

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: ApiError | null;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

export interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// ==================== 认证相关 ====================

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

// ==================== 首页统计 ====================

export interface DashboardStats {
  activeProjects: number;
  yarnStashCount: number;
  completedProjects: number;
  totalPosts: number;
}

// ==================== Feed 查询参数 ====================

export interface FeedQueryParams {
  page?: number;
  limit?: number;
}

export interface ProjectsQueryParams {
  status?: ProjectStatus;
  page?: number;
  limit?: number;
}
