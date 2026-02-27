'use client';

import { create } from 'zustand';

interface EntranceState {
  hasEntered: boolean;
  isAnimating: boolean;
  showSkip: boolean;
  setHasEntered: (value: boolean) => void;
  setIsAnimating: (value: boolean) => void;
  setShowSkip: (value: boolean) => void;
  skipEntrance: () => void;
  startEntrance: () => void;
}

export const useEntranceState = create<EntranceState>((set) => ({
  hasEntered: false,
  isAnimating: false,
  showSkip: true,
  setHasEntered: (value) => set({ hasEntered: value }),
  setIsAnimating: (value) => set({ isAnimating: value }),
  setShowSkip: (value) => set({ showSkip: value }),
  skipEntrance: () => set({ hasEntered: true, isAnimating: false, showSkip: false }),
  startEntrance: () => set({ isAnimating: true, showSkip: false }),
}));
