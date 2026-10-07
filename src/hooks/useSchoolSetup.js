// ============================================================
// frontend/src/hooks/useSchoolSetup.js
// One hook exposing every school-setup operation with shared
// loading / saving / deleting / error state.
// Every function below exists in services/schoolSetupService.js.
// ============================================================

import { useCallback, useMemo, useRef, useState } from "react";
import * as service from "../services/schoolSetupService";

export default function useSchoolSetup() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const inFlight = useRef({});

  const execute = useCallback(async (key, request, type = "loading") => {
    // de-duplicate identical in-flight reads
    if (type === "loading" && inFlight.current[key]) {
      return inFlight.current[key];
    }

    const setBusy =
      type === "saving" ? setSaving : type === "deleting" ? setDeleting : setLoading;

    try {
      setError("");
      setBusy(true);
      const promise = request();
      if (type === "loading") inFlight.current[key] = promise;
      return await promise;
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Something went wrong"
      );
      throw err;
    } finally {
      delete inFlight.current[key];
      setBusy(false);
    }
  }, []);

  const api = useMemo(() => {
    const wrap = (name, type) => (...args) =>
      execute(`${name}:${JSON.stringify(args)}`, () => service[name](...args), type);

    return {
      getAcademicSessions: wrap("getAcademicSessions", "loading"),
      getAcademicSession: wrap("getAcademicSession", "loading"),
      createAcademicSession: wrap("createAcademicSession", "saving"),
      updateAcademicSession: wrap("updateAcademicSession", "saving"),
      deleteAcademicSession: wrap("deleteAcademicSession", "deleting"),
      getTerms: wrap("getTerms", "loading"),
      getTerm: wrap("getTerm", "loading"),
      createTerm: wrap("createTerm", "saving"),
      updateTerm: wrap("updateTerm", "saving"),
      deleteTerm: wrap("deleteTerm", "deleting"),
      getClasses: wrap("getClasses", "loading"),
      getClass: wrap("getClass", "loading"),
      createClass: wrap("createClass", "saving"),
      updateClass: wrap("updateClass", "saving"),
      deleteClass: wrap("deleteClass", "deleting"),
      getArms: wrap("getArms", "loading"),
      getArm: wrap("getArm", "loading"),
      createArm: wrap("createArm", "saving"),
      updateArm: wrap("updateArm", "saving"),
      deleteArm: wrap("deleteArm", "deleting"),
      getSubjects: wrap("getSubjects", "loading"),
      getSubject: wrap("getSubject", "loading"),
      createSubject: wrap("createSubject", "saving"),
      updateSubject: wrap("updateSubject", "saving"),
      deleteSubject: wrap("deleteSubject", "deleting"),
      getDepartments: wrap("getDepartments", "loading"),
      getDepartment: wrap("getDepartment", "loading"),
      createDepartment: wrap("createDepartment", "saving"),
      updateDepartment: wrap("updateDepartment", "saving"),
      deleteDepartment: wrap("deleteDepartment", "deleting"),
      getHouses: wrap("getHouses", "loading"),
      getHouse: wrap("getHouse", "loading"),
      createHouse: wrap("createHouse", "saving"),
      updateHouse: wrap("updateHouse", "saving"),
      deleteHouse: wrap("deleteHouse", "deleting"),
      getCurrentAcademicSession: wrap("getCurrentAcademicSession", "loading"),
      setCurrentTerm: wrap("setCurrentTerm", "saving"),
      setupTerms: wrap("setupTerms", "saving"),
      getSchoolProfile: wrap("getSchoolProfile", "loading"),
      updateSchoolProfile: wrap("updateSchoolProfile", "saving"),
      getSchoolSetupOverview: wrap("getSchoolSetupOverview", "loading"),
    };
  }, [execute]);

  return {
    loading,
    saving,
    deleting,
    error,
    setError,
    ...api,
  };
}
