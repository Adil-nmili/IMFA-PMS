import Layout from "@/layout";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/loginPage";
import ReservationPage from "@/pages/reservation";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import PublicRoute from "@/components/PublicRoute";

export const LOGINPAGE = "/";
export const ACCUEIL = "/accueil";
export const RESERVATIONS = "/reservations";

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
            element: <Dashboard />,
          },
          {
            path: RESERVATIONS,
            element: <ReservationPage />,
          },
        ],
      },
    ],
  },
]);
