import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute() {
  const { currentUser, loading } = useAuth();
  console.log({ currentUser });

  if (loading) {
    return <div>Loading...</div>;
  }

  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
}
