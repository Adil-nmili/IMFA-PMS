import type { Clients } from "./clients";
import type { ReservationRoom } from "./reservationRoom";

export type Reservation ={
  id: string;
  status: string;
  date_debut: Date;
  date_fin: Date;
  nbNights: number;
  room_id: number;
  clientId: number;
  reservations_rooms: ReservationRoom[];
  clients:Clients;
};
