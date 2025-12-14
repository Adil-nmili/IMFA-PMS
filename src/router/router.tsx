import GlobalModal from "@/components/shared-component/globalModal";
import ReservationModal from "@/components/partials/modals/reservationModal";
import Layout from "@/layout";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/loginPage";
import ReservationPage from "@/pages/reservation";
import NewReservationPage from "@/pages/newReservation";
import RoomsPage from "@/pages/roomsPage";
import { createBrowserRouter } from "react-router-dom";
import DetailsPage from "@/components/partials/rooms/detailsPage";
import PublicRoute from "@/components/PublicRoute";
import ProtectedRoute from "@/components/ProtectedRoute";
import NotFound from "@/pages/NotFound";
import BillingPage from "@/pages/billingPage";
//import DetailsPage from "@/components/rooms/detailsPage";



export const LOGINPAGE = "/";
export const ACCUEIL = "/accueil";
export const RESERVATIONS = "/reservations"
export const NEW_RESERVATION = "/reservations/new"
export const ROOMS = "/rooms"
export const DETAILSPAGE = "/rooms/:id"

export const BILLING="/billing"

export const Router = createBrowserRouter([
    {
        element: <PublicRoute />, // public route for non-authenticated users
        children: [
            {
                path: LOGINPAGE,
                element: <Login />,
            },
        ],
    },
    {
        element: <ProtectedRoute />, // protected route for authenticated users
        children: [
            {
                element: <Layout />,
                children: [
                    {
                        path: ACCUEIL,
                        element: <Dashboard />
                    },
                    {
                        path: RESERVATIONS,
                        element: <ReservationPage />
                    },
                    {
                        path: NEW_RESERVATION,
                        element: <NewReservationPage />
                    },
                    {
                        path: ROOMS,
                        element:
                            <RoomsPage />
                    },
                    {
                        path: DETAILSPAGE,
                        element: <DetailsPage />
                    },
                    {
                        path: RESERVATIONS,
                        element: <ReservationPage />
                    },
                    {
                        path: '/chambres',
                        element: <>CHAMBRES

                        </>
                    },
                     {
                path: DETAILSPAGE,
                element:<DetailsPage />
            },
            {
                path: BILLING,
                element:<BillingPage />
            }

                ]
            },
           
            
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])
