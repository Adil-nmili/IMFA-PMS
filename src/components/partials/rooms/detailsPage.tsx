import { useParams, Link, useNavigate } from "react-router-dom";
import { useRoomStore } from "@/stores/roomsStore";
import { GoPeople } from "react-icons/go";
import { FaBath, FaWifi, FaCar, FaTv, FaSnowflake, FaCoffee } from "react-icons/fa";
import { LiaRulerCombinedSolid } from "react-icons/lia";
import { 
  Star, 
  MapPin, 
  ChevronLeft, 
  Heart, 
  Share2, 
  Calendar, 
  Shield,
  CheckCircle,
  Wifi,
  Wind
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { RoomStatusBadge } from "./roomStatusBadge";

export default function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const room = useRoomStore((state) =>
    state.rooms.find((r) => r.id === Number(id))
  );

  if (!room) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#967e62]"></div>
        <p className="text-gray-500 text-lg">Loading room details...</p>
        <Button variant="outline" onClick={() => navigate("/rooms")}>
          Back to Rooms
        </Button>
      </div>
    );
  }

  // Format price
  const formatPrice = (pricePerNight: number | string) => {
    const numPrice = typeof pricePerNight === 'number' ? pricePerNight : parseFloat(String(pricePerNight).replace(/[^0-9.-]/g, ''));
    return numPrice.toLocaleString('fr-MA') + ' DH';
  };

  // Room amenities
  const amenities = [
    { icon: <Wifi className="h-5 w-5" />, label: "High-Speed WiFi" },
    { icon: <FaTv className="h-5 w-5" />, label: "Smart TV" },
    { icon: <FaSnowflake className="h-5 w-5" />, label: "Air Conditioning" },
    { icon: <FaCoffee className="h-5 w-5" />, label: "Coffee Maker" },
    { icon: <FaCar className="h-5 w-5" />, label: "Free Parking" },
    { icon: <Shield className="h-5 w-5" />, label: "Safe Box" },
  ];

  // Mock reviews
  const reviews = [
    { id: 1, name: "Mohamed A.", rating: 5, date: "2024-01-15", comment: "Excellent room with amazing views. Very clean and comfortable!" },
    { id: 2, name: "Fatima Z.", rating: 4, date: "2024-01-10", comment: "Great value for money. Staff was very helpful and friendly." },
    { id: 3, name: "Ahmed K.", rating: 5, date: "2024-01-05", comment: "Perfect location and beautiful room. Would definitely stay again!" },
  ];

  // Gallery images
  const galleryImages = [
    room.image,
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w-800&auto=format&fit=crop",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/rooms")}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Rooms
          </Button>
          
          <div className="flex items-center gap-3">
            {<RoomStatusBadge roomId={room.id} />}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <img
                  src={galleryImages[0]}
                  alt={room.type}
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                />
              </div>
              <div className="grid grid-rows-2 gap-4">
                {galleryImages.slice(1).map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Room view ${index + 1}`}
                    className="w-full h-44 object-cover rounded-xl shadow"
                  />
                ))}
              </div>
            </div>

            {/* Room Header */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="bg-[#967e62]/10 text-[#967e62]">
                      {room.numRoom} Available
                    </Badge>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">4.8 (128 reviews)</span>
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900">{room.type}</h1>
                  <div className="flex items-center gap-2 mt-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>Downtown, Marrakech</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#967e62]">
                    {room.pricePerNight} DH
                    <span className="text-sm font-normal text-gray-500"> / night</span>
                  </p>
                  <p className="text-sm text-gray-500">Including taxes & fees</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-[#967e62]/10">
                    <GoPeople className="text-[#967e62] text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold">{room.capacity} People</p>
                    <p className="text-sm text-gray-500">Capacity</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-[#967e62]/10">
                    <FaBath className="text-[#967e62] text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold">{room.bathrooms} Bathrooms</p>
                    <p className="text-sm text-gray-500">Private</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-[#967e62]/10">
                    <LiaRulerCombinedSolid className="text-[#967e62] text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold">{room.surface} m²</p>
                    <p className="text-sm text-gray-500">Surface Area</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-[#967e62]/10">
                    <Wind className="text-[#967e62] text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold">Sea View</p>
                    <p className="text-sm text-gray-500">Balcony</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="space-y-4 pt-6">
                <h3 className="text-xl font-semibold">About this room</h3>
                <p className="text-gray-600 leading-relaxed">
                  Experience luxury and comfort in our beautifully designed {room?.type?.toLowerCase()}. 
                  Featuring modern Moroccan architecture with contemporary amenities, this room offers 
                  the perfect blend of tradition and comfort.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Fast & Secure booking with no cancellation fees</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Premium bedding and luxury bathroom amenities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Daily housekeeping and 24/7 concierge service</span>
                  </li>
                </ul>
              </TabsContent>
              
              <TabsContent value="amenities" className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                      <div className="text-[#967e62]">
                        {amenity.icon}
                      </div>
                      <span>{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="pt-6">
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold">{review.name}</h4>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
                        {/* Similar Rooms */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Similar Rooms</h3>
              <div className="space-y-4 flex gap-2">
                {[1, 2,3].map((i) => (
                  <div key={i} className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <img
                      src={room.image}
                      alt="Similar room"
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">Deluxe Room {i}</h4>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm">4.9</span>
                      </div>
                      <p className="text-[#967e62] font-semibold mt-2">450 DH / night</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SECTION - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-xl border-0 p-0">
              <CardHeader className="bg-gradient-to-r from-[#967e62] to-[#b8a287] text-white rounded-t-lg">
                <CardTitle className="text-2xl">Book This Room</CardTitle>
                <p className="text-white/90">Secure your stay today</p>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Price Summary */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Price per night</span>
                    <span className="font-semibold">{formatPrice(room.pricePerNight)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Service fee</span>
                    <span className="font-semibold">150 DH</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>  
                    <span className="text-[#967e62]">
                      {formatPrice(typeof room.pricePerNight === 'number' ? room.pricePerNight + 150 : parseFloat(String(room.pricePerNight )) + 150)}
                    </span>
                  </div>
                </div>

                {/* Booking Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Check-in / Check-out</label>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <input
                          type="date"
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#967e62] focus:border-transparent"
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="date"
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#967e62] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Guests</label>
                    <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#967e62] focus:border-transparent">
                      {[...Array(room.capacity)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Security Badges */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium">Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium">Free Cancellation</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <Button className="w-full bg-[#967e62] hover:bg-[#7c6851] text-white h-12 text-lg">
                    Book Now
                  </Button>
                  <Button variant="outline" className="w-full h-12">
                    Contact Host
                  </Button>
                </div>

                {/* Additional Info */}
                <div className="text-center pt-4 border-t">
                  <p className="text-sm text-gray-500">
                    You won't be charged yet • Instant confirmation
                  </p>
                </div>
              </CardContent>
            </Card>


          </div>
        </div>
      </div>
    </div>
  );
}