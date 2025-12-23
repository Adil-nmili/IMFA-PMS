import React, { useState } from "react";
import { 
  Calendar, 
  User, 
  FileText, 
  CreditCard, 
  Plus, 
  LogIn, 
  CheckCircle, 
  Ruler, 
  Eye, 
  Wifi, 
  Tv, 
  Airplay,
  MapPin,
  Phone,
  Mail,
  Globe,
  Shield,
  Edit,
  Download,
  Printer,
  Share2,
  Clock,
  Star,
  Bed,
  Users,
  ChevronRight,
  ChevronLeft,
  X,
  AlertCircle,
  MoreVertical,
  Smartphone,
  CalendarDays,
  Wallet,
  ShieldCheck,
  Key,
  Receipt,
  QrCode,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// Data types
interface Room {
  numChambre: string;
  typeChambre: string;
  statut: string;
  pricePerNight: number;
  surface: string;
  vue: string;
  equipements: string[];
  picture: string;
  amenities?: string[];
  rating?: number;
  beds?: string;
  maxOccupancy?: number;
}

interface Client {
  nomClient: string;
  telClient: string;
  emailClient: string;
  cinClient: string;
  statutSociale: string;
  adresseClient: string;
  dateNaissanceClient: Date;
  preferences?: string[];
  loyaltyPoints?: number;
  previousStays?: number;
  profileImage?: string;
}

interface Reservation {
  idRes: string;
  statut: string;
  dateDebut: Date;
  dateFin: Date;
  nbNights: number;
  roomIndex: number;
  clientIndex: number;
  paymentMethod?: string;
  specialRequests?: string;
  bookingSource?: string;
  notes?: string;
  createdAt?: Date;
}

// Data values
const rooms: Room[] = [
  {
    numChambre: "203",
    typeChambre: "Chambre Simple Deluxe",
    statut: "Disponible",
    pricePerNight: 1200,
    surface: "22 m²",
    vue: "Jardin",
    equipements: ["Wi-Fi", "TV", "Climatisation"],
    picture: "https://png.pngtree.com/thumb_back/fw800/background/20220311/pngtree-bedroom-guest-room-five-star-hotel-image_990205.jpg",
    amenities: ["Minibar", "Sèche-cheveux", "Coffre-fort", "Service en chambre"],
    rating: 4.8,
    beds: "1 Lit Double",
    maxOccupancy: 2
  },
];

const clients: Client[] = [
  {
    nomClient: "Ahmed Benali",
    telClient: "+212 611-425690",
    emailClient: "ahmed.benali@gmail.com",
    cinClient: "RF258792",
    statutSociale: "Célibataire",
    adresseClient: "123 Rue des Orangers, Oujda 60000",
    dateNaissanceClient: new Date("2004-06-05"),
    preferences: ["Chambre non-fumeur", "Réveil matin", "Daily cleaning"],
    loyaltyPoints: 1250,
    previousStays: 3,
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed"
  },
];

const reservations: Reservation[] = [
  {
    idRes: "RF52828",
    statut: "En attente",
    dateDebut: new Date("2024-09-01"),
    dateFin: new Date("2024-09-03"),
    nbNights: 2,
    roomIndex: 0,
    clientIndex: 0,
    paymentMethod: "Carte Bancaire",
    specialRequests: "Chambre avec vue jardin si possible",
    bookingSource: "Site Web",
    notes: "Client fidèle - 3 séjours précédents",
    createdAt: new Date("2024-08-20")
  },
];

const ReservationDetails = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedRoom, setSelectedRoom] = useState(rooms[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Helper functions
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculateSubtotal = () => {
    return selectedRoom.pricePerNight * reservations[0].nbNights;
  };

  const calculateTaxes = () => {
    return calculateSubtotal() * 0.10; // 10% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTaxes();
  };

  const handleConfirmReservation = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Réservation confirmée avec succès!");
      setIsLoading(false);
    }, 1500);
  };

  const handleCheckIn = () => {
    toast.success("Check-in effectué avec succès!");
  };

  const handleGenerateInvoice = () => {
    toast.success("Facture générée avec succès!");
  };

  const handleSendConfirmation = () => {
    toast.success("Confirmation envoyée au client!");
  };

  const renderStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string, icon: React.ReactNode }> = {
      'En attente': { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: <Clock className="h-3 w-3" /> },
      'Confirmé': { color: 'bg-green-100 text-green-800 border-green-200', icon: <CheckCircle className="h-3 w-3" /> },
      'Annulé': { color: 'bg-red-100 text-red-800 border-red-200', icon: <X className="h-3 w-3" /> },
      'Disponible': { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: <CheckCircle className="h-3 w-3" /> },
    };

    const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: null };

    return (
      <Badge variant="outline" className={`${config.color} flex items-center gap-1`}>
        {config.icon}
        {status}
      </Badge>
    );
  };

  const reservation = reservations[0];
  const client = clients[reservation.clientIndex];
  const formattedDate = (date: Date) => format(date, 'dd MMMM yyyy', { locale: fr });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                  onClick={() => window.history.back()}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Retour
                </Button>
                <h1 className="text-3xl font-bold text-gray-900">Détails de Réservation</h1>
              </div>
              <p className="text-gray-600">
                Réservation #{reservation.idRes} • Créée le {format(reservation.createdAt || new Date(), 'PP', { locale: fr })}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="h-4 w-4" />
                    Actions
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions Rapides</DropdownMenuLabel>
                  <DropdownMenuItem onClick={handleSendConfirmation}>
                    <Mail className="mr-2 h-4 w-4" />
                    Envoyer confirmation
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleGenerateInvoice}>
                    <FileText className="mr-2 h-4 w-4" />
                    Générer facture
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Printer className="mr-2 h-4 w-4" />
                    Imprimer
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Share2 className="mr-2 h-4 w-4" />
                    Partager
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Modifier
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button 
                className="bg-gradient-to-r from-[#967E62] to-[#795E46] hover:from-[#795E46] hover:to-[#3F3124]"
                onClick={handleConfirmReservation}
                disabled={isLoading}
              >
                {isLoading ? "Confirmation..." : "Confirmer Réservation"}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Room Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Room Gallery */}
            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="relative">
                <img
                  src={selectedRoom.picture}
                  alt={`Chambre ${selectedRoom.numChambre}`}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-start justify-between text-white">
                    <div>
                      <Badge className="mb-2 bg-white/20 backdrop-blur-sm border-0">
                        {selectedRoom.typeChambre}
                      </Badge>
                      <h2 className="text-3xl font-bold mb-1">Chambre {selectedRoom.numChambre}</h2>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{selectedRoom.rating}/5</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>Max {selectedRoom.maxOccupancy} pers.</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bed className="h-4 w-4" />
                          <span>{selectedRoom.beds}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0"
                    >
                      Voir toutes les photos
                    </Button>
                  </div>
                </div>
              </div>
              
              <CardContent className="pt-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4">
                    <TabsTrigger value="overview">Aperçu</TabsTrigger>
                    <TabsTrigger value="amenities">Équipements</TabsTrigger>
                    <TabsTrigger value="policies">Politiques</TabsTrigger>
                    <TabsTrigger value="reviews">Avis</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card className="border-0 shadow-sm">
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-100">
                              <Ruler className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Surface</p>
                              <p className="font-semibold">{selectedRoom.surface}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-0 shadow-sm">
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-green-100">
                              <Eye className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Vue</p>
                              <p className="font-semibold">{selectedRoom.vue}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-0 shadow-sm">
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-purple-100">
                              <Bed className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Type de lit</p>
                              <p className="font-semibold">{selectedRoom.beds}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-0 shadow-sm">
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-amber-100">
                              <CreditCard className="h-5 w-5 text-amber-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Prix/Nuit</p>
                              <p className="font-semibold">{formatCurrency(selectedRoom.pricePerNight)}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-3">Description</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Profitez d'un séjour confortable dans notre chambre simple deluxe, offrant une vue imprenable 
                        sur le jardin. Parfaitement équipée pour un séjour agréable avec tous les services modernes 
                        nécessaires pour votre confort.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="amenities" className="pt-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedRoom.equipements.concat(selectedRoom.amenities || []).map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                          <div className="p-2 rounded-md bg-gray-100">
                            {item === "Wi-Fi" && <Wifi className="h-4 w-4" />}
                            {item === "TV" && <Tv className="h-4 w-4" />}
                            {item === "Climatisation" && <Airplay className="h-4 w-4" />}
                            {item === "Minibar" && <Globe className="h-4 w-4" />}
                            {item === "Sèche-cheveux" && <Key className="h-4 w-4" />}
                            {item === "Coffre-fort" && <ShieldCheck className="h-4 w-4" />}
                          </div>
                          <span className="font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Évolution de la Réservation</CardTitle>
                <CardDescription>Suivez les étapes de cette réservation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { status: "Créée", date: "20 Août 2024", description: "Réservation créée en ligne", icon: <Calendar className="h-5 w-5" /> },
                    { status: "Confirmée", date: "21 Août 2024", description: "Paiement reçu", icon: <CheckCircle className="h-5 w-5" /> },
                    { status: "En attente", date: "À venir", description: "Arrivée prévue", icon: <Clock className="h-5 w-5" /> },
                    { status: "Terminée", date: "À venir", description: "Départ", icon: <LogIn className="h-5 w-5" /> },
                  ].map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`p-2 rounded-full ${index < 2 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{step.status}</h4>
                          <span className="text-sm text-gray-500">{step.date}</span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={client.profileImage} />
                      <AvatarFallback>
                        {client.nomClient.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{client.nomClient}</CardTitle>
                      <CardDescription>Client #{client.cinClient}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="gap-1">
                    <Shield className="h-3 w-3" />
                    {client.loyaltyPoints} points
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Téléphone</p>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{client.telClient}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Email</p>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="font-medium truncate">{client.emailClient}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Adresse</p>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{client.adresseClient}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">CIN</p>
                      <p className="font-medium">{client.cinClient}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Date de naissance</p>
                      <p className="font-medium">{formattedDate(client.dateNaissanceClient)}</p>
                    </div>
                  </div>

                  {/* Client Stats */}
                  <div className="pt-4 border-t">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-[#967E62]">{client.previousStays}</p>
                        <p className="text-xs text-gray-500">Séjours</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-[#967E62]">{client.loyaltyPoints}</p>
                        <p className="text-xs text-gray-500">Points fidélité</p>
                      </div>
                      <div>
                        <div className="flex items-center justify-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Client fidèle</p>
                      </div>
                    </div>
                  </div>

                  {/* Preferences */}
                  {client.preferences && client.preferences.length > 0 && (
                    <div className="pt-4 border-t">
                      <p className="text-sm font-medium mb-2">Préférences du client</p>
                      <div className="flex flex-wrap gap-2">
                        {client.preferences.map((pref, idx) => (
                          <Badge key={idx} variant="outline" className="bg-gray-50">
                            {pref}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" className="flex-1" onClick={() => setIsEditing(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Modifier
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Contacter
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Paiement</CardTitle>
                <CardDescription>Informations de paiement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Méthode</span>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{reservation.paymentMethod}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Montant payé</span>
                    <span className="font-medium text-green-600">{formatCurrency(calculateTotal())}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Statut paiement</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Payé
                    </Badge>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  <Wallet className="mr-2 h-4 w-4" />
                  Voir reçu de paiement
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Reservation & Client Info */}
          <div className="space-y-6">
            {/* Reservation Summary Card */}
            <Card className="border-0 shadow-lg sticky top-6 py-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r py-1 from-[#3F3124] to-[#795E46] text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Résumé</CardTitle>
                    <CardDescription className="text-white/80">
                      Réservation #{reservation.idRes}
                    </CardDescription>
                  </div>
                  {renderStatusBadge(reservation.statut)}
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {/* Dates */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Dates</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formattedDate(reservation.dateDebut)}</p>
                      <p className="text-sm text-gray-500">au {formattedDate(reservation.dateFin)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Durée</span>
                    </div>
                    <span className="font-medium">{reservation.nbNights} nuits</span>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Pricing */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{selectedRoom.pricePerNight} × {reservation.nbNights} nuits</span>
                    <span className="font-medium">{formatCurrency(calculateSubtotal())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes et frais</span>
                    <span className="font-medium">{formatCurrency(calculateTaxes())}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-[#967E62]">{formatCurrency(calculateTotal())}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 mt-6">
                  <Button 
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    onClick={handleCheckIn}
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Procéder au Check-in
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="w-full">
                      <Receipt className="mr-2 h-4 w-4" />
                      Facture
                    </Button>
                    <Button variant="outline" className="w-full">
                      <QrCode className="mr-2 h-4 w-4" />
                      QR Code
                    </Button>
                  </div>
                </div>

                {/* Special Requests */}
                {reservation.specialRequests && (
                  <div className="mt-6 p-3 bg-amber-50 mb-2 border border-amber-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-amber-800">Demandes spéciales</p>
                        <p className="text-sm text-amber-700 mt-1">{reservation.specialRequests}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Client Information Card */}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetails;