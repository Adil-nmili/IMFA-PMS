import React from 'react';
import { useRoomStore } from '@/stores/roomsStore';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { X, Search } from "lucide-react";

const RoomFilter = () => {
  const {rooms,
    searchQuery,
    setSearchQuery,
    filters,
    toogleFilter,
    clearFilters,
    showFilters,
    toggleShowFilters,
  } = useRoomStore();

const roomTypes = Array.from(new Set(rooms.map(room => room.type)));
const roomStatuses = Array.from(new Set(rooms.map(r => r.status)));
const roomCapacities = Array.from(new Set(rooms.map(r => r.capacity)));

 
  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-white rounded-lg border">
      {/* Search Input */}
      <div className='flex justify-around items-center gap-[60vw]'>
        <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search room..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-64 pl-10"
        />
     
      </div>
       {/* Action Buttons */}
      <div className="ml-auto flex gap-2">
       <Button onClick={toggleShowFilters}>Apply filter</Button>

      </div>

      </div>
  

    
    
      {showFilters && (
      <div className='flex justify-around items-center gap-[60vw]'>
          <div className="flex gap-3 flex-wrap mt-4 w-full">
          {/* Type Filter */}
          <DropdownMenu>
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
                  {type}
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
                  {status}
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
        <div>
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