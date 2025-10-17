import Layout from "@/layout";
import Dashboard from "@/pages/Dashboard";
import ReservationPage from "@/pages/reservation";
import { createBrowserRouter } from "react-router-dom";


export const ACCUEIL = "/accueil";
export const RESERVATIONS = "/reservations"


export const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: ACCUEIL,
                element: <Dashboard />
            },
            {
                path: RESERVATIONS,
                element:<ReservationPage />
            }
        ]
    },
    {

    }

])