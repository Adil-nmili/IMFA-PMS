import { Calendar, CreditCard, FileText, LogIn, Plus } from "lucide-react";
interface Reservation {
  idRes: string;
  statut: string;
  dateDebut: Date;
  dateFin: Date;
  nbNights: number;
  roomIndex: number;
  clientIndex: number;
}
const reservations: Reservation[] = [
  {
    idRes: "RF52828",
    statut: "En attente",
    dateDebut: new Date("2024-09-01"),
    dateFin: new Date("2024-09-03"),
    nbNights: 2,
    roomIndex: 0,
    clientIndex: 0,
  },
];
interface Room {
  numChambre: string;
  typeChambre: string;
  statut: string;
  pricePerNight: number;
  surface: string;
  vue: string;
  equipements: string[];
  picture: string;
}
const rooms: Room[] = [
  {
    numChambre: "203",
    typeChambre: "Simple",
    statut: "Disponible",
    pricePerNight: 20,
    surface: "22 m²",
    vue: "Jardin",
    equipements: ["Wi-Fi", "TV", "Climatisation"],
    picture:
      "https://png.pngtree.com/thumb_back/fw800/background/20220311/pngtree-bedroom-guest-room-five-star-hotel-image_990205.jpg",
  },
];
export const ReservationCard = () => {
  return (
    <>
      {reservations.map((Reservation) => {
        const room: Room = rooms[Reservation.roomIndex];
        const subtotal: number = room.pricePerNight * Reservation.nbNights;
        return (
          <div
            key={Reservation.idRes}
            className="bg-white rounded-2xl shadow-lg border border-[#E9E6E1] overflow-hidden"
          >
            {/* Header +reservationid */}
            <div className="bg-gradient-to-r from-[#3F3124] to-[#795E46] p-4 text-white">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs opacity-90 mb-0.5">ID de reservation</p>
                  <h2 className="text-xl font-bold">{Reservation.idRes}</h2>
                </div>
                <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold">
                  {Reservation.statut}
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs bg-white/10 backdrop-blur-sm rounded-lg px-2.5 py-1.5 w-fit">
                <Calendar size={14} />
                <span>
                  {Reservation.dateDebut.toLocaleDateString()} —{" "}
                  {Reservation.dateFin.toLocaleDateString()}
                </span>
              </div>
            </div>
            {/*Reservation Card Content*/}
            <div className="p-4 space-y-4">
              {/* Reservation details */}
              <div className="space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-[#E9E6E1]">
                  <span className="text-xs font-medium text-[#795E46]">
                    Chambre
                  </span>
                  <span className="font-semibold text-[#3F3124] text-sm">
                    {room.numChambre} — {room.typeChambre}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-[#E9E6E1]">
                  <span className="text-xs font-medium text-[#795E46]">
                    Nuit
                  </span>
                  <span className="font-semibold text-[#3F3124] text-sm">
                    {Reservation.nbNights}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-[#E9E6E1]">
                  <span className="text-xs font-medium text-[#795E46]">
                    Prix / Nuit
                  </span>
                  <span className="font-semibold text-[#3F3124] text-sm">
                    ${room.pricePerNight.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* AddRoom Button */}
              <button
                onClick={() => alert("Add more rooms to this reservation")}
                className="w-full py-2.5 text-sm rounded-lg flex items-center justify-center gap-2 border-2 border-dashed border-[#967E62] text-[#967E62] font-medium hover:bg-[#E9E6E1] transition-all duration-200"
              >
                <Plus size={16} /> Ajouter des Chambres
              </button>

              {/* Totals price div */}
              <div className="bg-[#E9E6E1] p-3.5 rounded-lg space-y-2">
                <div className="flex justify-between text-xs text-[#795E46]">
                  <span>Sous-total</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-[#958E85]/30">
                  <span className="text-sm font-bold text-[#3F3124]">
                    Total
                  </span>
                  <span className="text-xl font-bold text-[#967E62]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* 3 buttons div */}
              <div className="space-y-2">
                {/* confirm reservation */}
                <button
                  onClick={() => alert("Confirm Reservation")}
                  className="w-full py-2.5 text-sm rounded-lg font-semibold text-white bg-gradient-to-r from-[#967E62] to-[#795E46] hover:from-[#795E46] hover:to-[#3F3124] transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Confirmer la reservation
                </button>
                {/*caheckin button */}
                <button
                  onClick={() => alert("Check In")}
                  className="w-full py-2.5 text-sm rounded-lg font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <LogIn size={16} /> Arivee
                </button>
                {/*cancelReservation button*/}
                <button
                  onClick={() => alert("Cancel Reservation")}
                  className="w-full py-2.5 text-sm rounded-lg font-semibold text-[#3F3124] bg-[#E9E6E1] hover:bg-[#958E85] hover:text-white transition-all duration-200"
                >
                  Annuler la reservation
                </button>
              </div>

              {/* Police PDF + Invoice */}
              <div className="grid grid-cols-2 gap-2 pt-1 mb-[-5px]">
                {/*policebutton */}
                <button
                  onClick={() => alert("Generate Police PDF")}
                  className="py-2 text-xs rounded-lg flex items-center justify-center gap-1.5 bg-[#E9E6E1] text-[#3F3124] font-medium hover:bg-[#958E85] hover:text-white transition-all duration-200"
                >
                  <FileText size={14} /> Police PDF
                </button>
                {/*Facture */}
                <button
                  onClick={() => alert("View Invoice")}
                  className="py-2 text-xs rounded-lg flex items-center justify-center gap-1.5 bg-[#E9E6E1] text-[#3F3124] font-medium hover:bg-[#958E85] hover:text-white transition-all duration-200"
                >
                  <CreditCard size={14} /> Facture
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
