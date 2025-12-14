import  { useEffect, useState } from 'react';
import { useRoomStore } from "@/stores/roomsStore";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { X, ChevronDown, ShoppingCart } from "lucide-react";
import ReservationModal from '../modals/reservationModal';
import GlobalModal from '@/components/shared-component/globalModal';

const RoomFooter = () => {
  const { selectedRooms, rooms, clearSelectedRooms, toogleRoom } = useRoomStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const selectedRoomsData = rooms.filter((room) => selectedRooms.includes(room.id));

  // Calculate total price
  const [selectedRoomsTotal, setSelectedRoomsTotal] = useState(0);

  useEffect(() => {
    const total = selectedRoomsData.reduce((sum, room) => {
      // Handle different price formats
      const price = typeof room.price === 'number' ? room.price : parseFloat(String(room.price).replace(/[^0-9.-]/g, '')) || 0;
      return sum + price;
    }, 0);
    setSelectedRoomsTotal(total);
  }, [selectedRooms, rooms, selectedRoomsData])

  const handleDisplayBookingModal = () => {
    setIsReservationModalOpen(true);
  }

  if (selectedRooms.length === 0) return null;

  // Collapsed State (Small floating button)
  if (isCollapsed) {
    return (
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 animate-in fade-in zoom-in duration-300">
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
    <div className="fixed bottom-2 right-2 left-2 md:bottom-6 md:right-6 md:left-auto z-40 flex flex-col items-end gap-2 animate-in slide-in-from-bottom-4 duration-300">
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
      <div className="bg-neutral-900 dark:bg-neutral-800 text-white rounded-2xl shadow-2xl w-full md:min-w-[420px] md:max-w-[520px] overflow-hidden">
        {/* Header */}
        <div className="px-3 md:px-4 py-3 border-b border-white/10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-bold text-sm md:text-base">Selection</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-medium">
              {selectedRooms.length} {selectedRooms.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <span className="font-bold text-lg md:text-2xl flex-shrink-0">
            {selectedRoomsTotal.toLocaleString('fr-MA')} DH
          </span>
        </div>

        {/* List of selected rooms with images - Fixed scroll */}
        <div className="max-h-[240px] md:max-h-[280px] overflow-y-auto">
          <div className="px-3 md:px-4 py-2 space-y-2">
            {selectedRoomsData.map(room => (
              <div
                key={room.id}
                className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0 hover:bg-white/5 rounded-lg px-2 transition-colors"
              >
                {/* Room Image */}
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white/10">
                  {room.image ? (
                    <img
                      src={room.image}
                      alt={`Room ${room.numRoom}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/40 text-xs">
                      No Image
                    </div>
                  )}
                </div>

                {/* Room Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col min-w-0">
                      <span className="font-medium text-sm truncate">
                        Room {room.numRoom || room.id}
                      </span>
                      <span className="text-xs text-white/60 capitalize truncate">
                        {room.type || 'Standard'}
                      </span>
                      <span className="text-xs text-white/40">
                        {room.capacity} {room.capacity === 1 ? 'guest' : 'guests'}
                      </span>
                    </div>
                    <div className="flex flex-col items-end flex-shrink-0">
                      <span className="font-semibold text-sm whitespace-nowrap">
                        {typeof room.price === 'number' ? room.price : parseFloat(String(room.price).replace(/[^0-9.-]/g, '')) || 0} DH
                      </span>
                      <span className="text-xs text-white/40">per night</span>
                    </div>
                  </div>
                </div>

                {/* Remove individual room button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toogleRoom(room.id);
                  }}
                  className="flex-shrink-0 w-6 h-6 rounded-full hover:bg-red-500/20 flex items-center justify-center transition-colors group"
                  title="Remove this room"
                >
                  <X className="h-3 w-3 text-white/40 group-hover:text-red-400" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="px-3 md:px-4 py-3 border-t border-white/10 flex gap-2">
          <Button
            asChild
            className="flex-1 bg-white text-neutral-900 hover:bg-white/90 font-semibold shadow-sm text-sm md:text-base"
          >
            <GlobalModal >
              <ReservationModal/>
            </GlobalModal>
          </Button>
          <Button
            onClick={clearSelectedRooms}
            variant="ghost"
            className="border border-white/30 hover:bg-white/10 text-white hover:text-white px-3 md:px-4 text-sm md:text-base whitespace-nowrap"
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomFooter;
