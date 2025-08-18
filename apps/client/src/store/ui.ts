import { create } from 'zustand';

interface UIState {
  loading: boolean;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  setLoading: (loading: boolean) => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  hideToast: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  loading: false,
  toast: null,
  setLoading: (loading) => set({ loading }),
  showToast: (message, type = 'info') => set({ toast: { message, type } }),
  hideToast: () => set({ toast: null }),
}));