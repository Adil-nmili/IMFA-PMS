import { ClientReservationCard } from "@/components/reservationDetails/clientInfosCard";
import { ReservationCard } from "@/components/reservationDetails/reservationCard";
import { RoomCard } from "@/components/reservationDetails/roomCard";

const ReservationPage = () => {
  return (
    <div className="h-[calc(100vh-20px)] border border-[#aaa499] overflow-hidden  mt-[-18px] ml-[-22px] rounded-2xl ">
      {/* mainDiv -2column grid */}
      <div className="grid grid-cols-2 gap-3 h-full p-3">
        {/* left Column-RoomCard on top,ClientCard down */}
        <div className="flex flex-col gap-3 h-full">
          <div className="flex-1 min-h-0">
            <RoomCard />
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
