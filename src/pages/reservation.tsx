import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, Plus, Filter, Calendar as CalendarIcon, MoreHorizontal } from "lucide-react";
import { ReservationFormValues } from "@/types/ReservationFormValuesType";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Extend the type to include ID and Status
interface Reservation extends ReservationFormValues {
  id: string;
  status: "Confirmed" | "Pending" | "Cancelled" | "Checked In" | "Checked Out";
  roomNumber?: string;
  totalAmount?: number;
}

// Mock Data
const MOCK_RESERVATIONS: Reservation[] = [
  {
    id: "RES-001",
    nom: "Doe",
    prenom: "John",
    cin: "AB123456",
    statut_social: "Single",
    date_naissance: "1990-01-01",
    tel: "+1234567890",
    email: "john.doe@example.com",
    adresse: "123 Main St, NY",
    genre: "Male",
    date_entree: "2023-10-25",
    date_sortie: "2023-10-30",
    enfantNum: 0,
    adultsNum: 2,
    services: null,
    status: "Confirmed",
    roomNumber: "101",
    totalAmount: 500,
  },
  {
    id: "RES-002",
    nom: "Smith",
    prenom: "Jane",
    cin: "CD789012",
    statut_social: "Married",
    date_naissance: "1985-05-15",
    tel: "+0987654321",
    email: "jane.smith@example.com",
    adresse: "456 Elm St, CA",
    genre: "Female",
    date_entree: "2023-11-01",
    date_sortie: "2023-11-05",
    enfantNum: 2,
    adultsNum: 2,
    services: ["Breakfast"],
    status: "Pending",
    roomNumber: "205",
    totalAmount: 800,
  },
  {
    id: "RES-003",
    nom: "Brown",
    prenom: "Alice",
    cin: "EF345678",
    statut_social: "Single",
    date_naissance: "1992-08-20",
    tel: "+1122334455",
    email: "alice.brown@example.com",
    adresse: "789 Oak St, TX",
    genre: "Female",
    date_entree: "2023-10-20",
    date_sortie: "2023-10-22",
    enfantNum: 0,
    adultsNum: 1,
    services: null,
    status: "Checked Out",
    roomNumber: "104",
    totalAmount: 200,
  },
  {
    id: "RES-004",
    nom: "Wilson",
    prenom: "Bob",
    cin: "GH901234",
    statut_social: "Married",
    date_naissance: "1980-12-10",
    tel: "+5566778899",
    email: "bob.wilson@example.com",
    adresse: "321 Pine St, FL",
    genre: "Male",
    date_entree: "2023-12-01",
    date_sortie: "2023-12-10",
    enfantNum: 1,
    adultsNum: 2,
    services: ["Spa", "Breakfast"],
    status: "Confirmed",
    roomNumber: "301",
    totalAmount: 1500,
  },
  {
    id: "RES-005",
    nom: "Taylor",
    prenom: "Emma",
    cin: "IJ567890",
    statut_social: "Single",
    date_naissance: "1995-03-25",
    tel: "+6677889900",
    email: "emma.taylor@example.com",
    adresse: "654 Maple St, WA",
    genre: "Female",
    date_entree: "2023-11-10",
    date_sortie: "2023-11-12",
    enfantNum: 0,
    adultsNum: 1,
    services: null,
    status: "Cancelled",
    roomNumber: "102",
    totalAmount: 0,
  },
];

// Generate more mock data
for (let i = 6; i <= 25; i++) {
  MOCK_RESERVATIONS.push({
    id: `RES-00${i}`,
    nom: `User${i}`,
    prenom: `Test${i}`,
    cin: `XX${100000 + i}`,
    statut_social: "Single",
    date_naissance: "1990-01-01",
    tel: "+1234567890",
    email: `user${i}@example.com`,
    adresse: "Unknown",
    genre: "Male",
    date_entree: "2023-12-01",
    date_sortie: "2023-12-05",
    enfantNum: 0,
    adultsNum: 1,
    services: null,
    status: i % 3 === 0 ? "Pending" : i % 2 === 0 ? "Confirmed" : "Checked In",
    roomNumber: `${100 + i}`,
    totalAmount: 100 * i,
  });
}

const ReservationPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter Logic
  const filteredReservations = MOCK_RESERVATIONS.filter((res) => {
    const matchesSearch =
      res.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.cin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || res.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredReservations.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "Confirmed":
      case "Checked In":
        return "default";
      case "Pending":
        return "secondary";
      case "Cancelled":
        return "destructive";
      case "Checked Out":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="p-8 space-y-8 bg-muted/10 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reservations</h1>
          <p className="text-muted-foreground mt-1">
            Manage your hotel reservations and bookings.
          </p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90"
          onClick={() => navigate('/reservations/new')}
        >
          <Plus className="mr-2 h-4 w-4" /> New Reservation
        </Button>
      </div>

      <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle>All Bookings</CardTitle>
          <CardDescription>
            View and manage all current and past reservations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-72">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Confirmed">Confirmed</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Checked In">Checked In</SelectItem>
                  <SelectItem value="Checked Out">Checked Out</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-md border bg-background">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Guest</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.length > 0 ? (
                  currentData.map((res) => (
                    <TableRow key={res.id}>
                      <TableCell className="font-medium">{res.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{res.nom} {res.prenom}</span>
                          <span className="text-xs text-muted-foreground">{res.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>{res.roomNumber || "N/A"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                          {res.date_entree}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                          {res.date_sortie}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(res.status)}>
                          {res.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${res.totalAmount}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(res.id)}>
                              Copy ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Edit reservation</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <Button
                    variant="ghost"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="gap-1 pl-2.5"
                  >
                    <span>Previous</span>
                  </Button>
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={page === currentPage}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <Button
                    variant="ghost"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="gap-1 pr-2.5"
                  >
                    <span>Next</span>
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReservationPage;
