import { supabase } from "@/lib/supabaseClient";

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
    const {data,error} = await supabase.from("users").select("*").eq("code_pin",code_pin).eq("nomEmp",nomEmp).single();
    if(error)throw error;
    return data;
}

export const getAllUsers = async () => {
  const { data, error } = await supabase.from("users").select("code_pin").select("emailEmp");
  if (error) throw error;
  return data;
};


export const getUserToken = async (emailEmp:string,code_pin:string|any)=>{
    const { data, error } = await supabase.auth.signInWithPassword({
    email: emailEmp,
    password: code_pin,
    });

    if (error) throw error;
    return data;
}

export const logout = async ()=>{
  await supabase.auth.signOut();
}