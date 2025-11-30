import { create } from "zustand";
import { supabase } from '@/lib/supabaseClient';
import type { Room } from "@/types/room";

type FilterKey = keyof RoomsStore["filters"];

type RoomsStore = {
  rooms: Room[];
  selectedRooms: number[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  filters: {
    type: string[];
    status: string[];
    capacity: number[];
  };
  showFilters: boolean;

  toogleRoom: (id: number) => void;
  fetchRooms: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  toogleFilter: (key: FilterKey, value: string | number) => void;
  clearFilters: () => void;
  toogleShowFilters: () => void;
  clearSelectedRooms: () => void;
};

export const useRoomStore = create<RoomsStore>((set) => ({
  rooms: [],
  selectedRooms: [],
  loading: false,
  error: null,
  searchQuery: '',
  filters: { type: [], status: [], capacity: [] },
  showFilters: false,

  fetchRooms: async () => {
    set({ loading: true, error: null });
    const { data, error } = await supabase.from("rooms").select("*");
    if (error) set({ error: error.message, loading: false });
    else set({ rooms: data || [], loading: false });
  },

  toogleRoom: (id: number) =>
    set((state) => ({
      selectedRooms: state.selectedRooms.includes(id)
        ? state.selectedRooms.filter((r) => r !== id)
        : [...state.selectedRooms, id],
    })),

  clearSelectedRooms: () => set({ selectedRooms: [] }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  toogleFilter: (key: FilterKey, value: string | number) =>
    set((state) => {
      const currentFilter = state.filters[key] as (string | number)[];
      const alreadySelected = currentFilter.includes(value);
      return {
        filters: {
          ...state.filters,
          [key]: alreadySelected ? [] : [value],
        },
      };
    }),



  clearFilters: () => set({ filters: { type: [], status: [], capacity: [] } }),
  toogleShowFilters: () => set((state) => ({ showFilters: !state.showFilters })),
}));
