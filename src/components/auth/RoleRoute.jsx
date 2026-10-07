// ============================================================
// frontend/src/components/auth/RoleRoute.jsx
// Role gate for nested routes. Reads the live AuthContext (the old
// version read localStorage once and never updated).
// ============================================================

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getHomeRoute, roleMatches } from "../../utils/homeRoute";

const RoleRoute = ({ roles = [], children }) => {
  const { user, loading, onboardingCompleted } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!roleMatches(user.role, roles)) {
    return <Navigate to={getHomeRoute(user.role, onboardingCompleted)} replace />;
  }

  return children ? children : <Outlet />;
};

export default RoleRoute;
