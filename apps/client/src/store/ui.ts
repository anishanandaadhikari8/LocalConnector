import { create } from 'zustand';

type UIState = {
  toast?: { kind: 'success' | 'error' | 'info'; msg: string };
  setToast: (t?: UIState['toast']) => void;
};

export const useUIStore = create<UIState>((set) => ({
  toast: undefined,
  setToast: (toast) => set({ toast }),
}));
