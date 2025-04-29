import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { userData } = useAuth();
  const location = useLocation();

  if (!userData) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  // Check if the route is for admin and user is NOT an admin
  const isAdminRoute = location.pathname.startsWith("/admin");
  if (isAdminRoute && userData.role !== "admin") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
