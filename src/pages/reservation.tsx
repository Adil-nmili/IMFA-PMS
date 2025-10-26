import {  Calendar, User, FileText, CreditCard, Plus, LogIn } from "lucide-react";
import { CheckCircle, Ruler, Eye, Wifi, Tv, Airplay } from "lucide-react";

//data types
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

// Data values
const rooms: Room[] = [
  {
    numChambre: "203",
    typeChambre: "Simple",
    statut: "Disponible",
    pricePerNight: 20,
    surface: "22 m²",
    vue: "Jardin",
    equipements: ["Wi-Fi", "TV", "Climatisation"],
    picture: "https://png.pngtree.com/thumb_back/fw800/background/20220311/pngtree-bedroom-guest-room-five-star-hotel-image_990205.jpg"
  },
];

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

const ReservationPage = () => {
 return (
    <div className="min-h-screen bg-[#E9E6E1] p-2 ml-[-22px] mt-[-10px] rounded-2xl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-[#3F3124] mb-1">Reservation Details</h1>
        </div>

   <div className="grid lg:grid-cols-[1fr,360px,280px] gap-4">
   {/*Room image + details */}
   <div className="space-y-4">
            {rooms.map((room: Room, RoomId: number) => (
              <div key={RoomId} className="space-y-4">
                {/* Room Image +details on image  */}
                <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src={room.picture}
                    alt={`Room ${room.numChambre}`}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110 align-middle"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-2xl font-bold mb-1">Chambre {room.numChambre}</h2>
                    <p className="text-sm opacity-90">{room.typeChambre}</p>
                  </div>
                </div>

                {/* Room Details Card */}
                <div className="bg-white rounded-xl shadow-md p-5 border border-[#E9E6E1] hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-lg font-bold text-[#3F3124] mb-4 flex items-center gap-2">
                    <div className="w-1 h-5 bg-[#967E62] rounded-full"></div>
                    Chambre Informations
                  </h3>
              {/*Chambre Infos */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Status */}
                    <div className="flex items-start gap-2 p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                      <div className="p-1.5 bg-green-500 rounded-lg">
                        <CheckCircle size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-[#795E46]">Statue</p>
                        <p className="text-sm font-semibold text-[#3F3124]">{room.statut}</p>
                      </div>
                    </div>

                    {/* Surface */}
                    <div className="flex items-start gap-2 p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                      <div className="p-1.5 bg-[#967E62] rounded-lg">
                        <Ruler size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-[#795E46]">Surface</p>
                        <p className="text-sm font-semibold text-[#3F3124]">{room.surface}</p>
                      </div>
                    </div>

                    {/* View */}
                    <div className="flex items-start gap-2 p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                      <div className="p-1.5 bg-[#795E46] rounded-lg">
                        <Eye size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-[#795E46]">Vue</p>
                        <p className="text-sm font-semibold text-[#3F3124]">{room.vue}</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-start gap-2 p-3 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg">
                      <div className="p-1.5 bg-amber-500 rounded-lg">
                        <CreditCard size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-[#795E46]">Prix/Nuit</p>
                        <p className="text-sm font-semibold text-[#3F3124]">${room.pricePerNight}</p>
                      </div>
                    </div>
                  </div>{/**/}

                  {/* Equipments */}
                  <div className="mt-4 pt-4 border-t border-[#E9E6E1]">
                    <p className="text-xs font-semibold text-[#3F3124] mb-3">Equipements</p>
                    <div className="flex flex-wrap gap-2">
                      {room.equipements.map((equip, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E9E6E1] rounded-full hover:bg-[#958E85] hover:text-white transition-colors text-xs">
                          {equip === "Wi-Fi" && <Wifi size={14} className="text-[#967E62]" />}
                          {equip === "TV" && <Tv size={14} className="text-[#967E62]" />}
                          {equip === "Air Conditioning" && <Airplay size={14} className="text-[#967E62]" />}
                          <span className="font-medium text-[#3F3124]">{equip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/**/}
                </div>
              </div>
            ))}
    </div>{/*firstCard */}

    {/*reservation Card */}
     <div className="lg:sticky lg:top-5 h-fit">
            {reservations.map((Reservation) => {
              const room: Room = rooms[Reservation.roomIndex];
              const subtotal: number = room.pricePerNight * Reservation.nbNights;

              return (
                <div key={Reservation.idRes} className="bg-white rounded-2xl shadow-lg border border-[#E9E6E1] overflow-hidden">
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
                      <span>{Reservation.dateDebut.toLocaleDateString()} — {Reservation.dateFin.toLocaleDateString()}</span>
                    </div>
                  </div>
                    {/*Buttons*/}
                  <div className="p-4 space-y-4">
                    {/* Reservation details */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center pb-2 border-b border-[#E9E6E1]">
                        <span className="text-xs font-medium text-[#795E46]">Chambre</span>
                        <span className="font-semibold text-[#3F3124] text-sm">{room.numChambre} — {room.typeChambre}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-[#E9E6E1]">
                        <span className="text-xs font-medium text-[#795E46]">Nuit</span>
                        <span className="font-semibold text-[#3F3124] text-sm">{Reservation.nbNights}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-[#E9E6E1]">
                        <span className="text-xs font-medium text-[#795E46]">Prix / Nuit</span>
                        <span className="font-semibold text-[#3F3124] text-sm">${room.pricePerNight.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* AddRoom Button */}
                    <button 
                      onClick={() => alert('Add more rooms to this reservation')} 
                      className="w-full py-2.5 text-sm rounded-lg flex items-center justify-center gap-2 border-2 border-dashed border-[#967E62] text-[#967E62] font-medium hover:bg-[#E9E6E1] transition-all duration-200"
                    >
                      <Plus size={16} /> Ajouter des Chambres
                    </button>

                    {/* Totals */}
                    <div className="bg-[#E9E6E1] p-3.5 rounded-lg space-y-2">
                      <div className="flex justify-between text-xs text-[#795E46]">
                        <span>Sous-total</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-[#958E85]/30">
                        <span className="text-sm font-bold text-[#3F3124]">Total</span>
                        <span className="text-xl font-bold text-[#967E62]">${subtotal.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      {/* confirm reservation */}
                      <button 
                        onClick={() => alert('Confirm Reservation')} 
                        className="w-full py-2.5 text-sm rounded-lg font-semibold text-white bg-gradient-to-r from-[#967E62] to-[#795E46] hover:from-[#795E46] hover:to-[#3F3124] transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        Confirmer la reservation
                      </button>
                      {/*caheckin button */}
                      <button 
                        onClick={() => alert('Check In')} 
                        className="w-full py-2.5 text-sm rounded-lg font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                      >
                        <LogIn size={16} /> Arivee
                      </button>
                      {/*cancelReservation button*/}
                      <button 
                        onClick={() => alert('Cancel Reservation')} 
                        className="w-full py-2.5 text-sm rounded-lg font-semibold text-[#3F3124] bg-[#E9E6E1] hover:bg-[#958E85] hover:text-white transition-all duration-200"
                      >
                        Annuler la reservation
                      </button>
                    </div>

                    {/* Police PDF + Invoice */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {/*policebutton */}
                      <button 
                        onClick={() => alert('Generate Police PDF')} 
                        className="py-2 text-xs rounded-lg flex items-center justify-center gap-1.5 bg-[#E9E6E1] text-[#3F3124] font-medium hover:bg-[#958E85] hover:text-white transition-all duration-200"
                      >
                        <FileText size={14} /> Police PDF
                      </button>
                      {/*Facture */}
                      <button 
                        onClick={() => alert('View Invoice')} 
                        className="py-2 text-xs rounded-lg flex items-center justify-center gap-1.5 bg-[#E9E6E1] text-[#3F3124] font-medium hover:bg-[#958E85] hover:text-white transition-all duration-200"
                      >
                        <CreditCard size={14} /> Facture
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>

    {/*Clientinfo card */}
    <div className="lg:sticky lg:top-5 h-fit">
            {reservations.map((Reservation) => {
              const client: Client = clients[Reservation.clientIndex];

              return (
                <div key={Reservation.idRes} className="bg-white rounded-2xl shadow-lg border border-[#E9E6E1] overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-[#795E46] to-[#967E62] p-4 text-white">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-white/20 backdrop-blur-sm rounded-lg">
                        <User size={16} />
                      </div>
                      <h2 className="text-base font-bold">Information completes du client</h2>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="space-y-3">
                      {/* ClientName div */}
                      <div className="bg-gradient-to-br from-[#E9E6E1] to-[#958E85]/20 p-3 rounded-lg">
                        <p className="text-xs font-medium text-[#795E46] mb-0.5">Nom complet</p>
                        <p className="text-base font-bold text-[#3F3124]">{client.nomClient}</p>
                      </div>

                      {/* ClinetInfos */}
                      <div className="space-y-2.5 pt-1">
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-[#795E46] mb-0.5">Numero de telephone</span>
                          <span className="font-semibold text-[#3F3124] text-sm">{client.telClient}</span>
                        </div>
                        
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-[#795E46] mb-0.5">Email Address</span>
                          <span className="font-semibold text-[#3F3124] text-xs break-words">{client.emailClient}</span>
                        </div>
                        
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-[#795E46] mb-0.5">CIN</span>
                          <span className="font-semibold text-[#3F3124] text-sm uppercase">{client.cinClient}</span>
                        </div>

                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-[#795E46] mb-0.5">Situation social</span>
                          <span className="font-semibold text-[#3F3124] text-sm">{client.statutSociale}</span>
                        </div>

                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-[#795E46] mb-0.5">Adresse</span>
                          <span className="font-semibold text-[#3F3124] text-sm">{client.adresseClient}</span>
                        </div>

                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-[#795E46] mb-0.5">Date de naissance</span>
                          <span className="font-semibold text-[#3F3124] text-sm">{client.dateNaissanceClient.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Edit button */}
                    <button 
                      onClick={() => alert('Edit Client Information')} 
                      className="w-full mt-4 py-2.5 text-sm rounded-lg font-semibold text-[#795E46] bg-[#E9E6E1] hover:bg-[#967E62] hover:text-white transition-all duration-200"
                    >
                      Edit Client Info
                    </button>
                  </div>
                </div>
              );
            })}
      </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;