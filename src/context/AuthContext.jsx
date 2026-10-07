// ============================================================
// frontend/src/context/AuthContext.jsx
// SchoolBridge - single source of truth for auth + onboarding.
//
//   user / school   -> from /auth/login, /auth/register, /auth/profile
//   onboarding      -> from GET /onboarding/status  (admins only)
//
// Onboarding state comes from the SERVER on every session restore;
// localStorage is only a cache so the UI can paint quickly.
// ============================================================

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import API, { clearAuthStorage } from "../services/api";
import { getHomeRoute } from "../utils/homeRoute";

const AuthContext = createContext(null);

const readStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch {
    return null;
  }
};

const normalizeEntity = (entity) =>
  entity ? { ...entity, _id: entity._id || entity.id, id: entity.id || entity._id } : null;

// The API answers { success, onboarding: {...} }. Accept older shapes too.
export const unwrapOnboarding = (payload) =>
  payload?.onboarding ?? payload?.data?.onboarding ?? payload?.data ?? null;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => normalizeEntity(readStorage("user")));
  const [school, setSchool] = useState(() => normalizeEntity(readStorage("school")));
  const [onboarding, setOnboarding] = useState(null);
  const [loading, setLoading] = useState(Boolean(localStorage.getItem("token")));

  const persist = useCallback((nextUser, nextSchool) => {
    if (nextUser) localStorage.setItem("user", JSON.stringify(nextUser));
    if (nextSchool) localStorage.setItem("school", JSON.stringify(nextSchool));
  }, []);

  // Fetch onboarding state (admins only) and mirror it into the school cache
  const refreshOnboarding = useCallback(
    async (role = user?.role) => {
      if (role !== "admin") return null;

      const { data } = await API.get("/onboarding/status");
      const state = unwrapOnboarding(data);

      if (state) {
        setOnboarding(state);
        setSchool((prev) => {
          if (!prev) return prev;
          const next = {
            ...prev,
            onboardingCompleted: Boolean(state.completed),
            onboardingPercentage: state.progress,
            currentSetupStep: state.currentStep,
          };
          localStorage.setItem("school", JSON.stringify(next));
          return next;
        });
      }

      return state;
    },
    [user?.role]
  );

  // -------- restore session on first load --------
  useEffect(() => {
    let cancelled = false;

    const restore = async () => {
      if (!localStorage.getItem("token")) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await API.get("/auth/profile");
        if (cancelled) return;

        const freshUser = normalizeEntity(data.user);
        const freshSchool = normalizeEntity(data.school);

        setUser(freshUser);
        setSchool(freshSchool);
        persist(freshUser, freshSchool);

        await refreshOnboarding(freshUser.role);
      } catch (error) {
        // 401 already cleared storage in the interceptor.
        if (error.response?.status === 401 && !cancelled) {
          setUser(null);
          setSchool(null);
          setOnboarding(null);
        }
        // Network errors keep the cached session; requests will retry.
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    restore();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // -------- login / register --------
  // Call with the API response body. Resolves with the route to open.
  const login = useCallback(
    async (data) => {
      const nextUser = normalizeEntity(data.user);
      const nextSchool = normalizeEntity(data.school);

      localStorage.setItem("token", data.token);
      persist(nextUser, nextSchool);

      setUser(nextUser);
      setSchool(nextSchool);
      setOnboarding(null);

      let completed = Boolean(nextSchool?.onboardingCompleted);

      try {
        const state = await refreshOnboarding(nextUser.role);
        if (state) completed = Boolean(state.completed);
      } catch {
        /* fall back to the school flag from the login response */
      }

      return {
        user: nextUser,
        school: nextSchool,
        redirect: getHomeRoute(nextUser.role, completed),
      };
    },
    [persist, refreshOnboarding]
  );

  const logout = useCallback(() => {
    clearAuthStorage();
    setUser(null);
    setSchool(null);
    setOnboarding(null);
  }, []);

  // Update cached school details after the profile is edited
  const updateSchool = useCallback((patch) => {
    setSchool((prev) => {
      const next = normalizeEntity({ ...(prev || {}), ...patch });
      localStorage.setItem("school", JSON.stringify(next));
      return next;
    });
  }, []);

  const isAdmin = user?.role === "admin";

  const onboardingCompleted = isAdmin
    ? onboarding
      ? Boolean(onboarding.completed)
      : Boolean(school?.onboardingCompleted)
    : true;

  const value = useMemo(
    () => ({
      user,
      school,
      onboarding,
      loading,
      isAuthenticated: Boolean(user),
      onboardingCompleted,
      needsOnboarding: isAdmin && !onboardingCompleted,
      login,
      logout,
      updateSchool,
      refreshOnboarding,
    }),
    [user, school, onboarding, loading, onboardingCompleted, isAdmin, login, logout, updateSchool, refreshOnboarding]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return context;
};

export default AuthContext;
