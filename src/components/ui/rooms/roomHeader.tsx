import React from 'react';
import { useRoomStore } from '@/stores/roomsStore';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { X, Search } from "lucide-react";
import { BiFilterAlt } from "react-icons/bi";

const RoomFilter = () => {
  const {rooms,
    searchQuery,
    setSearchQuery,
    filters,
    toogleFilter,
    clearFilters,
    showFilters,
    toogleShowFilters,
  } = useRoomStore();

const roomTypes = Array.from(
  new Set(
    rooms
      .map((room) => room.type?.trim().toLowerCase()) 
      .filter(Boolean) 
  )
);

const roomStatuses = Array.from(
  new Set(
    rooms
      .map((room) => room.status?.trim().toLowerCase())
      .filter(Boolean)
  )
);

const roomCapacities = Array.from(new Set(rooms.map(room => room.capacity)));


 
  return (
    <div className='flex flex-col  bg-white rounded-lg border p-1.5   '> 
    <div className="flex flex-wrap justify-between items-center px-4.5  ">
       <div className='text-xl '>
         <h2 className='font-semibold '>Rooms</h2>
       </div>
      {/* Search Input */}
      <div className='flex  justify-between items-center gap-1.5 '>
        <div className="relative ">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-4" />
        <Input
          placeholder="Search room..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-64 pl-7  "
        />
     
      </div>
       {/* Action Buttons */}
      <div className=" ">
       <Button  onClick={toogleShowFilters} className='bg-[#967e62]  '><BiFilterAlt /></Button>

      </div>

      </div>
    </div>
  

    
    
      {showFilters && (
      <div className='flex justify-between items-center  '>
          <div className="flex justify-between items-center gap-1 pl-4 ">
          {/* Type Filter */}
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Type</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              {roomTypes.map((type) => (
                <DropdownMenuCheckboxItem
                  key={type}
                  checked={filters.type.includes(type)}
                  onCheckedChange={() => toogleFilter("type", type)}
                >
                      {type.charAt(0).toUpperCase() + type.slice(1)}

                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {filters.type.map((type) => (
          <Badge key={type} variant="secondary" className="flex items-center gap-1">
            Type: {type}
            <X
              className="w-3 h-3 cursor-pointer"
              onClick={() => toogleFilter("type", type)}
            />
          </Badge>
        ))}

          {/* Status Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Status</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              {roomStatuses.map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={filters.status.includes(status)}
                  onCheckedChange={() => toogleFilter("status", status)}
                >
                     {status.charAt(0).toUpperCase() + status.slice(1)}

                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
            {filters.status.map((status) => (
          <Badge key={status} variant="secondary" className="flex items-center gap-1">
            Status: {status}
            <X
              className="w-3 h-3 cursor-pointer"
              onClick={() => toogleFilter("status", status)}
            />
          </Badge>
        ))}
          </DropdownMenu>

          {/* Capacity Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Capacity</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              {roomCapacities.map((capacity) => (
                <DropdownMenuCheckboxItem
                  key={capacity}
                  checked={filters.capacity.includes(capacity)}
                  onCheckedChange={() => toogleFilter("capacity", capacity.toString())}
                >
                  {capacity} {capacity === 1 ? 'person' : 'people'}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
             {filters.capacity.map((capacity) => (
          <Badge key={capacity} variant="secondary" className="flex items-center gap-1">
            Capacity: {capacity}
            <X
              className="w-3 h-3 cursor-pointer"
              onClick={() => toogleFilter("capacity", capacity.toString())}
            />
          </Badge>
        ))}
          </DropdownMenu>
           
          
          </div>
          <div className=''>
        <Button variant="ghost" onClick={clearFilters}>
          Clear all
        </Button>
          </div>
      </div>
      )}
      
</div>

     

     
  );
};

export default RoomFilter;