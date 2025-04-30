import {create} from 'zustand';

type DetailsStore = {
  lastId: number | null;
  setLastId: (id: number) => void;
};

export const useDetailsStore = create<DetailsStore>(set => ({
  lastId: null,
  setLastId: id => set({lastId: id}),
}));
