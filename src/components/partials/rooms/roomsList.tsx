import React, { useEffect, useState } from "react";
import RoomCard from "@/components/partials/rooms/roomCard";
import { useRoomStore } from "@/stores/roomsStore";
import RoomFooter from "./roomFooter";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
        {paginatedRooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            isSelected={selectedRooms.includes(room.id)}
            onToggleSelect={toogleRoom}
          />
        ))}
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
