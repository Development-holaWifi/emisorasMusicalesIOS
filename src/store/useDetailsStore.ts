import {create} from 'zustand';

type DetailsStore = {
  lastId: number | null;
  setLastId: (id: number|null) => void;
};

export const useDetailsStore = create<DetailsStore>(set => ({
  lastId: null,
  setLastId: id => set({lastId: id}),
}));
