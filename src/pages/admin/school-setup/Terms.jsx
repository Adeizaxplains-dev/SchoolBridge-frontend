// ============================================================
// src/pages/admin/school-setup/Terms.jsx
// SchoolBridge Enterprise
// Academic Terms Management
// Part 1 — Imports, State, Hooks, Loaders, Validation & CRUD
// ============================================================

import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";

import {
  CalendarRange,
  Plus,
  Edit,
  Trash2,
  Save,
  Loader2,
  Search,
  AlertCircle,
  CheckCircle2,
  X,
} from "lucide-react";

import useSchoolSetup from "../../../hooks/useSchoolSetup";
import * as onboardingService
  from "../../../services/onboardingService";


// ============================================================
// DEFAULT FORM
// ============================================================

const DEFAULT_FORM = {
  session: "",
  name: "",
  code: "",
  startDate: "",
  endDate: "",
  status: "Active",
  description: "",
  position: 1,
  isCurrent: false,
};


// ============================================================
// TABLE HEADERS
// ============================================================

const TABLE_COLUMNS = [
  "Term",
  "Academic Session",
  "Start Date",
  "End Date",
  "Status",
  "Actions",
];


// ============================================================
// COMPONENT
// ============================================================

export default function Terms({
  onSaved,
  onboarding = false,
}) {
  const {
    loading,
    saving,
    deleting,

    getTerms,
    getAcademicSessions,
    createTerm,
    updateTerm,
    deleteTerm,
  } = useSchoolSetup();
  const loadingRef = useRef(false);
  const sessionLoadingRef = useRef(false);

  // ==========================================================
  // PAGE STATE
  // ==========================================================

  const [terms, setTerms] = useState([]);
  const [filteredTerms, setFilteredTerms] = useState([]);
  const [sessions, setSessions] = useState([]);

  const [search, setSearch] = useState("");

  // ==========================================================
  // MODAL STATE
  // ==========================================================

  const [showModal, setShowModal] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);

  // ==========================================================
  // FORM STATE
  // ==========================================================

  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [validationErrors, setValidationErrors] = useState({});

  // ==========================================================
  // FEEDBACK
  // ==========================================================

  const [pageError, setPageError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // ==========================================================
  // SUMMARY
  // ==========================================================

  const summary = useMemo(() => {
    const total = terms.length;

    const current = terms.filter(
      (term) => term.isCurrent
    ).length;

    const active = terms.filter(
      (term) => term.status === "Active"
    ).length;

    return {
      total,
      current,
      active,
    };
  }, [terms]);

  // ==========================================================
  // FILTER TABLE
  // ==========================================================

  useEffect(() => {
    if (!search.trim()) {
      setFilteredTerms(terms);
      return;
    }

    const keyword = search.toLowerCase();

    setFilteredTerms(
      terms.filter((term) =>
        term.name?.toLowerCase().includes(keyword) ||
        term.code?.toLowerCase().includes(keyword) ||
        term.session?.name?.toLowerCase().includes(keyword)
      )
    );
  }, [search, terms]);

  // ==========================================================
  // LOAD TERMS
  // ==========================================================

  const loadTerms = useCallback(async () => {

  if (loadingRef.current) {
    return;
  }


  loadingRef.current = true;


  try {

    setPageError("");

    const response = await getTerms();

const list =
  response?.data?.terms ||
  response?.terms ||
  [];

    setTerms(
      Array.isArray(list)
        ? list
        : []
    );


  } catch (error) {

    console.error(error);


    setPageError(
      error?.response?.data?.message ||
      "Unable to load academic terms."
    );


  } finally {

    loadingRef.current = false;

  }


}, [getTerms]);
  // ==========================================================
  // LOAD SESSIONS
  // ==========================================================

  const loadAcademicSessions = useCallback(async () => {

  if (sessionLoadingRef.current) {
    return;
  }


  sessionLoadingRef.current = true;


  try {

    const response = await getAcademicSessions();

console.log("Academic Sessions Response:", response);

const list =
  response?.academicSessions ||
  response?.sessions ||
  response?.data?.academicSessions ||
  response?.data?.sessions ||
  [];

setSessions(Array.isArray(list) ? list : []);


  } catch (error) {

    console.error(error);


    setPageError(
      error?.response?.data?.message ||
      "Unable to load academic sessions."
    );


  } finally {

    sessionLoadingRef.current = false;

  }


}, [getAcademicSessions]);
  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

 useEffect(() => {

  let mounted = true;


  const initialize = async()=>{

    if(!mounted) return;

    await Promise.all([
      loadTerms(),
      loadAcademicSessions()
    ]);

  };


  initialize();


  return()=>{
    mounted=false;
  };


}, []);

  // ==========================================================
  // RESET FORM
  // ==========================================================

  const resetForm = useCallback(() => {
    setSelectedTerm(null);
    setFormData(DEFAULT_FORM);
    setValidationErrors({});
  }, []);

  // ==========================================================
  // OPEN CREATE MODAL
  // ==========================================================

  const openCreateModal = useCallback(() => {
    resetForm();
    setShowModal(true);
  }, [resetForm]);

  // ==========================================================
  // OPEN EDIT MODAL
  // ==========================================================

  const openEditModal = useCallback((term) => {
    setSelectedTerm(term);

    setValidationErrors({});

    setFormData({
      session: term.session?._id || term.session || "",
      name: term.name || "",
      code: term.code || "",
      position: term.position || 1,
      description: term.description || "",
      status: term.status || "Active",
      startDate: term.startDate
        ? term.startDate.slice(0, 10)
        : "",
      endDate: term.endDate
        ? term.endDate.slice(0, 10)
        : "",
      isCurrent: Boolean(term.isCurrent),
    });

    setShowModal(true);
  }, []);

  // ==========================================================
  // CLOSE MODAL
  // ==========================================================

  const closeModal = useCallback(() => {
    setShowModal(false);
    resetForm();
  }, [resetForm]);

  // ==========================================================
  // HANDLE INPUT CHANGE
  // ==========================================================

  const handleChange = useCallback(
    (event) => {
      const {
        name,
        value,
        checked,
        type,
      } = event.target;

      setFormData((prev) => ({
        ...prev,
       [name]:
name==="code"
? value.toUpperCase()
:type==="checkbox"
? checked
:value
      }));

      if (validationErrors[name]) {
        setValidationErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    },
    [validationErrors]
  );

  // ==========================================================
  // VALIDATION
  // ==========================================================

  const validateForm = useCallback(() => {
    const errors = {};

    if (!formData.session)
      errors.session = "Academic session is required.";

    if (!formData.name.trim())
      errors.name = "Term name is required.";

    if (!formData.code.trim())
      errors.code = "Term code is required.";

    if (!formData.startDate)
      errors.startDate = "Start date is required.";

    if (!formData.endDate)
      errors.endDate = "End date is required.";

    if (
      formData.startDate &&
      formData.endDate &&
      new Date(formData.endDate) <=
        new Date(formData.startDate)
    ) {
      errors.endDate =
        "End date must be after the start date.";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  }, [formData]);

 // ==========================================================
// SAVE TERM
// ==========================================================

const handleSave = async () => {
  // ==========================================================
  // VALIDATE FORM
  // ==========================================================

  if (!validateForm()) {
    return;
  }

  // ==========================================================
  // PREVENT MULTIPLE CURRENT TERMS
  // ==========================================================

  if (formData.isCurrent) {
    const existingCurrent = terms.find(
      (term) =>
        term.isCurrent &&
        term._id !== selectedTerm?._id
    );

    if (existingCurrent) {
      setPageError(
        `"${existingCurrent.name}" is already the current term.`
      );

      return;
    }
  }

  // ==========================================================
  // BUILD API PAYLOAD
  // ==========================================================

  const payload = {
    academicSession: formData.session,
    name: formData.name.trim(),
    code: formData.code.trim().toUpperCase(),
    startDate: formData.startDate,
    endDate: formData.endDate,
    status: formData.status,
    position: Number(formData.position),
    isCurrent: Boolean(formData.isCurrent),
    description: formData.description.trim(),
  };

  try {
    // ========================================================
    // RESET MESSAGES
    // ========================================================

    setPageError("");
    setSuccessMessage("");

    console.log(
      "========================================"
    );

    console.log(
      "SAVING ACADEMIC TERM"
    );

    console.log(
      "Selected Term:",
      selectedTerm
    );

    console.log(
      "Payload:",
      payload
    );

    console.log(
      "========================================"
    );

    // ========================================================
    // UPDATE EXISTING TERM
    // ========================================================

    if (selectedTerm) {
      const response = await updateTerm(
        selectedTerm._id,
        payload
      );

      console.log(
        "UPDATE TERM RESPONSE:",
        response
      );

      // ------------------------------------------------------
      // RELOAD TERMS
      // ------------------------------------------------------

      await loadTerms();

      // ------------------------------------------------------
      // NOTIFY PARENT / ONBOARDING WIZARD
      // ------------------------------------------------------

      if (typeof onSaved === "function") {
        console.log(
          "Calling onSaved() after term update..."
        );

        await onSaved();

        console.log(
          "onSaved() completed."
        );
      }

      // ------------------------------------------------------
      // SUCCESS
      // ------------------------------------------------------

      setSuccessMessage(
        "Academic term updated successfully."
      );

      // ------------------------------------------------------
      // CLOSE MODAL
      // ------------------------------------------------------

      closeModal();

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      return;
    }

    // ========================================================
    // CREATE NEW TERM
    // ========================================================

    const response = await createTerm(
      payload
    );

    console.log(
      "CREATE TERM RESPONSE:",
      response
    );

    // ========================================================
    // RELOAD TERMS
    // ========================================================

    await loadTerms();

    // ========================================================
    // NOTIFY PARENT / ONBOARDING WIZARD
    // ========================================================

    if (typeof onSaved === "function") {
      console.log(
        "Calling onSaved() after term creation..."
      );

      await onSaved();

      console.log(
        "onSaved() completed."
      );
    }

    // ========================================================
    // SUCCESS
    // ========================================================

    setSuccessMessage(
      "Academic term created successfully."
    );

    // ========================================================
    // CLOSE MODAL
    // ========================================================

    closeModal();

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

  } catch (error) {
    // ========================================================
    // ERROR
    // ========================================================

    console.error(
      "Unable to save academic term:",
      error
    );

    setPageError(
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Unable to save academic term."
    );
  }
};
  // ==========================================================
  // ASK DELETE
  // ==========================================================

  const askDelete = useCallback((term) => {
    setDeleteTarget(term);
  }, []);

  // ==========================================================
  // CONFIRM DELETE
  // ==========================================================

  const confirmDelete = useCallback(async () => {
    if (!deleteTarget) return;

    try {
      setPageError("");

      await deleteTerm(deleteTarget._id);

      await loadTerms();

      setDeleteTarget(null);

      setSuccessMessage(
        "Academic term deleted successfully."
      );

      if (typeof onSaved === "function") {
        await onSaved();
      }

      setTimeout(
        () => setSuccessMessage(""),
        3000
      );
    } catch (error) {
      console.error(error);

      setPageError(
        error?.response?.data?.message ||
          "Unable to delete academic term."
      );
    }
  }, [
    deleteTarget,
    deleteTerm,
    loadTerms,
    onSaved,
  ]);

  // ==========================================================
  // PART 2 CONTINUES...
  // ==========================================================

  // ==========================================================
// PART 2A - PAGE UI
// ==========================================================

return (
  <div className="space-y-6">

    {/* =======================================================
        PAGE HEADER
    ======================================================= */}
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-blue-100 p-3">
              <CalendarRange
                size={24}
                className="text-blue-600"
              />
            </div>

            <div>

              <h1 className="text-2xl font-bold text-slate-900">
                Academic Terms
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Create and manage academic terms for your school.
              </p>

            </div>

          </div>

        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Term
        </button>

      </div>

    </div>

    {/* =======================================================
        SUCCESS MESSAGE
    ======================================================= */}

    {successMessage && (
      <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">

        <CheckCircle2
          size={20}
          className="mt-0.5 text-green-600"
        />

        <p className="text-sm text-green-700">
          {successMessage}
        </p>

      </div>
    )}

    {/* =======================================================
        ERROR MESSAGE
    ======================================================= */}

    {pageError && (
      <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">

        <AlertCircle
          size={20}
          className="mt-0.5 text-red-600"
        />

        <p className="text-sm text-red-700">
          {pageError}
        </p>

      </div>
    )}

    {/* =======================================================
        SUMMARY CARDS
    ======================================================= */}

    <div className="grid gap-5 md:grid-cols-3">

      <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">

        <p className="text-sm text-slate-500">
          Total Terms
        </p>

        <h2 className="mt-3 text-3xl font-bold text-slate-900">
          {summary.total}
        </h2>

      </div>

      <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">

        <p className="text-sm text-slate-500">
          Current Terms
        </p>

        <h2 className="mt-3 text-3xl font-bold text-blue-600">
          {summary.current}
        </h2>

      </div>

      <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">

        <p className="text-sm text-slate-500">
          Active Terms
        </p>

        <h2 className="mt-3 text-3xl font-bold text-green-600">
          {summary.active}
        </h2>

      </div>

    </div>

    {/* =======================================================
        SEARCH BAR
    ======================================================= */}

    <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">

      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          value={search}
          placeholder="Search by term name, code or academic session..."
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />

      </div>

    </div>

    {/* =======================================================
        TABLE CONTAINER
        (Part 2B starts here)
    ======================================================= */}

          {/* =======================================================
          TERMS TABLE
      ======================================================= */}
<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

  <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              {TABLE_COLUMNS.map((column) => (

                <th
                  key={column}
                  className={`px-6 py-4 text-sm font-semibold text-slate-700 ${
                    column === "Actions"
                      ? "text-center"
                      : "text-left"
                  }`}
                >
                  {column}
                </th>

              ))}

            </tr>

          </thead>

          <tbody>

            {/* ==========================================
                LOADING
            ========================================== */}

            {loading && (

              <tr>

                <td
                  colSpan={TABLE_COLUMNS.length}
                  className="py-12 text-center"
                >

                  <div className="flex items-center justify-center gap-3">

                    <Loader2
                      size={20}
                      className="animate-spin text-blue-600"
                    />

                    <span className="text-slate-600">
                      Loading academic terms...
                    </span>

                  </div>

                </td>

              </tr>

            )}

            {/* ==========================================
                EMPTY STATE
            ========================================== */}

            {!loading &&
              filteredTerms.length === 0 && (

                <tr>

                  <td
                    colSpan={TABLE_COLUMNS.length}
                    className="py-16 text-center"
                  >

                    <CalendarRange
                      size={44}
                      className="mx-auto mb-4 text-slate-300"
                    />

                    <h3 className="text-lg font-semibold text-slate-700">
                      No Academic Terms Found
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      Create your first academic term to
                      begin.
                    </p>

                    <button
                      type="button"
                      onClick={openCreateModal}
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                    >
                      <Plus size={18} />
                      Create First Term
                    </button>

                  </td>

                </tr>

              )}

            {/* ==========================================
                TABLE ROWS
            ========================================== */}

            {!loading &&
              filteredTerms.map((term) => (

                <tr
                  key={term._id}
                  className="border-t transition hover:bg-slate-50"
                >

                  {/* TERM */}

                  <td className="px-6 py-5">

                    <div>

                      <p className="font-semibold text-slate-900">
                        {term.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {term.code}
                      </p>

                    </div>

                  </td>

                  {/* SESSION */}

                  <td className="px-6 py-5 text-slate-700">

                    {term.session?.name || "-"}

                  </td>

                  {/* START */}

                  <td className="px-6 py-5 text-slate-700">

                    {term.startDate
                      ? new Date(
                          term.startDate
                        ).toLocaleDateString()
                      : "-"}

                  </td>

                  {/* END */}

                  <td className="px-6 py-5 text-slate-700">

                    {term.endDate
                      ? new Date(
                          term.endDate
                        ).toLocaleDateString()
                      : "-"}

                  </td>

                  {/* STATUS */}

                  <td className="px-6 py-5">

                    <span
className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
term.isCurrent
? "bg-blue-100 text-blue-700"
: term.status==="Active"
? "bg-green-100 text-green-700"
: "bg-slate-100 text-slate-600"
}`}
>

{
term.isCurrent
? "Current"
: term.status || "Inactive"
}

</span>

                  </td>

                  {/* ACTIONS */}

                  <td className="px-6 py-5">

                    <div className="flex justify-center gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          openEditModal(term)
                        }
                        className="rounded-lg bg-amber-500 p-2 text-white transition hover:bg-amber-600"
                        title="Edit"
                      >
                        <Edit size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setDeleteTarget(term)
                        }
                        disabled={deleting}
                        className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700 disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

          </tbody>

        </table>

      </div>

    </div>

    {/* =======================================================
        PART 3 STARTS HERE
        Add / Edit Modal
    ======================================================= */}

    
{showModal && (

  <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40">

  <div className="flex min-h-full items-center justify-center p-4">

    <div
      className="
        w-full
        max-w-2xl
        max-h-[90vh]
        overflow-y-auto
        rounded-2xl
        bg-white
        shadow-2xl
      "
    >
      {/* =================================================
          MODAL HEADER
      ================================================= */}

      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

        <div>

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-blue-100 p-3">

              <CalendarRange
                size={22}
                className="text-blue-600"
              />

            </div>


            <div>

              <h2 className="text-xl font-bold text-slate-900">

                {selectedTerm
                  ? "Edit Academic Term"
                  : "Add Academic Term"}

              </h2>


              <p className="mt-1 text-sm text-slate-500">

                Configure academic term information.

              </p>

            </div>

          </div>

        </div>


        <button
          type="button"
          onClick={closeModal}
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
        >

          <X size={20} />

        </button>


      </div>


      {/* =================================================
          FORM BODY
      ================================================= */}

      <form
        onSubmit={(event) => {

          event.preventDefault();

          handleSave();

        }}
        className="space-y-6 p-6"
      >


        {/* ================================================
            ACADEMIC SESSION
        ================================================ */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-700">

            Academic Session

          </label>


          <select

            name="session"

            value={formData.session}

            onChange={handleChange}

            className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
              validationErrors.session
                ? "border-red-500"
                : "border-slate-300 focus:border-blue-500"
            }`}

          >

            <option value="">

              Select Academic Session

            </option>


            {sessions.map((session) => (

              <option
                key={session._id}
                value={session._id}
              >

                {session.name}

              </option>

            ))}


          </select>


          {validationErrors.session && (

            <p className="mt-1 text-sm text-red-600">

              {validationErrors.session}

            </p>

          )}


        </div>




        {/* ================================================
    TERM NAME + CODE + POSITION
================================================ */}

<div className="grid gap-5 md:grid-cols-3">

  {/* ============================================
      TERM NAME
  ============================================ */}

  <div>

    <label className="mb-2 block text-sm font-medium text-slate-700">
      Term Name
    </label>

    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      placeholder="First Term"
      className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
        validationErrors.name
          ? "border-red-500"
          : "border-slate-300 focus:border-blue-500"
      }`}
    />

    {validationErrors.name && (
      <p className="mt-1 text-sm text-red-600">
        {validationErrors.name}
      </p>
    )}

  </div>

  {/* ============================================
      TERM CODE
  ============================================ */}

  <div>

    <label className="mb-2 block text-sm font-medium text-slate-700">
      Term Code
    </label>

    <input
      type="text"
      name="code"
      value={formData.code}
      onChange={handleChange}
      placeholder="T1"
      className={`w-full rounded-xl border px-4 py-3 uppercase outline-none transition ${
        validationErrors.code
          ? "border-red-500"
          : "border-slate-300 focus:border-blue-500"
      }`}
    />

    {validationErrors.code && (
      <p className="mt-1 text-sm text-red-600">
        {validationErrors.code}
      </p>
    )}

  </div>

  {/* ============================================
      POSITION
  ============================================ */}

  <div>

    <label className="mb-2 block text-sm font-medium text-slate-700">
      Position
    </label>

    <select
      name="position"
      value={formData.position}
      onChange={handleChange}
      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
    >
      <option value={1}>First Term</option>
      <option value={2}>Second Term</option>
      <option value={3}>Third Term</option>
    </select>

  </div>

</div>


        

     {/* =====================================================
PART 3A-2
DATES, CURRENT TERM, FOOTER
===================================================== */}


        

        <div className="grid gap-5 md:grid-cols-2">


          <div>


            <label className="mb-2 block text-sm font-medium text-slate-700">

              Start Date

            </label>


            <input

              type="date"

              name="startDate"

              value={formData.startDate}

              onChange={handleChange}

              className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
                validationErrors.startDate
                  ? "border-red-500"
                  : "border-slate-300 focus:border-blue-500"
              }`}

            />


            {validationErrors.startDate && (

              <p className="mt-1 text-sm text-red-600">

                {validationErrors.startDate}

              </p>

            )}


          </div>



          <div>


            <label className="mb-2 block text-sm font-medium text-slate-700">

              End Date

            </label>


            <input

              type="date"

              name="endDate"

              value={formData.endDate}

              onChange={handleChange}

              className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
                validationErrors.endDate
                  ? "border-red-500"
                  : "border-slate-300 focus:border-blue-500"
              }`}

            />


            {validationErrors.endDate && (

              <p className="mt-1 text-sm text-red-600">

                {validationErrors.endDate}

              </p>

            )}


          </div>


        </div>

                

        {/* ================================================
            CURRENT TERM OPTION
        ================================================ */}

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">


          <label className="flex cursor-pointer items-center gap-3">


            <input

              type="checkbox"

              name="isCurrent"

              checked={formData.isCurrent}

              onChange={handleChange}

              className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"

            />


            <div>


              <p className="font-medium text-slate-800">

                Set as Current Academic Term

              </p>


              <p className="text-sm text-slate-500">

                This term will be used as the active term
                for school operations.

              </p>


            </div>


          </label>


        </div>



          {/* ================================================
    DESCRIPTION
================================================ */}

<div>

  <label className="mb-2 block text-sm font-medium text-slate-700">
    Description
  </label>

  <textarea
    name="description"
    value={formData.description}
    onChange={handleChange}
    rows={4}
    placeholder="Optional description"
    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
  />

</div>
        

        {/* ================================================
            FORM ACTIONS
        ================================================ */}

        <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">


          <button

            type="button"

            onClick={closeModal}

            className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50"

          >

            Cancel

          </button>



          <button

            type="submit"

            disabled={saving}

            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"

          >

            {saving ? (

              <>

                <Loader2

                  size={18}

                  className="animate-spin"

                />

                Saving...

              </>

            ) : (

              <>

                <Save size={18} />

                {selectedTerm
                  ? "Update Term"
                  : "Create Term"}

              </>

            )}

          </button>


        </div>


      </form>


    </div>


  </div>
</div>

)}






{deleteTarget && (

  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">


    <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">


      {/* ================================================
          DELETE HEADER
      ================================================ */}

      <div className="border-b border-slate-200 px-6 py-5">


        <div className="flex items-center gap-3">


          <div className="rounded-xl bg-red-100 p-3">

            <Trash2
              size={22}
              className="text-red-600"
            />

          </div>


          <div>

            <h2 className="text-xl font-bold text-slate-900">

              Delete Academic Term

            </h2>


            <p className="mt-1 text-sm text-slate-500">

              This action cannot be reversed.

            </p>


          </div>


        </div>


      </div>




      {/* ================================================
          DELETE BODY
      ================================================ */}

      <div className="space-y-4 px-6 py-6">


        <div className="rounded-xl border border-red-200 bg-red-50 p-4">


          <p className="text-sm text-slate-700">

            You are about to permanently delete:

          </p>


          <p className="mt-2 font-bold text-red-700">

            {deleteTarget.name}

          </p>


          {deleteTarget.session?.name && (

            <p className="mt-1 text-sm text-slate-600">

              Session:
              {" "}
              {deleteTarget.session.name}

            </p>

          )}


        </div>


        <p className="text-sm text-slate-500">

          Existing records linked to this term may be affected.
          Please confirm before continuing.

        </p>


      </div>


          


      {/* ================================================
          DELETE FOOTER
      ================================================ */}

      <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-5">


        <button

          type="button"

          onClick={() => setDeleteTarget(null)}

          className="rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-50"

        >

          Cancel

        </button>




        <button

          type="button"
            onClick={confirmDelete}
          
          disabled={deleting}

          className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"

        >


          {deleting ? (

            <>

              <Loader2

                size={17}

                className="animate-spin"

              />

              Deleting...

            </>


          ) : (

            <>

              <Trash2 size={17} />

              Delete Term

            </>


          )}


        </button>


      </div>


    </div>


  </div>


  )}
</div>
);
}