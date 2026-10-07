import {
  useState,
  useEffect,
  useCallback,
} from "react";

import {
  getSchoolProfile,
  updateSchoolProfile,
} from "../services/schoolService";
/*
=====================================================
SCHOOL PROFILE HOOK
=====================================================

Responsible ONLY for:

• Loading school profile
• Updating school profile
• Refreshing profile

=====================================================
*/

export default function useSchoolProfile() {
  /*
  =====================================================
  STATE
  =====================================================
  */

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  /*
  =====================================================
  LOAD PROFILE
  =====================================================
  */

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getSchoolProfile();

      const data = response?.data || response;

      setProfile(data);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to load school profile."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  /*
  =====================================================
  LOAD ON MOUNT
  =====================================================
  */

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  /*
  =====================================================
  UPDATE PROFILE
  =====================================================
  */

  const saveProfile = async (payload) => {
    try {
      setSaving(true);
      setError("");

      const response =
        await updateSchoolProfile(payload);

      const data = response?.data || response;

      setProfile(data);

      return data;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Unable to update school profile.";

      setError(message);

      throw err;
    } finally {
      setSaving(false);
    }
  };

  /*
  =====================================================
  CLEAR ERROR
  =====================================================
  */

  const clearError = () => {
    setError("");
  };

  /*
  =====================================================
  EXPORT
  =====================================================
  */

  return {
    profile,

    loading,

    saving,

    error,

    fetchProfile,

    saveProfile,

    refresh: fetchProfile,

    clearError,
  };
}