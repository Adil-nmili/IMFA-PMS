import React, { useState } from 'react';
import { useRoomStore } from '@/stores/roomsStore';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { X, Search, Filter, SlidersHorizontal, Check } from "lucide-react";
import { Slider } from "@/components/ui/slider"; // Assuming Shadcn slider exists or I might need to use inputs if not

const RoomFilter = () => {
  const {
    rooms,
    searchQuery,
    setSearchQuery,
    filters,
    toogleFilter,
    clearFilters,
    showFilters,
    toogleShowFilters,
  } = useRoomStore();

  const [priceRange, setPriceRange] = useState<{ min: string, max: string }>({ min: "", max: "" });

  const roomTypes = Array.from(
    new Set(rooms.map((room) => room.type?.trim().toLowerCase()).filter(Boolean))
  );

  const roomStatuses = Array.from(
    new Set(rooms.map((room) => room.status?.trim().toLowerCase()).filter(Boolean))
  );

  const roomCapacities = Array.from(new Set(rooms.map((room) => room.capacity)));

  // Mock amenities for now as they might not be populated in all room data
  const amenitiesList = ["WiFi", "TV", "AC", "Mini Bar", "Balcony", "Sea View"];

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    setPriceRange(prev => ({ ...prev, [type]: value }));
    // In a real app, you'd debounce this and update the store filter
    // For now, let's assume we might add a specific price filter action later
  };

  return (
    <div className="flex flex-col gap-4 p-4 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Rooms Management</h2>
          <p className="text-muted-foreground">Manage your hotel rooms and availability.</p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search rooms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>
          <Button
            variant={showFilters ? "secondary" : "outline"}
            onClick={toogleShowFilters}
            className="shrink-0 gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="flex flex-col gap-4 pt-2 animate-in slide-in-from-top-2 duration-200 border-t border-border mt-2">

          <div className="flex flex-wrap gap-2 items-center">
            {/* Type Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 border-dashed">
                  Type
                  {filters.type.length > 0 && (
                    <span className="ml-2 rounded-sm bg-primary px-1 font-normal text-primary-foreground">
                      {filters.type.length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuLabel>Room Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {roomTypes.map((type) => (
                  <DropdownMenuCheckboxItem
                    key={type}
                    checked={filters.type.includes(type)}
                    onCheckedChange={() => toogleFilter("type", type)}
                  >
                    <span className="capitalize">{type}</span>
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Status Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 border-dashed">
                  Status
                  {filters.status.length > 0 && (
                    <span className="ml-2 rounded-sm bg-primary px-1 font-normal text-primary-foreground">
                      {filters.status.length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuLabel>Availability</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {roomStatuses.map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={filters.status.includes(status)}
                    onCheckedChange={() => toogleFilter("status", status)}
                  >
                    <span className="capitalize">{status}</span>
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Capacity Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 border-dashed">
                  Capacity
                  {filters.capacity.length > 0 && (
                    <span className="ml-2 rounded-sm bg-primary px-1 font-normal text-primary-foreground">
                      {filters.capacity.length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuLabel>Guests</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {roomCapacities.map((capacity) => (
                  <DropdownMenuCheckboxItem
                    key={capacity}
                    checked={filters.capacity.includes(capacity)}
                    onCheckedChange={() => toogleFilter("capacity", capacity.toString())}
                  >
                    {capacity} {capacity === 1 ? "person" : "people"}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Price Range (Visual only for now as store update needed) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 border-dashed">
                  Price Range
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 p-4">
                <DropdownMenuLabel>Price per night (DH)</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    className="h-8"
                    value={priceRange.min}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                  />
                  <span>-</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    className="h-8"
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                  />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {(filters.type.length > 0 || filters.status.length > 0 || filters.capacity.length > 0) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-9 px-2 lg:px-3"
              >
                Reset
                <X className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Active Filters Display */}
          <div className="flex flex-wrap gap-2">
            {filters.type.map((type) => (
              <Badge key={type} variant="secondary" className="capitalize pl-2 pr-1 py-1">
                {type}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-background/50 p-0.5"
                  onClick={() => toogleFilter("type", type)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            ))}
            {filters.status.map((status) => (
              <Badge key={status} variant="secondary" className="capitalize pl-2 pr-1 py-1">
                {status}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-background/50 p-0.5"
                  onClick={() => toogleFilter("status", status)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            ))}
            {filters.capacity.map((capacity) => (
              <Badge key={capacity} variant="secondary" className="pl-2 pr-1 py-1">
                {capacity} ppl
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-background/50 p-0.5"
                  onClick={() => toogleFilter("capacity", capacity.toString())}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomFilter;