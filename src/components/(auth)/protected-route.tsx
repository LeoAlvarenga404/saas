import { useAuth } from "@/contexts/auth-context";
import { LoadingPage } from "@/pages/loading-page";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
