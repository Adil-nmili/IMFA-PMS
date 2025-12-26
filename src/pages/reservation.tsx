import { ClientReservationCard } from "@/components/reservationDetails/clientInfosCard";
import { ReservationCard } from "@/components/reservationDetails/reservationCard";
import { RoomCard } from "@/components/reservationDetails/roomCard";
import { useReservationsStore } from "@/stores/reservationsStore";
import { useRoomsStore } from "@/stores/roomsStore";
import { useEffect } from "react";

const ReservationPage = () => {
  const {
    reservation: reservations,

    fetchReservation,
  } = useReservationsStore();

  const store = useRoomsStore();
  const rooms = store.rooms;
  const fetchRooms = store.fetchRooms;
  const loading = store.loading;
  const error = store.error;

  useEffect(() => {
    fetchRooms();
    fetchReservation();
  }, []);
  //we need to add the logic fro selected room later ,so we can  display just  the slected room details
  console.log(rooms);
  //const selectedRoom = rooms[6];

  const selectedReservation = reservations?.[0];
  const selectedRoomId = selectedReservation?.reservations_rooms?.[0]?.room_id;
  const selectedRoom = rooms.find((room) => room.id === selectedRoomId);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg">Loading rooms...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg text-red-500">Error: {error}</p>
      </div>
    );
  }
  if (rooms.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg">No rooms available</p>
      </div>
    );
  }
  return (
    <div className="h-[calc(100vh-20px)] border border-[#aaa499] overflow-hidden  mt-[-18px] ml-[-22px] rounded-2xl ">
      {/* mainDiv -2column grid */}
      <div className="grid grid-cols-2 gap-3 h-full p-3">
        {/* left Column-RoomCard on top,ClientCard down */}
        <div className="flex flex-col gap-3 h-full">
          <div className="flex-1 min-h-0">
            <div className="flex-1 min-h-0">
              {selectedRoom ? (
                <RoomCard room={selectedRoom} />
              ) : (
                <p className="text-lg">No room selected</p>
              )}
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <ClientReservationCard />
          </div>
        </div>
        {/*rightColumn-ReservationCard*/}
        <div className="h-screen">
          <ReservationCard />
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
