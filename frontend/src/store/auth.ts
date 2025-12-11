import { create } from 'zustand';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  initializeAuth: () => void;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  isInitialized: false,
  initializeAuth: () => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    set({ token, isAuthenticated: !!token, isInitialized: true });
  },
  login: (token) => {
    localStorage.setItem('token', token);
    set({ token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, isAuthenticated: false });
  },
}));
