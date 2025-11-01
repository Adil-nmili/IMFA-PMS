import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";

export const useReservationStore = create((set)=>({
      reservations: [],
      loading: false,
      
      fetchReservations: async () => {
    set({ loading: true });
    const { data, error } = await supabase
      .from("reservations")
      .select(`
        *,
        clients (*),
        reservations_rooms (
          rooms(*)
        )
      `);

      if (error) console.log("Error fetching reservations:", error);
    else set({ reservations: data });

    set({ loading: false });
  },

}))