// ============================================================
// src/layouts/DashboardLayout.jsx
// SchoolBridge Enterprise Dashboard Layout
// ============================================================

import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";

import { useAuth } from "../context/AuthContext";
import { useSchool } from "../hooks/useSchool";

export default function DashboardLayout({ children }) {

  const {
    user,
    school: authSchool,
    loading,
  } = useAuth();

  const schoolHook = useSchool();

  const school = authSchool || schoolHook;

  const isImpersonating =
    localStorage.getItem("impersonating") === "true";

  /*
  =====================================================
  LOADING
  =====================================================
  */

  if (loading) {

    return (

      <div className="flex min-h-screen items-center justify-center bg-slate-100">

        <div className="text-lg font-semibold text-slate-600">

          Loading Dashboard...

        </div>

      </div>

    );

  }

  /*
  =====================================================
  ROLE TITLE
  =====================================================
  */

  const roleTitle = () => {

    if (
      isImpersonating &&
      user?.role === "admin"
    ) {

      return "Administrator (Viewing Parent Portal)";

    }

    switch (user?.role) {

      case "admin":
        return "School Administrator";

      case "principal":
        return "Principal";

      case "teacher":
        return "Teacher";

      case "parent":
        return "Parent";

      case "student":
        return "Student";

      default:
        return "User";

    }

  };

  /*
  =====================================================
  USER INFO
  =====================================================
  */

  const displayName =
    user?.fullName ||
    user?.name ||
    user?.email ||
    "School User";

  const avatarLetter =
    displayName.charAt(0).toUpperCase();

  return (

    <div className="min-h-screen bg-slate-100">

      {/* =====================================================
          FIXED SIDEBAR
      ===================================================== */}

      <Sidebar />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="lg:ml-72 min-h-screen flex flex-col">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header
          className="
          sticky
          top-0
          z-30
          h-16
          bg-white
          border-b
          shadow-sm
          flex
          items-center
          justify-between
          px-6
        "
        >

          <div>

            <h1 className="text-2xl font-bold text-slate-800">

              {school?.name || "SchoolBridge"}

            </h1>

            <p className="text-sm text-slate-500">

              Smart School Management

            </p>

          </div>

          <div className="flex items-center gap-4">

            <div className="text-right">

              <p className="font-semibold text-slate-800">

                {displayName}

              </p>

              <p className="text-xs text-slate-500">

                {roleTitle()}

              </p>

            </div>

            <div
              className="
              h-10
              w-10
              rounded-full
              bg-blue-600
              text-white
              flex
              items-center
              justify-center
              font-bold
              uppercase
            "
            >

              {avatarLetter}

            </div>

          </div>

        </header>

        {/* =====================================================
            PAGE CONTENT
        ===================================================== */}

        <main
          className="
          flex-1
          overflow-y-auto
          p-6
          bg-slate-50
        "
        >

          {children || <Outlet />}

        </main>

      </div>

    </div>

  );

}