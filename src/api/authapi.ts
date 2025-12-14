
import { supabase } from "@/lib/supabaseClient";

import type { ReservationFormValues } from "@/types/ReservationFormValuesType";

export const loginByRFID = async (rfidId: string,nomEmp:string) => {
  const { data, error } = await supabase
    .from("users") 
    .select(`
      *,
      roles (
        id,
        name
      )
    `)
    .eq("rfid", rfidId)
    .eq("nomEmp", nomEmp)
    .single();

  if (error) throw error;
  
  // Transform data to include role as a string for backward compatibility
  const transformedData = {
    ...data,
    role: data?.roles?.name || 'Unknown'
  };
  
  return transformedData;
};

export const loginByCodePin = async (code_pin:string,nomEmp:string)=>{
    const {data,error} = await supabase
      .from("users")
      .select(`
        *,
        roles (
          id,
          name
        )
      `)
      .eq("code_pin",String(code_pin))
      .eq("nomEmp",nomEmp)
      .single();
    if(error)throw error;
    
    // Transform data to include role as a string for backward compatibility
    const transformedData = {
      ...data,
      role: data?.roles?.name || 'Unknown'
    };
    
    return transformedData;
}

export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from("users")
    .select(`
      code_pin,
      rfid,
      nomEmp,
      image,
      role_id,
      roles (
        id,
        name
      )
    `);
  if (error) throw error;
  
  // Transform data to include role as a string for backward compatibility
  const transformedData = data?.map(user => ({
    ...user,
    role: user.roles?.name || 'Unknown'
  }));
  
  return transformedData;
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

