import {create} from 'zustand';

interface PlayerState {
  isPlaying: boolean;
  setIsPlaying: (state: boolean) => void;
}

export const usePlayerStore = create<PlayerState>(set => ({
  isPlaying: false,
  setIsPlaying: (state: boolean) => set({isPlaying: state}),
}));
