import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Badge } from "@/components/ui/badge";

interface RoomStatusBadgeProps {
  roomId?: number;
}

export function RoomStatusBadge({ roomId }: RoomStatusBadgeProps) {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const checkRoomStatus = async () => {
      const today = new Date().toISOString().split("T")[0];
      const { data, error } = await supabase.rpc("is_room_available_on", {
        p_room_id: roomId,
        p_date: today,
      });

      if (error) setError(error.message);
      else setIsAvailable(data as boolean);
    };
    checkRoomStatus();
  }, [roomId]);

  if (error) {
    return <Badge variant="destructive">Erreur</Badge>;
  }

  if (isAvailable === null) {
    return <Badge variant="outline">Checking...</Badge>;
  }



  return isAvailable ? (
    <Badge className="bg-green-500 text-white">Disponible</Badge>
  ) : (
    <Badge className="bg-red-500 text-white">Occupée</Badge>
  );
}
