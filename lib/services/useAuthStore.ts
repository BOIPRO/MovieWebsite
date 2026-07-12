import { create } from 'zustand';

// 1. Định nghĩa Interface để TypeScript không báo lỗi nữa
interface AuthState {
  accessToken: string | null;
  isAuthChecked: boolean;
  setAccessToken: (token: string) => void;
  clearAuth: () => void;
}

// 2. Định nghĩa store với kiểu AuthState
export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isAuthChecked: false,

  setAccessToken: (token: string) => set({
    accessToken: token,
    isAuthChecked: true, 
  }),

  clearAuth: () => set({
    accessToken: null,
    isAuthChecked: false, 
  }),
}));