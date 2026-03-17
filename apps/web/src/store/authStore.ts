import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AuthTokens } from '@knithub/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  setAuth: (user: User, tokens: AuthTokens) => void;
  clearAuth: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      setAuth: (user, tokens) => {
        localStorage.setItem('knithub_token', tokens.accessToken);
        set({ user, token: tokens.accessToken, isLoggedIn: true });
      },
      clearAuth: () => {
        localStorage.removeItem('knithub_token');
        set({ user: null, token: null, isLoggedIn: false });
      },
      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
    }),
    {
      name: 'knithub-auth',
      partialize: (state) => ({ user: state.user, token: state.token, isLoggedIn: state.isLoggedIn }),
    }
  )
);
