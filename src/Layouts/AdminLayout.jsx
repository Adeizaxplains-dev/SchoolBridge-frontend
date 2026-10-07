import { Navigate, Outlet } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout() {
  const {
    user,
    loading,
    isAuthenticated,
  } = useAuth();

  /*
  ==========================================
  LOADING
  ==========================================
  */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="text-lg font-semibold text-slate-600">
          Loading...
        </div>
      </div>
    );
  }

  /*
  ==========================================
  NOT LOGGED IN
  ==========================================
  */

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  /*
  ==========================================
  ROLE PROTECTION
  ==========================================
  */

  switch (user?.role) {
    case "admin":
      break;

    case "teacher":
      return (
        <Navigate
          to="/teacher/dashboard"
          replace
        />
      );

    case "parent":
      return (
        <Navigate
          to="/parent/dashboard"
          replace
        />
      );

    case "student":
      return (
        <Navigate
          to="/student/dashboard"
          replace
        />
      );

    default:
      return (
        <Navigate
          to="/login"
          replace
        />
      );
  }

  /*
  ==========================================
  ADMIN DASHBOARD
  ==========================================
  */

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}