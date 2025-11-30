import React, { useState } from 'react';
import { useRoomStore } from "@/stores/roomsStore";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { X, ChevronDown, ChevronUp, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const RoomFooter = () => {
  const { selectedRooms, rooms, clearSelectedRooms } = useRoomStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const selectedRoomsData = rooms.filter((room) => selectedRooms.includes(room.id));

  // Fix NaN issue by ensuring price is a number
  const selectedRoomsTotal = selectedRoomsData.reduce((sum, room) => {
    const price = Number(room.price) || 0;
    return sum + price;
  }, 0);

  if (selectedRooms.length === 0) return null;

  // Collapsed State (Small floating button)
  if (isCollapsed) {
    return (
      <div className="fixed bottom-6 right-6 z-50 animate-in fade-in zoom-in duration-300">
        <Button
          onClick={() => setIsCollapsed(false)}
          className="rounded-full h-14 w-14 shadow-xl bg-primary text-primary-foreground hover:bg-primary/90 relative"
        >
          <ShoppingCart className="h-6 w-6" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold h-6 w-6 flex items-center justify-center rounded-full border-2 border-background">
            {selectedRooms.length}
          </span>
        </Button>
      </div>
    );
  }

  // Expanded State
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 animate-in slide-in-from-bottom-4 duration-300">
      {/* Collapse Button */}
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setIsCollapsed(true)}
        className="self-end rounded-full h-8 w-8 p-0 shadow-md bg-background/80 backdrop-blur-sm hover:bg-background"
        title="Collapse"
      >
        <ChevronDown className="h-4 w-4" />
      </Button>

      {/* Main Footer Content */}
      <div className="bg-neutral-900 dark:bg-neutral-800 text-white rounded-2xl shadow-2xl min-w-[340px] md:min-w-[420px] overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-base">Selection</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-medium">
              {selectedRooms.length} {selectedRooms.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <span className="font-bold text-2xl">
            {selectedRoomsTotal.toLocaleString()} DH
          </span>
        </div>

        {/* List of selected rooms */}
        <ScrollArea className="max-h-[200px]">
          <div className="px-4 py-2 space-y-2">
            {selectedRoomsData.map(room => (
              <div key={room.id} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                <div className="flex flex-col">
                  <span className="font-medium text-sm">Room {room.numRoom || room.id}</span>
                  <span className="text-xs text-white/60 capitalize">{room.type || 'Standard'}</span>
                </div>
                <span className="font-semibold">{Number(room.price) || 0} DH</span>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Actions */}
        <div className="px-4 py-3 border-t border-white/10 flex gap-2">
          <Button
            asChild
            className="flex-1 bg-white text-neutral-900 hover:bg-white/90 font-semibold shadow-sm"
          >
            <Link to="/reservation">
              Book Now
            </Link>
          </Button>
          <Button
            onClick={clearSelectedRooms}
            variant="ghost"
            className="border border-white/30 hover:bg-white/10 text-white hover:text-white px-4"
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomFooter;
