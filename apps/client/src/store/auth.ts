import { create } from 'zustand';
import { AppUser, Circle, UserRole } from '@/api/types';

type AuthState = {
  token?: string;
  user?: AppUser;
  circle?: Circle;
  role?: UserRole;
  login: (p: { token: string; user: AppUser; circle: Circle; role: UserRole }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: undefined,
  user: undefined,
  circle: undefined,
  role: undefined,
  login: ({ token, user, circle, role }) => set({ token, user, circle, role }),
  logout: () => set({ token: undefined, user: undefined, circle: undefined, role: undefined }),
}));
