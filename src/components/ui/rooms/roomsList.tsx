import React, { useEffect, useState } from "react";
import {
  RoomCard,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/rooms/roomCard";
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
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const RoomsList = () => {
  const {
    selectedRooms,
    toogleRoom,
    rooms,
    fetchRooms,
    searchQuery,
    filters,
  } = useRoomStore();
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 8;

  useEffect(() => {
    fetchRooms();
  }, []);

  const keywords = searchQuery
    ? searchQuery.toLowerCase().split(" ").filter((k) => k !== "")
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
        }).some((value) => value?.toString().toLowerCase().startsWith(keyword))
      );

    const matchStatus =
      filters.status.length === 0 ||
      filters.status
        .map((s) => s.toLowerCase().trim())
        .includes(room.status?.toLowerCase().trim());
    const matchType =
      filters.type.length === 0 ||
      filters.type
        .map((t) => t.toLowerCase().trim())
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedRooms.map((room) => {
          const isSelected = selectedRooms.includes(room.id);
          return (
            <RoomCard
              key={room.id}
              className={cn(
                "group relative overflow-hidden transition-all duration-300 hover:shadow-lg border-border bg-card",
                isSelected ? "ring-2 ring-primary border-primary" : "hover:border-primary/50"
              )}
            >
              <div
                className="relative aspect-[4/3] overflow-hidden cursor-pointer"
                onClick={() => toogleRoom(room.id)}
              >
                {room.image ? (
                  <img
                    src={room.image}
                    alt={room.type}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-muted flex items-center justify-center text-muted-foreground">
                    No Image
                  </div>
                )}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {isSelected && (
                  <div className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground rounded-full p-1 shadow-md">
                    <FaCheck className="w-3 h-3" />
                  </div>
                )}

                <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                  <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border-none">
                    Room {room.numRoom}
                  </Badge>
                </div>
              </div>

              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-bold capitalize">{room.type}</CardTitle>
                    <p className="text-sm text-muted-foreground capitalize">{room.status}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-primary">{room.price}</span>
                    <span className="text-xs text-muted-foreground block">DH/night</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-4 pt-2">
                <div className="flex items-center justify-between text-sm text-muted-foreground bg-muted/50 p-2 rounded-lg">
                  <div className="flex items-center gap-1" title="Capacity">
                    <GoPeople className="w-4 h-4" />
                    <span>{room.capacity}</span>
                  </div>
                  <div className="flex items-center gap-1" title="Bathrooms">
                    <FaBath className="w-4 h-4" />
                    <span>{room.bathrooms}</span>
                  </div>
                  <div className="flex items-center gap-1" title="Surface Area">
                    <LiaRulerCombinedSolid className="w-4 h-4" />
                    <span>{room.surface}m²</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group-hover:translate-y-0 transition-all">
                  <Link to={`/rooms/${room.id}`} className="flex items-center justify-center gap-2">
                    View Details <MdArrowOutward />
                  </Link>
                </Button>
              </CardFooter>
            </RoomCard>
          );
        })}
      </div>

      {paginatedRooms.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No rooms found matching your criteria.
        </div>
      )}

      <RoomFooter />

      {totalPages > 1 && (
        <div className="flex justify-center py-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={cn("cursor-pointer", currentPage === 1 && "pointer-events-none opacity-50")}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => handlePageChange(page)}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={cn("cursor-pointer", currentPage === totalPages && "pointer-events-none opacity-50")}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default RoomsList;
