import type { Room } from "./rooms";

export type ReservationRoom={ 
  id:number; 
  created_at:string; 
  reservation_id:number;
  room_id:number; 
  rooms: Room; 
  
}