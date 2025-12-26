import { create } from "zustand";
import type { Reservation } from "../types/reservations";
import { supabase } from "../lib/supabaseClient";

type ReservationState={
  reservation:Reservation[];
  fetchReservation:()=>Promise<void>;  
  error:string | null;
  loading:boolean;
}

export const useReservationsStore=create<ReservationState>()((set)=>({
  reservation:[],
  loading:false,
  error:null,
  
  fetchReservation:async()=>{
    set({loading:true,
        error:null}
    );
    const {data,error}=await supabase
    .from("reservations")
    .select(`
        *,
        reservations_rooms (
          room_id,
          rooms (
            id,
            numChambre,
            typeChambre,
            pricePerNight
          )
        )
      `)

    if(error){
      set({error:error.message,
        loading:false});
      console.error("Error fetching reservations:",error);
    }else{
      set({reservation:data || [],loading:false});
    } 
  }
}));
