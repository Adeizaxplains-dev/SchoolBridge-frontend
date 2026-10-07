// src/pages/admin/school-setup/Arms.jsx

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  GitBranch,
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

export default function Arms() {
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
    getArms,
    createArm,
    updateArm,
    deleteArm,
  } = useSchoolSetup();

  /*
  =====================================================
  STATE
  =====================================================
  */

  const [arms, setArms] = useState([]);
  const [selectedArm, setSelectedArm] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const initialForm = {
    name: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialForm);

  /*
  =====================================================
  LOAD ARMS
  =====================================================
  */

  const loadArms = useCallback(async () => {
    try {
      const data = await getArms();

      setArms(
        Array.isArray(data)
          ? data
          : data?.arms || [],
      );
    } catch (err) {
      console.error("Load arms error:", err);
    }
  }, [getArms]);

  /*
  =====================================================
  INITIAL LOAD
  =====================================================
  */

  useEffect(() => {
    loadArms();
  }, [loadArms]);

  /*
  =====================================================
  FORM CHANGE
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
    setSelectedArm(null);
    setFormData(initialForm);
    setValidationErrors({});
    setShowModal(true);
  };

  /*
  =====================================================
  OPEN EDIT
  =====================================================
  */

  const openEdit = (arm) => {
    setSelectedArm(arm);

    setFormData({
      name: arm.name || "",
      description: arm.description || "",
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
    setSelectedArm(null);
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
      errors.name = "Arm name is required.";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  /*
  =====================================================
  SAVE ARM
  =====================================================
  */

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      if (selectedArm) {
        await updateArm(
          selectedArm._id,
          {
            name: formData.name.trim(),
            description: formData.description.trim(),
          },
        );
      } else {
        await createArm({
          name: formData.name.trim(),
          description: formData.description.trim(),
        });
      }

      setShowModal(false);
      setSelectedArm(null);
      setFormData(initialForm);
      setValidationErrors({});

      await loadArms();
    } catch (err) {
      console.error("Save arm error:", err);
    }
  };

  /*
  =====================================================
  DELETE ARM
  =====================================================
  */

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Delete this arm?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteArm(id);
      await loadArms();
    } catch (err) {
      console.error("Delete arm error:", err);
    }
  };

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

  if (error && arms.length === 0) {
    return (
      <SetupEmptyState
        title="Unable to load arms"
        description={error}
        actionLabel="Retry"
        onAction={loadArms}
        icon={GitBranch}
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
                <GitBranch className="h-6 w-6" />
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
                  School Arms
                </h1>

                <p
                  className="
                    mt-1
                    text-sm
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  Manage class divisions such as
                  Science, Arts, Commercial and others.
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
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <Plus className="h-4 w-4" />
            Add Arm
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
            title="Total Arms"
            value={arms.length}
          />

          <SummaryCard
            title="Master Data"
            value="Arms"
          />

          <SummaryCard
            title="Connected Module"
            value="Classes"
          />
        </div>

        {/* =================================================
            TABLE
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
              Arms List
            </h2>

            <button
              type="button"
              onClick={loadArms}
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

          {arms.length === 0 ? (
            <div className="p-6">
              <SetupEmptyState
                title="No arms created"
                description="
                  Create arms before assigning
                  them to classes.
                "
                actionLabel="Create Arm"
                onAction={openCreate}
                icon={GitBranch}
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
                      Arm Name
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Description
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {arms.map((arm) => (
                    <tr
                      key={arm._id}
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
                        {arm.name}
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
                        {arm.description || "-"}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => openEdit(arm)}
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
                            title="Edit arm"
                          >
                            <Edit className="h-4 w-4" />
                          </button>

                          <button
                            type="button"
                            disabled={deleting}
                            onClick={() =>
                              handleDelete(arm._id)
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
                            title="Delete arm"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
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
            if (event.target === event.currentTarget) {
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
                  {selectedArm
                    ? "Edit School Arm"
                    : "Create School Arm"}
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  {selectedArm
                    ? "Update the arm information."
                    : "Add a new class division to your school."}
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
                  htmlFor="arm-name"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-gray-700
                    dark:text-gray-200
                  "
                >
                  Arm Name
                </label>

                <input
                  id="arm-name"
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
                    dark:disabled:bg-gray-800
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
                  htmlFor="arm-description"
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
                  id="arm-description"
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
                    dark:disabled:bg-gray-800
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
                  min-w-[120px]
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
                ) : selectedArm ? (
                  "Update Arm"
                ) : (
                  "Create Arm"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}