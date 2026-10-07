// src/pages/admin/school-setup/Departments.jsx

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Building2,
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

export default function Departments() {
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

    getDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
  } = useSchoolSetup();

  /*
  =====================================================
  STATE
  =====================================================
  */

  const [departments, setDepartments] = useState([]);

  const [selectedDepartment, setSelectedDepartment] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const [validationErrors, setValidationErrors] =
    useState({});

  const initialForm = {
    name: "",
    code: "",
    description: "",
  };

  const [formData, setFormData] =
    useState(initialForm);

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
    loadDepartments();
  }, [loadDepartments]);

  /*
  =====================================================
  HANDLE INPUT
  =====================================================
  */

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
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
    setSelectedDepartment(null);
    setFormData(initialForm);
    setValidationErrors({});
    setShowModal(true);
  };

  /*
  =====================================================
  OPEN EDIT
  =====================================================
  */

  const openEdit = (department) => {
    setSelectedDepartment(department);

    setFormData({
      name: department.name || "",
      code: department.code || "",
      description: department.description || "",
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
    setSelectedDepartment(null);
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
        "Department name is required.";
    }

    if (!formData.code.trim()) {
      errors.code =
        "Department code is required.";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  /*
  =====================================================
  SAVE DEPARTMENT
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
        description:
          formData.description.trim(),
      };

      if (selectedDepartment) {
        await updateDepartment(
          selectedDepartment._id,
          payload,
        );
      } else {
        await createDepartment(payload);
      }

      setShowModal(false);
      setSelectedDepartment(null);
      setFormData(initialForm);
      setValidationErrors({});

      await loadDepartments();
    } catch (err) {
      console.error(
        "Save department error:",
        err,
      );
    }
  };

  /*
  =====================================================
  DELETE DEPARTMENT
  =====================================================
  */

  const handleDelete = async (id) => {
    const confirmed =
      window.confirm(
        "Delete this department?",
      );

    if (!confirmed) {
      return;
    }

    try {
      await deleteDepartment(id);
      await loadDepartments();
    } catch (err) {
      console.error(
        "Delete department error:",
        err,
      );
    }
  };

  /*
  =====================================================
  LOADING STATE
  =====================================================
  */

  if (loading) {
    return <SetupSkeleton />;
  }

  /*
  =====================================================
  ERROR STATE
  =====================================================
  */

  if (
    error &&
    departments.length === 0
  ) {
    return (
      <SetupEmptyState
        title="Unable to load departments"
        description={error}
        actionLabel="Retry"
        onAction={loadDepartments}
        icon={Building2}
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
                <Building2 className="h-6 w-6" />
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
                  Departments
                </h1>

                <p
                  className="
                    mt-1
                    text-sm
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  Organize academic departments
                  and school structure.
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
            Add Department
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
            title="Total Departments"
            value={departments.length}
          />

          <SummaryCard
            title="Master Data"
            value="Departments"
          />

          <SummaryCard
            title="Used By"
            value="Subjects & Teachers"
          />
        </div>

        {/* =================================================
            DEPARTMENTS TABLE
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
              Department List
            </h2>

            <button
              type="button"
              onClick={loadDepartments}
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

          {departments.length === 0 ? (
            <div className="p-6">
              <SetupEmptyState
                title="No departments created"
                description="
                  Create departments to organize
                  subjects and teachers.
                "
                actionLabel="Create Department"
                onAction={openCreate}
                icon={Building2}
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
                    <th
                      className="
                        px-6
                        py-4
                        text-sm
                        font-semibold
                        text-gray-700
                        dark:text-gray-200
                      "
                    >
                      Department
                    </th>

                    <th
                      className="
                        px-6
                        py-4
                        text-sm
                        font-semibold
                        text-gray-700
                        dark:text-gray-200
                      "
                    >
                      Code
                    </th>

                    <th
                      className="
                        px-6
                        py-4
                        text-sm
                        font-semibold
                        text-gray-700
                        dark:text-gray-200
                      "
                    >
                      Description
                    </th>

                    <th
                      className="
                        px-6
                        py-4
                        text-sm
                        font-semibold
                        text-gray-700
                        dark:text-gray-200
                      "
                    >
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {departments.map(
                    (department) => (
                      <tr
                        key={department._id}
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
                          {department.name}
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
                          {department.code || "-"}
                        </td>

                        <td
                          className="
                            px-6
                            py-4
                            text-sm
                            text-gray-600
                            dark:text-gray-400
                          "
                        >
                          {department.description ||
                            "-"}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                openEdit(
                                  department,
                                )
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
                              title="Edit department"
                            >
                              <Edit className="h-4 w-4" />
                            </button>

                            <button
                              type="button"
                              disabled={deleting}
                              onClick={() =>
                                handleDelete(
                                  department._id,
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
                              title="Delete department"
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
                  {selectedDepartment
                    ? "Edit Department"
                    : "Create Department"}
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  {selectedDepartment
                    ? "Update the department information."
                    : "Add a new academic department."}
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
                  htmlFor="department-name"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-gray-700
                    dark:text-gray-200
                  "
                >
                  Department Name
                </label>

                <input
                  id="department-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Science"
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
                  htmlFor="department-code"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-gray-700
                    dark:text-gray-200
                  "
                >
                  Department Code
                </label>

                <input
                  id="department-code"
                  name="code"
                  type="text"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="e.g. SCI"
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
                  htmlFor="department-description"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-gray-700
                    dark:text-gray-200
                  "
                >
                  Description
                </label>

                <textarea
                  id="department-description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Optional description"
                  rows={4}
                  disabled={saving}
                  className="
                    w-full
                    resize-none
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
              </div>
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
                  min-w-[150px]
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
                ) : selectedDepartment ? (
                  "Update Department"
                ) : (
                  "Create Department"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}