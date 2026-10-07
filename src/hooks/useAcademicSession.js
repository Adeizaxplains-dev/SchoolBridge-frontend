import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getDashboardSummary,
  saveAcademicSession,
} from "../services/onboardingService";

export default function useAcademicSession() {
  const [sessions, setSessions] = useState([]);

  const [loading, setLoading] = useState(false);

  const [actionLoading, setActionLoading] = useState(false);

  const [error, setError] = useState("");

  /*
  =====================================================
  LOAD EXISTING SESSION
  =====================================================
  */

  const fetchSessions = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getDashboardSummary();

      const list =
        response?.statistics?.academicSessions || [];

      setSessions(Array.isArray(list) ? list : []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to load academic sessions."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  /*
  =====================================================
  SAVE SESSION
  =====================================================
  */

  const addSession = async (payload) => {
    try {
      setActionLoading(true);

      await saveAcademicSession(payload);

      await fetchSessions();

      return true;
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to save academic session."
      );

      return false;
    } finally {
      setActionLoading(false);
    }
  };

  return {
    sessions,

    loading,

    actionLoading,

    error,

    fetchSessions,

    addSession,

    refresh: fetchSessions,
  };
}