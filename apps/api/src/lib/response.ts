import type { ApiResponse, ApiError } from '@knithub/types';

export function successResponse<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data,
    error: null,
  };
}

export function errorResponse(code: string, message: string, details?: Record<string, string[]>): ApiResponse<never> {
  const error: ApiError = {
    code,
    message,
    ...(details && { details }),
  };

  return {
    success: false,
    data: null,
    error,
  };
}
