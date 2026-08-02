import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function PublicRoute() {
  const { user } = useAuth();

  if (!user) {
    return <Outlet />;
  }

  switch (user.role) {
    case "ADMIN":
      return <Navigate to="/admin/dashboard" replace />;

    case "OWNER":
      return <Navigate to="/owner/dashboard" replace />;

    case "USER":
      return <Navigate to="/user/dashboard" replace />;

    default:
      return <Outlet />;
  }
}

export default PublicRoute;