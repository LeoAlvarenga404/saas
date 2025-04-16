import { useAuth } from "@/contexts/auth-context";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
}
