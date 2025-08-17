import { create } from 'zustand';
import { Circle } from '@/api/types';

type CircleState = {
  circle?: Circle;
  features: string[];
  setCircle: (c: Circle, features: string[]) => void;
};

export const useCircleStore = create<CircleState>((set) => ({
  circle: undefined,
  features: [],
  setCircle: (circle, features) => set({ circle, features }),
}));
