import { create } from 'zustand';
import type { AppUser, Circle, UserRole } from '../api/types';

interface AuthState {
  token: string | null;
  user: AppUser | null;
  circle: Circle | null;
  role: UserRole | null;
  login: (data: { token: string; user: AppUser; circle: Circle; role: UserRole }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  circle: null,
  role: null,
  login: ({ token, user, circle, role }) => set({ token, user, circle, role }),
  logout: () => set({ token: null, user: null, circle: null, role: null }),
}));