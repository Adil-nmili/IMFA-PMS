import { useParams, Link } from "react-router-dom";
import { useRoomStore } from "@/stores/roomsStore";
import { GoPeople } from "react-icons/go";
import { FaBath } from "react-icons/fa";
import { LiaRulerCombinedSolid } from "react-icons/lia";
import { Star } from "lucide-react";

export default function DetailsPage() {
  const { id } = useParams();
  const room = useRoomStore((state) =>
    state.rooms.find((r) => r.id === Number(id))
  );

  if (!room)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading room details...</p>
      </div>
    );

  return (
    <div className="p-3">
      <div className="  overflow-hidden grid grid-cols-1 lg:grid-cols-3">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 p-1">
          <img
            src={room.image}
            alt={room.type}
            className="w-full h-72 object-cover rounded-xl "
          />

          <div className="flex justify-between items-start p-2 ">
            <div>
              <h1 className="text-2xl font-bold">{room.type}</h1>
              <p className="text-gray-500">{room.numRoom}</p>
            </div>
            <p className="text-lg font-semibold text-[#967e62]">
              Starts from: {room.price} MAD
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-700">
              <GoPeople className="text-[#967e62]" />
              <span>{room.capacity} people</span>
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <FaBath className="text-[#967e62]" />
              <span>{room.bathrooms} bathrooms</span>
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <LiaRulerCombinedSolid className="text-[#967e62]" />
              <span>{room.surface} m²</span>
            </div>

            <div className="flex items-center gap-1 text-gray-700">
              <Star className="text-[#967e62] w-5 h-5 fill-[#967e62]" />
              <span>Highly Rated</span>
            </div>
          </div>

          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Fast & Secure, No Booking or Cancellation Fee. Book your room easily
            and enjoy premium comfort. Choose from a wide range of rooms and
            enjoy exclusive deals and services.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <Link to="/rooms">
              <button className="text-gray-500 underline ml-2 cursor-pointer">
                Back to Rooms
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT SECTION (REVIEWS) */}
        <div className=" p-2 flex flex-col">
        <div>
             <img
            src={room.image}
            alt={room.type}
            className="w-full h-32 object-cover rounded-xl mb-6"
          />
        </div>
        <div> <img
            src={room.image}
            alt={room.type}
            className="w-full h-32 object-cover rounded-xl mb-6"
          />
          </div>
 
         
        </div>
      </div>
    </div>
  );
}
