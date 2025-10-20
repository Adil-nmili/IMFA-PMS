import React from "react";
import { useEffect } from 'react';
import { RoomCard } from "@/components/ui/rooms/roomCard";
import { GoPeople } from "react-icons/go";
import { FaBath } from "react-icons/fa6";
import { LiaRulerCombinedSolid } from "react-icons/lia";
import { FaCheck } from "react-icons/fa";
import { useRoomStore } from "@/stores/roomsStore";

const RoomsList = () => {
  const { selectedRooms, toogleRoom,rooms,fetchRooms,searchQuery,filters,

    } = useRoomStore();
//   const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    fetchRooms();
  }, []);
  const keywords = searchQuery
  ? searchQuery.toLowerCase().split(" ").filter(k => k !== "")
  : [];



const filteredRooms = rooms.filter((room) => {
  //**search**//
  const matchSearch =
    keywords.length === 0 ||
    keywords.every(keyword =>
      Object.values({
        numRoom: room.numRoom,
        type: room.type,
        status: room.status,
        price: room.price,
        capacity: room.capacity,
        surface: room.surface,
        bathrooms: room.bathrooms,
      }).some(value =>
        value.toString().toLowerCase().includes(keyword)
      )
    );

  //**Filters**//
  const matchType =
    filters.type.length === 0 || filters.type.includes(room.type);

  const matchStatus =
    filters.status.length === 0 || filters.status.includes(room.status);

  const matchCapacity =
    filters.capacity.length === 0 ||
    filters.capacity.includes(Number(room.capacity));

 
  return matchSearch && matchType && matchStatus && matchCapacity;
});




// console.log(keywords);
// console.log("Filtered Rooms:", filteredRooms);





  return (
    <div className="bg-green-500 p-2 h-[78vh] m-1 flex flex-row gap-4">
      {filteredRooms.map((room) => {
        const isSelected = selectedRooms.includes(room.id);        
        return (
          <RoomCard key={room.id}>
            <div
              className={`relative cursor-pointer rounded-xl overflow-hidden border transition-all duration-200
                ${isSelected ? "ring-4 ring-blue-500 scale-105" : "hover:ring-2 hover:ring-gray-300"}
              `}
              onClick={() => toogleRoom(room.id)}
            >
              {/* Checkbox overlay top-left */}
              <div className="absolute top-2 left-2 w-6 h-6 border-2 border-gray-300 rounded-sm flex items-center justify-center bg-white">
                {isSelected && <FaCheck className="text-blue-500 text-sm" />}
              </div>

              {room.image && (
                <img
                  src={room.image}
                  alt=""
                  className="w-52 h-60 object-cover rounded-t-sm"
                />
              )}

              <div className="absolute bottom-2 left-1 right-1 bg-white w-50 h-19 rounded-sm p-2">
                <div className="flex justify-between pl-2 pr-2">
                  <p>{room.type}</p>
                  <p>{room.price}dhs/nuit</p>
                </div>
                <p className="pl-2">{room.numRoom}</p>
                <div className="flex justify-around items-center mt-1">
                  <p className="flex items-center gap-1"><GoPeople /> {room.capacity}</p>
                  <p className="flex items-center gap-1"><FaBath /> {room.bathrooms}</p>
                  <p className="flex items-center gap-1"><LiaRulerCombinedSolid /> {room.surface}m²</p>
                </div>
              </div>
            </div>
          </RoomCard>
        );
      })}
    </div>
  );
};

export default RoomsList;
