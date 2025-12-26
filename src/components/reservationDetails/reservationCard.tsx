import { Calendar, CreditCard, FileText, LogIn, Plus } from "lucide-react";
import { useEffect } from "react";
import { useReservationsStore } from "../../stores/reservationsStore";

export const ReservationCard = () => {
  const {
    reservation: reservations,
    fetchReservation,
    loading,
  } = useReservationsStore();

  useEffect(() => {
    fetchReservation();
  }, []);

  if (loading) return <div className="p-4">Chargement...</div>;
  if (reservations.length === 0)
    return <div className="p-4">Aucune réservation</div>;

  return (
    <>
      {reservations.map((reservation) =>
        reservation.reservations_rooms.map((rr) => {
          const room = rr.rooms;
          if (!room) return null;

          const dateDebut = new Date(reservation.date_debut);
          const dateFin = new Date(reservation.date_fin);
          const subtotal =
            Number(room.pricePerNight) * Number(reservation.nbNights);
          console.log(subtotal);
          return (
            <div
              key={`${reservation.id}-${room.id}`}
              className="bg-white rounded-2xl shadow-lg border border-[#E9E6E1] overflow-hidden mb-4"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#3F3124] to-[#795E46] p-4 text-white">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs opacity-90 mb-0.5">
                      ID de reservation
                    </p>
                    <h2 className="text-xl font-bold">{reservation.id}</h2>
                  </div>
                  <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold">
                    {reservation.status}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs bg-white/10 backdrop-blur-sm rounded-lg px-2.5 py-1.5 w-fit">
                  <Calendar size={14} />
                  <span>
                    {dateDebut.toLocaleDateString()} —{" "}
                    {dateFin.toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Reservation Details */}
              <div className="p-4 space-y-4">
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
                      {reservation.nbNights}
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

                <button className="w-full py-2.5 text-sm rounded-lg flex items-center justify-center gap-2 border-2 border-dashed border-[#967E62] text-[#967E62] font-medium hover:bg-[#E9E6E1] transition-all duration-200">
                  <Plus size={16} /> Ajouter des Chambres
                </button>

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

                <div className="space-y-2">
                  <button className="w-full py-2.5 text-sm rounded-lg font-semibold text-white bg-gradient-to-r from-[#967E62] to-[#795E46]">
                    Confirmer la reservation
                  </button>
                  <button className="w-full py-2.5 text-sm rounded-lg font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center gap-2">
                    <LogIn size={16} /> Arivee
                  </button>
                  <button className="w-full py-2.5 text-sm rounded-lg font-semibold text-[#3F3124] bg-[#E9E6E1]">
                    Annuler la reservation
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 mb-[-5px]">
                  <button className="py-2 text-xs rounded-lg flex items-center justify-center gap-1.5 bg-[#E9E6E1] text-[#3F3124] font-medium">
                    <FileText size={14} /> Police PDF
                  </button>
                  <button className="py-2 text-xs rounded-lg flex items-center justify-center gap-1.5 bg-[#E9E6E1] text-[#3F3124] font-medium">
                    <CreditCard size={14} /> Facture
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};
