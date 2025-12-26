import { create } from "zustand";
import { supabase } from "../lib/supabaseClient";
import type { Clients } from "../types/clients";

type ClientState ={
  client:Clients[];
  fetchClient:()=>Promise<void>;
  error:string | null;
  loading:boolean;
}
export const useClientStore=create<ClientState>()((set)=>({
  client:[],
  loading:false,
  error:null,
  
  fetchClient:async()=>{
    set(
      {loading:true,
       error:null}
    );
    const {data,error}=await supabase
    .from("clients")
    .select("*")
    .eq('id', '1')

    if(error){
      set({error:error.message,
      loading:false});
      console.error("Error fetching clients:",error);
    }else{
      set({client:data || [],loading:false});
    }
  }
}));