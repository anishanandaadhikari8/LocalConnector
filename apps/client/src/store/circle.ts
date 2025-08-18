import { create } from 'zustand';
import type { Circle } from '../api/types';

interface CircleState {
  circle: Circle | null;
  features: string[];
  setCircle: (circle: Circle, features: string[]) => void;
  clearCircle: () => void;
}

export const useCircleStore = create<CircleState>((set) => ({
  circle: null,
  features: [],
  setCircle: (circle, features) => set({ circle, features }),
  clearCircle: () => set({ circle: null, features: [] }),
}));