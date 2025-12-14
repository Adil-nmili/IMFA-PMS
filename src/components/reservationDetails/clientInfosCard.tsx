import { User } from "lucide-react";

const clients: Client[] = [
  {
    nomClient: "Ahmed",
    telClient: "061142569",
    emailClient: "Ahmedr@gamil.com",
    cinClient: "Rf258792",
    statutSociale: "Celibataire",
    adresseClient: "Oujda",
    dateNaissanceClient: new Date("2004-06-05"),
  },
];

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
interface Client {
  nomClient: string;
  telClient: string;
  emailClient: string;
  cinClient: string;
  statutSociale: string;
  adresseClient: string;
  dateNaissanceClient: Date;
}

interface Reservation {
  idRes: string;
  statut: string;
  dateDebut: Date;
  dateFin: Date;
  nbNights: number;
  roomIndex: number;
  clientIndex: number;
}
export const ClientReservationCard = () => {
  return (
    <div>
      {reservations.map((Reservation) => {
        const client: Client = clients[Reservation.clientIndex];

        return (
          <div
            key={Reservation.idRes}
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
                  {client.nomClient}
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
                    {client.telClient}
                  </span>
                </div>
                {/* CIN div*/}
                <div>
                  <span className="text-[10px] font-medium text-[#795E46] block">
                    CIN
                  </span>
                  <span className="font-semibold text-[#3F3124] text-[11px] block uppercase">
                    {client.cinClient}
                  </span>
                </div>

                {/* Email div*/}
                <div>
                  <span className="text-[10px] font-medium text-[#795E46] block">
                    Email
                  </span>
                  <span className="font-semibold text-[#3F3124] text-[11px] block break-all">
                    {client.emailClient}
                  </span>
                </div>

                {/* Birth Date div */}
                <div>
                  <span className="text-[10px] font-medium text-[#795E46] block">
                    Naissance
                  </span>
                  <span className="font-semibold text-[#3F3124] text-[11px] block">
                    {client.dateNaissanceClient.toLocaleDateString()}
                  </span>
                </div>

                {/* Status div*/}
                <div>
                  <span className="text-[10px] font-medium text-[#795E46] block">
                    Statut
                  </span>
                  <span className="font-semibold text-[#3F3124] text-[11px] block">
                    {client.statutSociale}
                  </span>
                </div>

                {/* Address div */}
                <div>
                  <span className="text-[10px] font-medium text-[#795E46] block">
                    Adresse
                  </span>
                  <span className="font-semibold text-[#3F3124] text-[11px] block">
                    {client.adresseClient}
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
