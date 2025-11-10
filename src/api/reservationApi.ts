import { supabase } from "@/lib/supabaseClient";
import type { ReservationFormValues } from "@/types/ReservationFormValuesType";


export const insertReservation = async (values: ReservationFormValues) => {
  const { data, error } = await supabase
    .from("reservations")
    .insert([
      {
        ...values,
        services: JSON.stringify(values.services),
        chambres: JSON.stringify(values.chambres),
      },
    ]);

  if (error) throw error;
  return data;
};

export const deleteReservation = async (reservationId : string)=>{
  const {data,error} = await supabase
  .from("reservations")
  .delete({count:"estimated"})
  .eq('reservationId',reservationId)


  if(error) throw error;
  return data;
}

export const getReservationById = async (reservationId : string)=>{
  const {data , error} = await supabase
  .from("reservations")
  .select("*")
  .eq("reservationId",reservationId)

  if(error) throw error;
  return data;
}

export const getServices = async ()=>{
  const {data,error} = await supabase
  .from('reservations')
  .select("*")

  if(error) throw error
  return data;
}