
import { supabase } from "@/lib/supabaseClient";

// import type { ReservationFormValues } from "@/types/ReservationFormValuesType";

export const loginByRFID = async (rfidId: string,nomEmp:string) => {
  const { data, error } = await supabase
    .from("users") 
    .select("*")
    .eq("rfid", rfidId)
    .eq("nomEmp", nomEmp)
    .single();

  if (error) throw error;
  return data;
};

export const loginByCodePin = async (code_pin:string,nomEmp:string)=>{
    const {data,error} = await supabase.from("users").select("*").eq("code_pin",String(code_pin)).eq("nomEmp",nomEmp).single();
    if(error)throw error;
    return data;
}

export const getAllUsers = async () => {
  const { data, error } = await supabase.from("users").select("nomEmp,image,role_id");
  if (error) throw error;
  return data;
};

export const getUserToken = async (emailEmp:string,code_pin:string|any)=>{
    const { data, error } = await supabase.auth.signInWithPassword({
    email: emailEmp,
    password: String(code_pin),
    });

    if (error) throw error;
    return data;
}

export const logout = async ()=>{
  await supabase.auth.signOut();
}

