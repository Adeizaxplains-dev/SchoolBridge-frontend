// ============================================================
// frontend/src/services/onboardingService.js
// Endpoints under /api/onboarding. Each resolves to the response body.
// Status shape: { success, onboarding: { status, progress, currentStep,
//   completedSteps, skippedSteps, canComplete, completed, steps[] } }
// ============================================================

import API from "./api";

const unwrap = (response) => response.data;

export const getStatus = async () => unwrap(await API.get("/onboarding/status"));

export const getDashboardSummary = async () =>
  unwrap(await API.get("/onboarding/summary"));

export const refreshProgress = async () =>
  unwrap(await API.post("/onboarding/refresh-progress"));

// ---- batch "setup" endpoints (wizard-style bulk saves) ----
export const saveSchoolProfile = async (payload) =>
  unwrap(await API.post("/onboarding/school-profile", payload));

export const saveAcademicSession = async (payload) =>
  unwrap(await API.post("/onboarding/academic-session", payload));

export const saveTerms = async (payload) =>
  unwrap(await API.post("/school-setup/terms/setup", payload));

export const saveClasses = async (payload) =>
  unwrap(await API.post("/onboarding/classes", payload));

export const saveClassArms = async (payload) =>
  unwrap(await API.post("/onboarding/arms", payload));

export const saveSubjects = async (payload) =>
  unwrap(await API.post("/onboarding/subjects", payload));

export const saveDepartments = async (payload) =>
  unwrap(await API.post("/onboarding/departments", payload));

export const saveHouses = async (payload) =>
  unwrap(await API.post("/onboarding/houses", payload));

export const saveFeeStructure = async (payload) =>
  unwrap(await API.post("/onboarding/fee-structure", payload));

export const saveGradingSystem = async (payload) =>
  unwrap(await API.post("/onboarding/grading-system", payload));

// ---- optional steps ----
export const skipStep = async (step) =>
  unwrap(await API.post(`/onboarding/skip/${step}`));

export const unskipStep = async (step) =>
  unwrap(await API.delete(`/onboarding/skip/${step}`));

// ---- finish / reset ----
export const completeOnboarding = async () =>
  unwrap(await API.post("/onboarding/complete"));

export const resetOnboarding = async () =>
  unwrap(await API.delete("/onboarding/reset"));

export default {
  getStatus,
  getDashboardSummary,
  refreshProgress,
  saveSchoolProfile,
  saveAcademicSession,
  saveTerms,
  saveClasses,
  saveClassArms,
  saveSubjects,
  saveDepartments,
  saveHouses,
  saveFeeStructure,
  saveGradingSystem,
  skipStep,
  unskipStep,
  completeOnboarding,
  resetOnboarding,
};
