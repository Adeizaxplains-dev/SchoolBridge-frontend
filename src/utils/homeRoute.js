// ============================================================
// frontend/src/utils/homeRoute.js
// Where each role lands, and which roles count as "admin".
// Keep in sync with backend/utils/homeRoute.js.
// ============================================================

export const ONBOARDING_ROUTE = "/admin/school-setup/onboard";

export const ADMIN_ROLES = [
  "superadmin",
  "admin",
  "principal",
  "accountant",
  "staff",
];

export const isAdminRole = (role) => ADMIN_ROLES.includes(role);

// Does `role` satisfy a route's `roles` list? ("admin" covers the admin group)
export const roleMatches = (role, roles = []) => {
  if (!roles.length) return true;
  return roles.some((r) => (r === "admin" ? isAdminRole(role) : r === role));
};

export const getHomeRoute = (role, onboardingCompleted) => {
  if (role === "teacher") return "/teacher/dashboard";
  if (role === "parent") return "/parent";

  if (isAdminRole(role)) {
    // Only the school admin runs the setup wizard
    if (role === "admin" && !onboardingCompleted) return ONBOARDING_ROUTE;
    return "/dashboard";
  }

  return "/login";
};

// The wizard itself (the individual setup pages stay editable afterwards)
export const isWizardPath = (pathname) =>
  pathname === "/admin/school-setup" ||
  pathname === "/admin/school-setup/" ||
  pathname === ONBOARDING_ROUTE ||
  pathname === `${ONBOARDING_ROUTE}/`;

export const isSetupPath = (pathname) =>
  pathname.startsWith("/admin/school-setup");
