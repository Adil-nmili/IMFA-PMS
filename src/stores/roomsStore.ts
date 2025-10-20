import { create } from "zustand";
import { supabase } from '@/lib/supabaseClient';
import type { Room } from "@/types/room";
type FilterKey = keyof RoomsStore["filters"]; // 'type' | 'status' | 'capacity'

type RoomsStore={
    //**State**/
    rooms:Room[];
    selectedRooms:number[];
    loading:boolean;
    error:string| null;
    searchQuery:string;
    filters:{
        type:string[]
        status:string[]
        capacity:number[]
    }
      showFilters: boolean, // <-- default hidden



     //**Actions**/
     toogleRoom: (id:number) => void;
     fetchRooms: () => Promise<void>;
     setSearchQuery:(query:string)=>void;
     toogleFilter: (key: keyof RoomsStore["filters"], value: string) => void;
     clearFilters: () => void;
       toggleShowFilters: () => void; // <-- add this


     
}
export const useRoomStore=create<RoomsStore>((set)=>({
    rooms:[],
    selectedRooms:[],
    loading: false,
    error: null,
    searchQuery:'',
    filters: {
    type: [],
    status: [],
    capacity: [],
  },
    showFilters: false, // <-- default hidden

  

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
      setSearchQuery: (query) => set({ searchQuery: query }),
     toogleFilter: (key: FilterKey, value: string | number) =>
  set((state) => {
    return {
      filters: {
        ...state.filters,
        [key]: [value],
      },
    };
  }),



  clearFilters: () =>
    set({
      filters: { type: [], status: [], capacity: [] },
    }),
  toggleShowFilters: () => set((state) => ({ showFilters: !state.showFilters })),

    
}))