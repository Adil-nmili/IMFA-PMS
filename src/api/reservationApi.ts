import { supabase } from "@/lib/supabaseClient";


export const getCustomers = async (critic :  string ) =>{
  const {data , error} = await supabase
  .from("clients")
  .select("id,nom,prenom,email")
  .like("nom", `%${critic}%`)
  .like("prenom", `%${critic}%`)
  .like("email",`%${critic}%`)
  .single();
  if(error){
    throw error;
  }
  return data;
}

export const insertReservation = async (reservation : ReservationFormValues)=>{
  const {data,error} = await supabase
  .from("reservations")
  .insert(reservation)
  
  
  if(error) throw error;
  return data;
}

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