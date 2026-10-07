// src/pages/admin/school-setup/Subjects.jsx

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  BookOpen,
  Plus,
  RefreshCcw,
  Edit,
  Trash2,
  X,
} from "lucide-react";

import useSchoolSetup from "../../../hooks/useSchoolSetup";

import SetupSkeleton from "../../../components/school-setup/SetupSkeleton";
import SetupEmptyState from "../../../components/school-setup/SetupEmptyState";
import SummaryCard from "../../../components/school-setup/SummaryCard";

export default function Subjects() {
  /*
  =====================================================
  HOOKS
  =====================================================
  */

  const {
    loading,
    saving,
    deleting,
    error,

    getSubjects,
    createSubject,
    updateSubject,
    deleteSubject,

    getDepartments,
  } = useSchoolSetup();

  /*
  =====================================================
  STATE
  =====================================================
  */

  const [subjects, setSubjects] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [selectedSubject, setSelectedSubject] =
    useState(null);

  const [showModal, setShowModal] = useState(false);

  const [validationErrors, setValidationErrors] =
    useState({});

  const [selectedDepartment, setSelectedDepartment] =
    useState("");

  const initialForm = {
    name: "",
    code: "",
    department: "",
    isCompulsory: false,
  };

  const [formData, setFormData] =
    useState(initialForm);

  /*
  =====================================================
  LOAD SUBJECTS
  =====================================================
  */

  const loadSubjects = useCallback(async () => {
    try {
      const data = await getSubjects();

      setSubjects(
        Array.isArray(data)
          ? data
          : data?.subjects || [],
      );
    } catch (err) {
      console.error(
        "Load subjects error:",
        err,
      );
    }
  }, [getSubjects]);

  /*
  =====================================================
  LOAD DEPARTMENTS
  =====================================================
  */

  const loadDepartments = useCallback(async () => {
    try {
      const data = await getDepartments();

      setDepartments(
        Array.isArray(data)
          ? data
          : data?.departments || [],
      );
    } catch (err) {
      console.error(
        "Load departments error:",
        err,
      );
    }
  }, [getDepartments]);

  /*
  =====================================================
  INITIAL LOAD
  =====================================================
  */

  useEffect(() => {
    loadSubjects();
    loadDepartments();
  }, [
    loadSubjects,
    loadDepartments,
  ]);

  /*
  =====================================================
  HANDLE INPUT
  =====================================================
  */

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData((previous) => ({
      ...previous,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    setValidationErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  /*
  =====================================================
  OPEN CREATE
  =====================================================
  */

  const openCreate = () => {
    setSelectedSubject(null);
    setFormData(initialForm);
    setValidationErrors({});
    setShowModal(true);
  };

  /*
  =====================================================
  OPEN EDIT
  =====================================================
  */

  const openEdit = (subject) => {
    setSelectedSubject(subject);

    setFormData({
      name: subject.name || "",

      code: subject.code || "",

      department:
        subject.department?._id ||
        subject.department ||
        "",

      isCompulsory:
        subject.isCompulsory || false,
    });

    setValidationErrors({});
    setShowModal(true);
  };

  /*
  =====================================================
  CLOSE MODAL
  =====================================================
  */

  const closeModal = () => {
    if (saving) {
      return;
    }

    setShowModal(false);
    setSelectedSubject(null);
    setFormData(initialForm);
    setValidationErrors({});
  };

  /*
  =====================================================
  VALIDATION
  =====================================================
  */

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name =
        "Subject name is required.";
    }

    if (!formData.code.trim()) {
      errors.code =
        "Subject code is required.";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  /*
  =====================================================
  SAVE SUBJECT
  =====================================================
  */

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const payload = {
        name: formData.name.trim(),

        code: formData.code.trim(),

        department:
          formData.department || null,

        isCompulsory:
          Boolean(formData.isCompulsory),
      };

      if (selectedSubject) {
        await updateSubject(
          selectedSubject._id,
          payload,
        );
      } else {
        await createSubject(payload);
      }

      setShowModal(false);
      setSelectedSubject(null);
      setFormData(initialForm);
      setValidationErrors({});

      await loadSubjects();
    } catch (err) {
      console.error(
        "Save subject error:",
        err,
      );
    }
  };

  /*
  =====================================================
  DELETE SUBJECT
  =====================================================
  */

  const handleDelete = async (id) => {
    const confirmed =
      window.confirm(
        "Delete this subject?",
      );

    if (!confirmed) {
      return;
    }

    try {
      await deleteSubject(id);
      await loadSubjects();
    } catch (err) {
      console.error(
        "Delete subject error:",
        err,
      );
    }
  };

  /*
  =====================================================
  FILTER SUBJECTS
  =====================================================
  */

  const filteredSubjects =
    selectedDepartment
      ? subjects.filter((subject) => {
          const departmentId =
            subject.department?._id ||
            subject.department;

          return (
            departmentId ===
            selectedDepartment
          );
        })
      : subjects;

  /*
  =====================================================
  LOADING
  =====================================================
  */

  if (loading) {
    return <SetupSkeleton />;
  }

  /*
  =====================================================
  ERROR
  =====================================================
  */

  if (
    error &&
    subjects.length === 0
  ) {
    return (
      <SetupEmptyState
        title="Unable to load subjects"
        description={error}
        actionLabel="Retry"
        onAction={loadSubjects}
        icon={BookOpen}
      />
    );
  }

  /*
  =====================================================
  UI
  =====================================================
  */

  return (
    <>
      <div className="space-y-8">
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            flex
            flex-col
            gap-4
            rounded-2xl
            bg-white
            p-6
            shadow-sm
            dark:bg-gray-900
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div>
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-100
                  text-blue-700
                  dark:bg-blue-900/30
                  dark:text-blue-400
                "
              >
                <BookOpen className="h-6 w-6" />
              </div>

              <div>
                <h1
                  className="
                    text-2xl
                    font-semibold
                    text-gray-900
                    dark:text-white
                  "
                >
                  Subjects
                </h1>

                <p
                  className="
                    mt-1
                    text-sm
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  Manage subjects used for
                  teaching, results and
                  assignments.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={openCreate}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-blue-600
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-blue-700
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:ring-offset-2
            "
          >
            <Plus className="h-4 w-4" />
            Add Subject
          </button>
        </div>

        {/* =================================================
            SUMMARY CARDS
        ================================================= */}

        <div
          className="
            grid
            gap-6
            sm:grid-cols-2
            xl:grid-cols-3
          "
        >
          <SummaryCard
            title="Total Subjects"
            value={subjects.length}
          />

          <SummaryCard
            title="Departments"
            value={departments.length}
          />

          <SummaryCard
            title="Master Data"
            value="Subjects"
          />
        </div>

        {/* =================================================
            FILTER
        ================================================= */}

        <section
          className="
            rounded-2xl
            bg-white
            p-6
            shadow-sm
            dark:bg-gray-900
          "
        >
          <label
            htmlFor="department-filter"
            className="
              mb-2
              block
              text-sm
              font-medium
              text-gray-700
              dark:text-gray-300
            "
          >
            Department Filter
          </label>

          <select
            id="department-filter"
            value={selectedDepartment}
            onChange={(event) =>
              setSelectedDepartment(
                event.target.value,
              )
            }
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              bg-white
              px-4
              py-3
              text-sm
              text-gray-900
              outline-none
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-500/20
              dark:border-gray-700
              dark:bg-gray-800
              dark:text-white
              md:w-96
            "
          >
            <option value="">
              All Departments
            </option>

            {departments.map(
              (department) => (
                <option
                  key={department._id}
                  value={department._id}
                >
                  {department.name}
                </option>
              ),
            )}
          </select>
        </section>

        {/* =================================================
            SUBJECT TABLE
        ================================================= */}

        <section
          className="
            overflow-hidden
            rounded-2xl
            bg-white
            shadow-sm
            dark:bg-gray-900
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              border-b
              px-6
              py-5
              dark:border-gray-800
            "
          >
            <h2
              className="
                font-semibold
                text-gray-900
                dark:text-white
              "
            >
              Subject List
            </h2>

            <button
              type="button"
              onClick={() => {
                loadSubjects();
                loadDepartments();
              }}
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                px-3
                py-2
                text-sm
                font-medium
                text-gray-600
                transition
                hover:bg-gray-100
                hover:text-blue-600
                dark:text-gray-300
                dark:hover:bg-gray-800
                dark:hover:text-blue-400
              "
            >
              <RefreshCcw className="h-4 w-4" />
              Refresh
            </button>
          </div>

          {filteredSubjects.length === 0 ? (
            <div className="p-6">
              <SetupEmptyState
                title={
                  selectedDepartment
                    ? "No subjects in this department"
                    : "No subjects created"
                }
                description={
                  selectedDepartment
                    ? "Try another department or create a new subject."
                    : "Create subjects before assigning them to teachers."
                }
                actionLabel="Create Subject"
                onAction={openCreate}
                icon={BookOpen}
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead
                  className="
                    border-b
                    bg-gray-50
                    dark:border-gray-800
                    dark:bg-gray-800/50
                  "
                >
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Subject
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Code
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Department
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Type
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredSubjects.map(
                    (subject) => (
                      <tr
                        key={subject._id}
                        className="
                          border-b
                          last:border-0
                          dark:border-gray-800
                        "
                      >
                        <td
                          className="
                            px-6
                            py-4
                            font-medium
                            text-gray-900
                            dark:text-white
                          "
                        >
                          {subject.name}
                        </td>

                        <td
                          className="
                            px-6
                            py-4
                            text-sm
                            text-gray-700
                            dark:text-gray-300
                          "
                        >
                          {subject.code || "-"}
                        </td>

                        <td
                          className="
                            px-6
                            py-4
                            text-sm
                            text-gray-700
                            dark:text-gray-300
                          "
                        >
                          {subject.department?.name ||
                            "-"}
                        </td>

                        <td className="px-6 py-4">
                          {subject.isCompulsory ? (
                            <span
                              className="
                                rounded-full
                                bg-green-100
                                px-3
                                py-1
                                text-xs
                                font-medium
                                text-green-700
                                dark:bg-green-900/30
                                dark:text-green-400
                              "
                            >
                              Compulsory
                            </span>
                          ) : (
                            <span
                              className="
                                rounded-full
                                bg-gray-100
                                px-3
                                py-1
                                text-xs
                                font-medium
                                text-gray-600
                                dark:bg-gray-800
                                dark:text-gray-300
                              "
                            >
                              Optional
                            </span>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                openEdit(subject)
                              }
                              className="
                                inline-flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-lg
                                bg-blue-50
                                text-blue-600
                                transition
                                hover:bg-blue-100
                                dark:bg-blue-900/20
                                dark:text-blue-400
                                dark:hover:bg-blue-900/40
                              "
                              title="Edit subject"
                            >
                              <Edit className="h-4 w-4" />
                            </button>

                            <button
                              type="button"
                              disabled={deleting}
                              onClick={() =>
                                handleDelete(
                                  subject._id,
                                )
                              }
                              className="
                                inline-flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-lg
                                bg-red-50
                                text-red-600
                                transition
                                hover:bg-red-100
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                                dark:bg-red-900/20
                                dark:text-red-400
                                dark:hover:bg-red-900/40
                              "
                              title="Delete subject"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {/* =================================================
          CREATE / EDIT MODAL
      ================================================= */}

      {showModal && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
            p-4
          "
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeModal();
            }
          }}
        >
          <div
            className="
              w-full
              max-w-lg
              rounded-2xl
              bg-white
              shadow-2xl
              dark:bg-gray-900
            "
          >
            {/* Modal Header */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                px-6
                py-5
                dark:border-gray-800
              "
            >
              <div>
                <h2
                  className="
                    text-lg
                    font-semibold
                    text-gray-900
                    dark:text-white
                  "
                >
                  {selectedSubject
                    ? "Edit Subject"
                    : "Create Subject"}
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  {selectedSubject
                    ? "Update the subject information."
                    : "Add a new subject to your school."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="
                  inline-flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  text-gray-500
                  transition
                  hover:bg-gray-100
                  hover:text-gray-700
                  disabled:opacity-50
                  dark:text-gray-400
                  dark:hover:bg-gray-800
                  dark:hover:text-white
                "
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}

            <div className="space-y-5 px-6 py-6">
              <div>
                <label
                  htmlFor="subject-name"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-gray-700
                    dark:text-gray-200
                  "
                >
                  Subject Name
                </label>

                <input
                  id="subject-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Mathematics"
                  autoFocus
                  disabled={saving}
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-3
                    text-sm
                    text-gray-900
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-500/20
                    disabled:bg-gray-100
                    dark:border-gray-700
                    dark:bg-gray-800
                    dark:text-white
                    dark:placeholder:text-gray-500
                  "
                />

                {validationErrors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {validationErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="subject-code"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-gray-700
                    dark:text-gray-200
                  "
                >
                  Subject Code
                </label>

                <input
                  id="subject-code"
                  name="code"
                  type="text"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="e.g. MATH"
                  disabled={saving}
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-3
                    text-sm
                    uppercase
                    text-gray-900
                    outline-none
                    transition
                    placeholder:normal-case
                    placeholder:text-gray-400
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-500/20
                    disabled:bg-gray-100
                    dark:border-gray-700
                    dark:bg-gray-800
                    dark:text-white
                    dark:placeholder:text-gray-500
                  "
                />

                {validationErrors.code && (
                  <p className="mt-1 text-sm text-red-600">
                    {validationErrors.code}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="subject-department"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-gray-700
                    dark:text-gray-200
                  "
                >
                  Department
                </label>

                <select
                  id="subject-department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  disabled={saving}
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-3
                    text-sm
                    text-gray-900
                    outline-none
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-500/20
                    disabled:bg-gray-100
                    dark:border-gray-700
                    dark:bg-gray-800
                    dark:text-white
                  "
                >
                  <option value="">
                    No Department
                  </option>

                  {departments.map(
                    (department) => (
                      <option
                        key={department._id}
                        value={department._id}
                      >
                        {department.name}
                      </option>
                    ),
                  )}
                </select>
              </div>

              <label
                className="
                  flex
                  cursor-pointer
                  items-center
                  gap-3
                  rounded-lg
                  border
                  border-gray-200
                  p-4
                  dark:border-gray-700
                "
              >
                <input
                  type="checkbox"
                  name="isCompulsory"
                  checked={
                    formData.isCompulsory
                  }
                  onChange={handleChange}
                  disabled={saving}
                  className="
                    h-4
                    w-4
                    rounded
                    border-gray-300
                    text-blue-600
                    focus:ring-blue-500
                  "
                />

                <span>
                  <span
                    className="
                      block
                      text-sm
                      font-medium
                      text-gray-800
                      dark:text-gray-200
                    "
                  >
                    Compulsory Subject
                  </span>

                  <span
                    className="
                      block
                      text-xs
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    Mark this subject as
                    compulsory for students.
                  </span>
                </span>
              </label>
            </div>

            {/* Modal Footer */}

            <div
              className="
                flex
                items-center
                justify-end
                gap-3
                border-t
                px-6
                py-4
                dark:border-gray-800
              "
            >
              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="
                  rounded-lg
                  border
                  border-gray-300
                  bg-white
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-gray-700
                  transition
                  hover:bg-gray-50
                  disabled:opacity-50
                  dark:border-gray-700
                  dark:bg-gray-800
                  dark:text-gray-200
                  dark:hover:bg-gray-700
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="
                  inline-flex
                  min-w-[130px]
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-blue-600
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-blue-700
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:ring-offset-2
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {saving ? (
                  <>
                    <span
                      className="
                        h-4
                        w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-white/40
                        border-t-white
                      "
                    />

                    Saving...
                  </>
                ) : selectedSubject ? (
                  "Update Subject"
                ) : (
                  "Create Subject"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}