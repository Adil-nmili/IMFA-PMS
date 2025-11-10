import Layout from "@/layout";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/loginPage";
import ReservationPage from "@/pages/reservation";
import RoomsPage from "@/pages/roomsPage";
import { createBrowserRouter } from "react-router-dom";
import DetailsPage from "@/components/ui/rooms/detailsPage";
import PublicRoute from "@/components/PublicRoute";
import ProtectedRoute from "@/components/ProtectedRoute";



export const LOGINPAGE = "/";
export const ACCUEIL = "/accueil";
export const RESERVATIONS = "/reservations"
export const ROOMS = "/rooms"
export const DETAILSPAGE = "/rooms/:id"


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
                    }

                ]
            },




        ]
    },



])
