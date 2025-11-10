import { supabase } from "@/lib/supabaseClient";

export const getClients = async () => {
  const { data, error } = await supabase.from("clients").select("*");
  if (error) throw error;
  return data;
};


export const getClientByContaining = async (critic: string) => {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .or(`nom.ilike.%${critic}%,prenom.ilike.%${critic}%,email.ilike.%${critic}%`);

  if (error) throw error;
  return data;
};
