import React from "react";
import { cn } from "@/lib/utils";
import type { Room } from "@/types/room";
import { GoPeople } from "react-icons/go";
import { FaBath } from "react-icons/fa6";
import { LiaRulerCombinedSolid } from "react-icons/lia";
import { FaCheck } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface RoomCardProps {
  room: Room;
  isSelected?: boolean;
  onToggleSelect?: (id: number) => void;
  className?: string;
}

const RoomCard: React.FC<RoomCardProps> = ({
  room,
  isSelected = false,
  onToggleSelect,
  className,
}) => {
  return (
    <div
      className={cn(
        "group relative overflow-hidden transition-all duration-300 hover:shadow-lg border border-border bg-card rounded-xl",
        isSelected ? "ring-2 ring-primary border-primary" : "hover:border-primary/50",
        className
      )}
    >
      {/* Image Section */}
      <div
        className="relative aspect-[4/3] overflow-hidden cursor-pointer"
        onClick={() => onToggleSelect?.(room.id)}
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

        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground rounded-full p-1 shadow-md">
            <FaCheck className="w-3 h-3" />
          </div>
        )}

        {/* Room Number Badge */}
        <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
          <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border-none">
            Room {room.numRoom}
          </Badge>
        </div>
      </div>

      {/* Header Section */}
      <div className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold capitalize">{room.type}</h3>
            <p className="text-sm text-muted-foreground capitalize">{room.status}</p>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-primary">{Number(room.price).toLocaleString()}</span>
            <span className="text-xs text-muted-foreground block">DH/night</span>
          </div>
        </div>
      </div>

      {/* Content Section - Room Details */}
      <div className="p-4 pt-2">
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
      </div>

      {/* Footer Section - Action Button */}
      <div className="p-4 pt-0">
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group-hover:translate-y-0 transition-all">
          <Link to={`/rooms/${room.id}`} className="flex items-center justify-center gap-2">
            View Details <MdArrowOutward />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default RoomCard;
