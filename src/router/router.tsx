import Layout from "@/layout";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/loginPage";
import ReservationPage from "@/pages/reservation";
import { createBrowserRouter } from "react-router-dom";


export const LOGINPAGE = "/";
export const ACCUEIL = "/accueil";
export const RESERVATIONS = "/reservations"


export const Router = createBrowserRouter([
    {
        path: LOGINPAGE,
        element: <Login />
    },
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
