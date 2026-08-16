import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "./Loader";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  // Show a loading spinner while checking auth status on refresh
  if (loading) {
    return <Loader label="Verifying authentication..." />;
  }

  // If authenticated, render the nested route components (<Outlet />)
  // Otherwise, redirect to the /login page
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}