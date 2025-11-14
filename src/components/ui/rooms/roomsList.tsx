import React from "react";
import { useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { GoPeople } from "react-icons/go";
import { FaBath } from "react-icons/fa6";
import { LiaRulerCombinedSolid } from "react-icons/lia";
import { FaCheck } from "react-icons/fa";
import { useRoomStore } from "@/stores/roomsStore";
import { MdArrowOutward } from "react-icons/md";
import { Button } from "@/components/ui/button";
import RoomFooter from "./roomFooter";
import { Link } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useOutletContext } from "react-router-dom";


const RoomsList = () => {
  const { selectedRooms, toogleRoom,rooms,fetchRooms,searchQuery,filters,

    } = useRoomStore();
    interface OutletContext {
  isOpen: boolean;
}
//   const [loading, setLoading] = useState(true);
const [currentPage, setCurrentPage] = React.useState(1);
  const roomsPerPage = 8;
  useEffect(() => {
    
    fetchRooms();
  }, []);
  const keywords = searchQuery
  ? searchQuery.toLowerCase().split(" ").filter(k => k !== "")
  : [];


const filteredRooms = rooms.filter((room) => {
  const matchSearch =
    keywords.length === 0 ||
    keywords.every((keyword) =>
      Object.values({
        numRoom: room.numRoom,
        type: room.type,
        status: room.status,
        price: room.price,
        capacity: room.capacity,
        surface: room.surface,
        bathrooms: room.bathrooms,
      }).some((value) =>
        value?.toString().toLowerCase().startsWith(keyword)
      )
    );



 const matchStatus =
  filters.status.length === 0 ||
  filters.status
    .map(s => s.toLowerCase().trim())
    .includes(room.status?.toLowerCase().trim());
  const matchType =
  filters.type.length === 0 ||
  filters.type.map(t => t.toLowerCase().trim())
         .includes(room.type?.toLowerCase().trim());


const matchCapacity =
  filters.capacity.length === 0 ||
  filters.capacity.includes(Number(room.capacity));


  return matchSearch && matchType && matchStatus && matchCapacity;
});




 const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);
  const startIndex = (currentPage - 1) * roomsPerPage;
  const paginatedRooms = filteredRooms.slice(startIndex, startIndex + roomsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

// console.log(keywords);
// console.log("Filtered Rooms:", filteredRooms);

console.log(filters)

console.log(filteredRooms)

  const { isOpen } = useOutletContext<OutletContext>();

  return (
    <div className="flex flex-col h-[calc(100vh-195px)] overflow-hidden">
    <div className={`grid  gap-y-5 gap-x-2 pt-4  ${isOpen ? "grid-cols-3 pl-10  " : "grid-cols-4 pl-2 "} `}>
      {paginatedRooms.map((room) => {
        const isSelected = selectedRooms.includes(room.id);     
        return (
          <Card key={room.id}  className="rounded-xl shadow-sm relative overflow-hidden w-[22vw] h-44 p-0">
            <div
              className={`relative cursor-pointer rounded-xl overflow-hidden  transition-all duration-200
                ${isSelected ? "ring-4 ring-[#967e62] scale-105" : "hover:ring-2 hover:ring-white"}
              `}
              onClick={() => toogleRoom(room.id)}
            >
            

              {room.image && (
                <img
                  src={room.image}
                  alt=""
                  className="rounded-md w-full h-full object-cover "
                />
              )}
              
      {/* Selected Checkbox */}
     {isSelected && (
        <div
          className="absolute top-2 right-2 w-6 h-6 border-2 rounded-full flex items-center justify-center
            bg-[#967e62] border-[#967e62] transition-all duration-200"
        >
          <FaCheck className="text-white text-sm" />
        </div>
      )}

       
            </div>
                <div className="absolute bottom-1 left-1 right-1 w-[270px] bg-white rounded-xl p-1">
                <div className="flex justify-between pl-2 pr-2">
                  <p className="font-semibold">{room.type}</p>
                  <p className="font-semibold">{room.price}dhs/nuit</p>
                </div>
                <p className="pl-2">{room.numRoom}</p>
                <div className="flex justify-around gap-15 ">
                <div className="flex justify-between items-center gap-2 mt-1 ">
                  <p className="flex items-center gap-1"><GoPeople />{room.capacity}</p>
                  <p className="flex items-center gap-1"><FaBath />{room.bathrooms}</p>
                  <p className="flex items-center gap-1"><LiaRulerCombinedSolid />{room.surface}m²</p>
                </div>
                <div>
                    <Button size="sm" className="bg-[#967e62]"><Link to={`/rooms/${room.id}`}><MdArrowOutward className="text-2xl "/></Link></Button>
                </div>
                </div>
              </div>
          </Card>
          
          
          
        );
        
         
      })}
          {totalPages > 1 && (
  <div className="flex justify-center items-center  fixed bottom-4 left-[40%] ">
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            className={currentPage === 1 ? "opacity-50 pointer-events-none" : ""}
          />
        </PaginationItem>

        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              isActive={currentPage === index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
            className={currentPage === totalPages ? "opacity-50 pointer-events-none" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  </div>
)}

          
     
       
    </div>

       <RoomFooter
  style={{
    left: isOpen ? "200px" : "70px",
    transition: "all 0.3s ease",
  }}
/>


    </div>
    
   
  );
};

export default RoomsList;
