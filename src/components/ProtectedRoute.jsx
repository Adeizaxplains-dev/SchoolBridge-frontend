// ============================================================
// frontend/src/components/ProtectedRoute.jsx
//  1. must be signed in
//  2. role must match (optional `roles`)
//  3. school admins must finish onboarding before the console
// ============================================================

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  ONBOARDING_ROUTE,
  getHomeRoute,
  isSetupPath,
  isWizardPath,
  roleMatches,
} from "../utils/homeRoute";

export default function ProtectedRoute({ children, roles = [] }) {
  const { user, loading, needsOnboarding, onboardingCompleted } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg font-semibold text-gray-600">
          Loading SchoolBridge...
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!roleMatches(user.role, roles)) {
    return (
      <Navigate to={getHomeRoute(user.role, onboardingCompleted)} replace />
    );
  }

  if (user.role === "admin") {
    const path = location.pathname;

    // Unfinished school: only the setup pages are reachable
    if (needsOnboarding && !isSetupPath(path)) {
      return <Navigate to={ONBOARDING_ROUTE} replace />;
    }

    // Finished school: the wizard is done (individual setup pages stay editable)
    if (!needsOnboarding && isWizardPath(path)) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
}
