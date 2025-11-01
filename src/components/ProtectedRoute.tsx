import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // loading state (may customize the loading page)
  if (!user) return <Navigate to="/" replace />; // redirect to login if not logged

  return <Outlet />; 
};

export default ProtectedRoute;