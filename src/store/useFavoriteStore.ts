// import {create} from 'zustand';

// interface FavoriteState {
//   favorites: number[];
//   toggleFavorite: (id: number) => void;
//   isFavorite: (id: number) => boolean;
// }

// export const useFavoritesStore = create<FavoriteState>((set, get) => ({
//   favorites: [],
//   toggleFavorite: (id: number) => {
//     const favorites = get().favorites;
//     if (favorites.includes(id)) {
//       set({favorites: favorites.filter(favId => favId !== id)});
//     } else {
//       set({favorites: [...favorites, id]});
//     }
//   },
//   isFavorite: (id: number) => {
//     return get().favorites.includes(id);
//   },
// }));

import {create} from 'zustand';
import {persist, devtools, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoriteState {
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoriteState>()(
  persist(
    devtools(
      (set, get) => ({
        favorites: [],
        toggleFavorite: id => {
          const favs = get().favorites;
          const updated = favs.includes(id)
            ? favs.filter(f => f !== id)
            : [...favs, id];
          set({favorites: updated});
        },
        isFavorite: id => get().favorites.includes(id),
      }),
      {enabled: false},
    ),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
