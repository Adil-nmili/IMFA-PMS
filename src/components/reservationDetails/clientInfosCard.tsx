import { User } from "lucide-react";
import { useReservationsStore } from "@/stores/reservationsStore";
import { useClientStore } from "@/stores/clientsStore";
import { useEffect } from "react";

export const ClientReservationCard = () => {
  const store = useClientStore();
  const clients = store.client;
  const fetchClients = store.fetchClient;
  const loading = store.loading;
  const reservations = useReservationsStore((state) => state.reservation);

  useEffect(() => {
    fetchClients();
  }, []);

  if (loading) {
    return <div className="p-4">Chargement...</div>;
  }

  return (
    <div>
      {reservations.map((Reservation) => {
        const client = clients.find(
          (client) => client.id === Reservation.clientId
        );

        if (!client) {
          return null;
        }
        return (
          <div
            key={Reservation.id}
            className="bg-white rounded-2xl shadow-lg border border-[#E9E6E1] overflow-hidden h-full"
          >
            {/* header+editButton */}
            <div className="bg-gradient-to-r from-[#795E46] to-[#967E62] p-2 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User size={12} />
                <h2 className="text-xs font-bold">Client Information</h2>
              </div>
              <button
                onClick={() => alert("Edit Client Information")}
                className="px-2 py-1 text-xs rounded-lg font-semibold bg-white/20 hover:bg-white/30 transition-all duration-200"
              >
                Edit
              </button>
            </div>

            <div className="p-3">
              {/* Client Name div*/}
              <div className="bg-gradient-to-br from-[#E9E6E1] to-[#958E85]/20 p-2 rounded-lg mb-2">
                <p className="text-[10px] font-medium text-[#795E46]">
                  Nom complet
                </p>
                <p className="text-xs font-bold text-[#3F3124]">
                  {client.nom} {client.prenom}
                </p>
              </div>

              {/* 2column display grid*/}
              <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                {/* Phone div*/}
                <div>
                  <span className="text-[10px] font-medium text-[#795E46] block">
                    Téléphone
                  </span>
                  <span className="font-semibold text-[#3F3124] text-[11px] block">
                    {client.telephone}
                  </span>
                </div>
                {/* CIN div*/}
                <div>
                  <span className="text-[10px] font-medium text-[#795E46] block">
                    CIN
                  </span>
                  <span className="font-semibold text-[#3F3124] text-[11px] block uppercase">
                    {client.CIN}
                  </span>
                </div>

                {/* Email div*/}
                <div>
                  <span className="text-[10px] font-medium text-[#795E46] block">
                    Email
                  </span>
                  <span className="font-semibold text-[#3F3124] text-[11px] block break-all">
                    {client.email}
                  </span>
                </div>

                {/* Birth Date div */}
                <div>
                  <span className="text-[10px] font-medium text-[#795E46] block">
                    Naissance
                  </span>
                  <span className="font-semibold text-[#3F3124] text-[11px] block">
                    {client.date_naissance}
                  </span>
                </div>

                {/* Status div*/}
                <div>
                  <span className="text-[10px] font-medium text-[#795E46] block">
                    Statut
                  </span>
                  <span className="font-semibold text-[#3F3124] text-[11px] block">
                    {client.statut_social}
                  </span>
                </div>

                {/* Address div */}
                <div>
                  <span className="text-[10px] font-medium text-[#795E46] block">
                    Adresse
                  </span>
                  <span className="font-semibold text-[#3F3124] text-[11px] block">
                    {client.adresse}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
