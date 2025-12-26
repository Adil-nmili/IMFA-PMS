import {create} from "zustand";
import type { Room } from "../types/rooms";
import { supabase } from "../lib/supabaseClient";

type RoomsState = {
  rooms : Room[];
  fetchRooms: () => Promise<void>;
  error: string | null;
  loading :boolean;
}
export const useRoomsStore = create<RoomsState>()((set) => ({
  rooms: [],
  loading: false,
  error: null,

  fetchRooms: async () => {
    set(
      {loading:true,
      error:null}
    );
    const {data, error} = await supabase
    .from("rooms")
    .select(`
    *,
    reservations_rooms (
      *,
      rooms (*)
    )
  `);
    
    
    if (error) {
      set({ error: error.message, loading: false });
      console.error("Error fetching rooms:", error);
    } else {
      set({ rooms: data || [], loading: false });
    }
    }
}));