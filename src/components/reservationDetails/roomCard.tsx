import {
  Airplay,
  CheckCircle,
  CreditCard,
  Eye,
  Ruler,
  Tv,
  Wifi,
} from "lucide-react";
import type { Room } from "@/types/rooms";

type RoomCardReserved = {
  room: Room;
};

export const RoomCard = ({ room }: RoomCardReserved) => {
  return (
    <>
      <div className="h-full">
        {/* room picture + infos overlay on it */}
        <div className="relative group overflow-hidden rounded-2xl shadow-lg h-full">
          <img
            src={room.image}
            alt={`Room ${room.numChambre}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/*dark gardient over the image*/}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

          {/* all element overlay on teh image */}
          <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
            {/* Romm Title div*/}
            <div>
              <h2 className="text-3xl font-bold mb-1">
                Chambre {room.numChambre}
              </h2>
              <p className="text-sm opacity-90">{room.typeChambre}</p>
            </div>

            {/*All Details of room */}
            <div className="space-y-3">
              {/* Grid display */}
              <div className="grid grid-cols-2 gap-2">
                {/* Status div */}
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2">
                  <CheckCircle size={16} className="text-green-400" />
                  <div>
                    <p className="text-xs opacity-75">Status</p>
                    <p className="text-sm font-semibold">{room.status}</p>
                  </div>
                </div>

                {/* Surface div */}
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2">
                  <Ruler size={16} className="text-blue-400" />
                  <div>
                    <p className="text-xs opacity-75">Surface</p>
                    <p className="text-sm font-semibold">
                      {room.surface}
                      {"m²"}
                    </p>
                  </div>
                </div>

                {/* View div */}
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2">
                  <Eye size={16} className="text-purple-400" />
                  <div>
                    <p className="text-xs opacity-75">Vue</p>
                    <p className="text-sm font-semibold">{room.vue}</p>
                  </div>
                </div>

                {/* Price div*/}
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2">
                  <CreditCard size={16} className="text-amber-400" />
                  <div>
                    <p className="text-xs opacity-75">Prix/Nuit</p>
                    <p className="text-sm font-semibold">
                      ${room.pricePerNight}
                    </p>
                  </div>
                </div>
              </div>

              {/* Equipments  div*/}
              <div className="flex flex-wrap gap-1.5">
                {room.equipements?.map((equip, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1 px-2 py-1 bg-black/40 backdrop-blur-sm rounded-full text-xs"
                  >
                    {equip === "Wi-Fi" && <Wifi size={12} />}
                    {equip === "TV" && <Tv size={12} />}
                    {equip === "Air Conditioning" && <Airplay size={12} />}
                    <span>{equip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
