// ============================================================
// frontend/src/hooks/useOnboarding.js
// Thin layer over AuthContext so the Sidebar, wizard and route
// guards all read the SAME onboarding state (no duplicate fetches).
// ============================================================

import { useCallback, useState } from "react";
import { useAuth } from "../context/AuthContext";
import * as onboardingService from "../services/onboardingService";

export default function useOnboarding() {
  const { onboarding, refreshOnboarding, needsOnboarding } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const run = useCallback(async (request) => {
    try {
      setError("");
      setLoading(true);
      return await request();
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Always re-reads the server; resolves { success, onboarding }
  const getStatus = useCallback(async () => {
    const state = await refreshOnboarding();
    return { success: true, onboarding: state };
  }, [refreshOnboarding]);

  const skipStep = useCallback(
    (step) => run(async () => {
      const result = await onboardingService.skipStep(step);
      await refreshOnboarding();
      return result;
    }),
    [run, refreshOnboarding]
  );

  const unskipStep = useCallback(
    (step) => run(async () => {
      const result = await onboardingService.unskipStep(step);
      await refreshOnboarding();
      return result;
    }),
    [run, refreshOnboarding]
  );

  // Finishing updates the shared state, which releases the route guard.
  const completeOnboarding = useCallback(
    () => run(async () => {
      const result = await onboardingService.completeOnboarding();
      await refreshOnboarding();
      return result;
    }),
    [run, refreshOnboarding]
  );

  const getDashboardSummary = useCallback(
    () => run(() => onboardingService.getDashboardSummary()),
    [run]
  );

  return {
    loading,
    error,
    setError,
    status: onboarding,
    onboarding,
    needsOnboarding,
    currentStep: onboarding?.currentStep,
    completedSteps: onboarding?.completedSteps || [],
    skippedSteps: onboarding?.skippedSteps || [],
    progress: onboarding?.progress ?? 0,
    canComplete: Boolean(onboarding?.canComplete),
    getStatus,
    refreshProgress: getStatus,
    getDashboardSummary,
    refreshDashboard: getDashboardSummary,
    skipStep,
    unskipStep,
    completeOnboarding,
  };
}
