import React from 'react';
import { useRoomStore } from "@/stores/roomsStore";
import { Link } from 'react-router-dom';

const RoomFooter = () => {
      const { selectedRooms,rooms} = useRoomStore();
      const selectedRoomsData=rooms.filter((room)=>selectedRooms.includes(room.id))
      const selectedRoomstotal=selectedRoomsData.reduce((sum,rooms)=>sum+rooms.price,0)
      
      return (
  selectedRooms.length >= 1 && (
    <div className="bg-pink-400 p-7 m-1 flex items-center justify-around">
      <p>
        {selectedRooms.length} room{selectedRooms.length > 1 ? "s" : ""} selected
      </p>
      <div>

      </div>
     {selectedRooms.length == 1 ? (
        <p>{selectedRoomsData[0].price}</p>
     ): <p>{selectedRoomstotal}</p>
    }


    
    

      <button><Link to="path">Ajouter une resrvation</Link></button>
    </div>
  )
);



    
}


export default RoomFooter;