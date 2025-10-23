import React from 'react';
import { useRoomStore } from "@/stores/roomsStore";
import { Link } from 'react-router-dom';

const RoomFooter = () => {
  const { selectedRooms, rooms,clearSelectedRooms } = useRoomStore();
  const selectedRoomsData = rooms.filter((room) => selectedRooms.includes(room.id));
  const selectedRoomsTotal = selectedRoomsData.reduce((sum, room) => sum + room.price, 0);

  return (
      selectedRooms.length >= 1 && (

<div className="fixed bottom-1 right-1.5 left-1.5 ml-11 max-w-8xl text-white bg-[#967e62] rounded-2xl py-2 px-5 flex items-center justify-between shadow-lg z-50">
      <div className="flex items-center gap-[30vw]">
        <h2 className="text-sm font-semibold whitespace-nowrap">
          {selectedRooms.length} Room{selectedRooms.length > 1 ? "s" : ""} selected
        </h2>

        <h2 className="font-semibold whitespace-nowrap">
          {selectedRooms.length === 1
            ? `${selectedRoomsData[0].price} DH`
            : `${selectedRoomsTotal} DH`}
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <Link to="/reservation">
          <button className="bg-[#967e62] border-2 cursor-pointer text-white px-3 py-1.5 rounded-4xl font-normal transition">
            Ajouter une réservation
          </button>
        </Link>
        <button onClick={clearSelectedRooms} className="bg-[#967e62] border-2 rounded-4xl cursor-pointer text-white px-3 py-1.5 font-normal">
          Annuler
        </button>
      </div>
    </div>
    )
  );
};

export default RoomFooter;
