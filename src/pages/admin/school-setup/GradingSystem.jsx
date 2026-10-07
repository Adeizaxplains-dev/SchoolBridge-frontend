import {
  useCallback,
  useMemo,
  useState,
} from "react";

import {
  Award,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  GraduationCap,
  RefreshCw,
  Search,
  Settings2,
  SlidersHorizontal,
  Trash2,
  TrendingUp,
  X,
} from "lucide-react";

import useGradingSystems from "../../../hooks/useGradingSystem";

import SetupSkeleton from "../../../components/school-setup/SetupSkeleton";
import SetupEmptyState from "../../../components/school-setup/SetupEmptyState";
import GradingSystemModal from "../../../components/school-setup/GradingSystemModal";
import DeleteConfirmDialog from "../../../components/school-setup/DeleteConfirmDialog";

const INITIAL_FORM = {
  name: "",
  passMark: 40,
  grades: [
    {
      grade: "A",
      minScore: 70,
      maxScore: 100,
      remark: "Excellent",
    },
    {
      grade: "B",
      minScore: 60,
      maxScore: 69,
      remark: "Very Good",
    },
    {
      grade: "C",
      minScore: 50,
      maxScore: 59,
      remark: "Good",
    },
    {
      grade: "D",
      minScore: 45,
      maxScore: 49,
      remark: "Fair",
    },
    {
      grade: "E",
      minScore: 40,
      maxScore: 44,
      remark: "Pass",
    },
    {
      grade: "F",
      minScore: 0,
      maxScore: 39,
      remark: "Fail",
    },
  ],
};

const cloneForm = (form) => ({
  ...form,
  grades: (form.grades || []).map((grade) => ({
    ...grade,
  })),
});

const getGradeCount = (systems) =>
  systems.reduce(
    (total, system) =>
      total +
      (Array.isArray(system?.grades)
        ? system.grades.length
        : 0),
    0,
  );

const getAveragePassMark = (systems) => {
  if (!systems.length) return 0;

  const total = systems.reduce(
    (sum, system) =>
      sum + Number(system?.passMark || 0),
    0,
  );

  return Math.round(total / systems.length);
};

export default function GradingSystem() {
  const {
    loading,
    saving,
    deleting,
    error,
    gradingSystems,
    addGradingSystem,
    editGradingSystem,
    removeGradingSystem,
    activateGradingSystem,
    refresh,
  } = useGradingSystems();

  const systems = useMemo(() => {
    if (Array.isArray(gradingSystems)) {
      return gradingSystems;
    }

    if (Array.isArray(gradingSystems?.gradingSystems)) {
      return gradingSystems.gradingSystems;
    }

    if (Array.isArray(gradingSystems?.data)) {
      return gradingSystems.data;
    }

    return [];
  }, [gradingSystems]);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [showDeleteDialog, setShowDeleteDialog] =
    useState(false);

  const [selectedSystem, setSelectedSystem] =
    useState(null);

  const [formData, setFormData] =
    useState(cloneForm(INITIAL_FORM));

  const [validationErrors, setValidationErrors] =
    useState({});

  const filteredSystems = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return systems;
    }

    return systems.filter((system) =>
      String(system?.name || "")
        .toLowerCase()
        .includes(query),
    );
  }, [systems, search]);

  const resetForm = useCallback(() => {
    setSelectedSystem(null);
    setValidationErrors({});
    setFormData(cloneForm(INITIAL_FORM));
  }, []);

  const closeModal = useCallback(() => {
    if (saving) return;

    setShowModal(false);
    resetForm();
  }, [saving, resetForm]);

  const handleCreate = () => {
    resetForm();
    setShowModal(true);
  };

  const handleEdit = (system) => {
    setSelectedSystem(system);

    setFormData({
      name: system?.name || "",
      passMark:
        system?.passMark ??
        INITIAL_FORM.passMark,

      grades:
        Array.isArray(system?.grades) &&
        system.grades.length
          ? system.grades.map((grade) => ({
              grade: grade?.grade || "",
              minScore:
                Number(grade?.minScore ?? 0),
              maxScore:
                Number(grade?.maxScore ?? 0),
              remark: grade?.remark || "",
            }))
          : cloneForm(INITIAL_FORM).grades,
    });

    setValidationErrors({});
    setShowModal(true);
  };

  const handleDelete = (system) => {
    setSelectedSystem(system);
    setShowDeleteDialog(true);
  };

  const handleActivate = async (system) => {
    if (!system?._id) {
      return;
    }

    try {
      await activateGradingSystem(
        system._id,
      );
    } catch (err) {
      console.error(
        "Activate grading system error:",
        err,
      );
    }
  };

  const validate = () => {
    const errors = {};

    const name = String(
      formData.name || "",
    ).trim();

    if (!name) {
      errors.name =
        "Grading system name is required.";
    }

    const passMark = Number(formData.passMark);

    if (
      Number.isNaN(passMark) ||
      passMark < 0 ||
      passMark > 100
    ) {
      errors.passMark =
        "Pass mark must be between 0 and 100.";
    }

    if (
      !Array.isArray(formData.grades) ||
      formData.grades.length === 0
    ) {
      errors.grades =
        "At least one grade is required.";
    }

    formData.grades?.forEach(
      (grade, index) => {
        const gradeName = String(
          grade?.grade || "",
        ).trim();

        if (!gradeName) {
          errors[`grade-${index}`] =
            "Grade name is required.";
        }

        const min = Number(
          grade?.minScore,
        );

        const max = Number(
          grade?.maxScore,
        );

        if (
          Number.isNaN(min) ||
          Number.isNaN(max)
        ) {
          errors[`grade-${index}`] =
            "Minimum and maximum scores are required.";
          return;
        }

        if (min > max) {
          errors[`grade-${index}`] =
            "Minimum score cannot exceed maximum score.";
        }

        if (min < 0 || max > 100) {
          errors[`grade-${index}`] =
            "Scores must be between 0 and 100.";
        }
      },
    );

    /*
     * Check for overlapping score ranges.
     */
    const sortedGrades = [
      ...(formData.grades || []),
    ].sort(
      (a, b) =>
        Number(b?.minScore || 0) -
        Number(a?.minScore || 0),
    );

    for (
      let index = 0;
      index < sortedGrades.length - 1;
      index += 1
    ) {
      const current =
        sortedGrades[index];

      const next =
        sortedGrades[index + 1];

      if (
        Number(current?.minScore || 0) <=
        Number(next?.maxScore || 0)
      ) {
        const originalIndex =
          formData.grades.indexOf(next);

        if (originalIndex !== -1) {
          errors[
            `grade-${originalIndex}`
          ] = "Grade ranges overlap.";
        }
      }
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) {
      return;
    }

    try {
      const payload = {
        name: String(
          formData.name || "",
        ).trim(),

        passMark: Number(
          formData.passMark || 0,
        ),

        grades: (formData.grades || []).map(
          (grade) => ({
            grade: String(
              grade?.grade || "",
            ).trim(),

            minScore: Number(
              grade?.minScore || 0,
            ),

            maxScore: Number(
              grade?.maxScore || 0,
            ),

            remark: String(
              grade?.remark || "",
            ).trim(),
          }),
        ),
      };

      if (selectedSystem?._id) {
        await editGradingSystem(
          selectedSystem._id,
          payload,
        );
      } else {
        await addGradingSystem(payload);
      }

      setShowModal(false);
      resetForm();
    } catch (err) {
      console.error(
        "Save grading system error:",
        err,
      );
    }
  };

  const confirmDelete = async () => {
    if (!selectedSystem?._id) {
      return;
    }

    try {
      await removeGradingSystem(
        selectedSystem._id,
      );

      setShowDeleteDialog(false);
      setSelectedSystem(null);
    } catch (err) {
      console.error(
        "Delete grading system error:",
        err,
      );
    }
  };

  if (loading) {
    return <SetupSkeleton />;
  }

  if (
    error &&
    systems.length === 0
  ) {
    return (
      <SetupEmptyState
        title="Unable to load grading systems"
        description={error}
        actionLabel="Retry"
        onAction={refresh}
      />
    );
  }

  const totalGrades =
    getGradeCount(systems);

  const averagePassMark =
    getAveragePassMark(systems);

  return (
    <div className="min-h-full bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8">

        {/* PAGE HEADER */}

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

          <div>
            <div className="mb-3 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span>School Setup</span>

              <ChevronRight className="h-4 w-4" />

              <span className="font-medium text-slate-700 dark:text-slate-200">
                Grading System
              </span>
            </div>

            <div className="flex items-start gap-4">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                <Award className="h-7 w-7" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                  Grading System
                </h1>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
                  Configure the grading rules your school
                  uses to calculate student performance,
                  grades and academic remarks.
                </p>
              </div>

            </div>
          </div>

          <button
            type="button"
            onClick={handleCreate}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
          >
            <Settings2 className="h-4 w-4" />
            New Grading System
          </button>

        </div>

        {/* STAT CARDS */}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Grading Systems
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                  {systems.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50">
                <GraduationCap className="h-5 w-5" />
              </div>

            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Grade Rules
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                  {totalGrades}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-950/50">
                <Award className="h-5 w-5" />
              </div>

            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Average Pass Mark
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                  {averagePassMark}%
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50">
                <TrendingUp className="h-5 w-5" />
              </div>

            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Status
                </p>

                <div className="mt-2 flex items-center gap-2">

                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                  <span className="text-lg font-bold text-slate-900 dark:text-white">
                    {systems.length > 0
                      ? "Configured"
                      : "Not configured"}
                  </span>

                </div>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50">
                <CheckCircle2 className="h-5 w-5" />
              </div>

            </div>
          </div>

        </div>

        {/* MAIN PANEL */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <div className="flex flex-col gap-4 border-b border-slate-200 p-5 dark:border-slate-800 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Grading configurations
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Manage the grading scales available to your school.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              <div className="relative">

                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="search"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search grading systems..."
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-9 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-950 sm:w-72"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() =>
                      setSearch("")
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}

              </div>

              <button
                type="button"
                onClick={refresh}
                disabled={loading}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <RefreshCw
                  className={`h-4 w-4 ${
                    loading
                      ? "animate-spin"
                      : ""
                  }`}
                />

                Refresh
              </button>

            </div>
          </div>

          {search && (
            <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/70 px-5 py-3 text-sm dark:border-slate-800 dark:bg-slate-950/50">

              <SlidersHorizontal className="h-4 w-4 text-slate-400" />

              <span className="text-slate-500 dark:text-slate-400">
                Showing
              </span>

              <span className="font-semibold text-slate-900 dark:text-white">
                {filteredSystems.length}
              </span>

              <span className="text-slate-500 dark:text-slate-400">
                result
                {filteredSystems.length !== 1
                  ? "s"
                  : ""}
              </span>

            </div>
          )}

          {filteredSystems.length === 0 ? (

            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">

                {search ? (
                  <Search className="h-7 w-7" />
                ) : (
                  <Award className="h-7 w-7" />
                )}

              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
                {search
                  ? "No grading systems found"
                  : "No grading system configured"}
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                {search
                  ? "Try a different search term or clear the current filter."
                  : "Create your first grading system to define how student scores are converted into grades and remarks."}
              </p>

              {!search && (
                <button
                  type="button"
                  onClick={handleCreate}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Award className="h-4 w-4" />
                  Create Grading System
                </button>
              )}

              {search && (
                <button
                  type="button"
                  onClick={() =>
                    setSearch("")
                  }
                  className="mt-6 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Clear Search
                </button>
              )}

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[900px]">

                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-950/50">

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Grading System
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Pass Mark
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Grade Rules
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Scale
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

                  {filteredSystems.map(
                    (system) => {

                      const isCurrent =
                        Boolean(
                          system?.isCurrent ??
                          system?.current ??
                          system?.active,
                        );

                      return (
                        <tr
                          key={system?._id}
                          className="group transition hover:bg-slate-50/70 dark:hover:bg-slate-800/40"
                        >

                          <td className="px-5 py-5">

                            <div className="flex items-center gap-3">

                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50">
                                <Award className="h-5 w-5" />
                              </div>

                              <div>
                                <p className="font-semibold text-slate-900 dark:text-white">
                                  {system?.name ||
                                    "Unnamed grading system"}
                                </p>

                                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                  Standard academic grading scale
                                </p>
                              </div>

                            </div>

                          </td>

                          <td className="px-5 py-5">

                            <span className="inline-flex items-center rounded-lg bg-emerald-50 px-2.5 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                              {system?.passMark ?? 0}%
                            </span>

                          </td>

                          <td className="px-5 py-5">

                            <div className="flex flex-wrap gap-1.5">

                              {(system?.grades || [])
                                .slice(0, 6)
                                .map(
                                  (
                                    grade,
                                    index,
                                  ) => (
                                    <span
                                      key={`${grade?.grade || "grade"}-${index}`}
                                      className="inline-flex min-w-8 items-center justify-center rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                                      title={
                                        grade?.remark ||
                                        ""
                                      }
                                    >
                                      {grade?.grade ||
                                        "-"}
                                    </span>
                                  ),
                                )}

                              {(system?.grades
                                ?.length || 0) > 6 && (
                                <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                  +
                                  {(system?.grades
                                    ?.length || 0) -
                                    6}
                                </span>
                              )}

                            </div>

                          </td>

                          <td className="px-5 py-5">

                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">

                              <CheckCircle2 className="h-4 w-4 text-emerald-500" />

                              <span>
                                {system?.grades
                                  ?.length || 0}{" "}
                                level
                                {(system?.grades
                                  ?.length || 0) !== 1
                                  ? "s"
                                  : ""}
                              </span>

                            </div>

                          </td>

                          <td className="px-5 py-5">

                            {isCurrent ? (
                              <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                Current
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() =>
                                  handleActivate(system)
                                }
                                disabled={saving}
                                className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-400 dark:hover:bg-blue-950/50"
                              >
                                {saving
                                  ? "Activating..."
                                  : "Set Current"}
                              </button>
                            )}

                          </td>

                          <td className="px-5 py-5">

                            <div className="flex justify-end gap-2">

                              <button
                                type="button"
                                onClick={() =>
                                  handleEdit(
                                    system,
                                  )
                                }
                                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-blue-950/30 dark:hover:text-blue-400"
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(
                                    system,
                                  )
                                }
                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                                title="Delete grading system"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>

                            </div>

                          </td>

                        </tr>
                      );
                    },
                  )}

                </tbody>
              </table>

            </div>
          )}

        </div>

        {/* INFO NOTICE */}

        <div className="flex gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-900/50 dark:bg-blue-950/20">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
            <CircleAlert className="h-5 w-5" />
          </div>

          <div>

            <h3 className="font-semibold text-blue-900 dark:text-blue-300">
              Grading configuration
            </h3>

            <p className="mt-1 text-sm leading-6 text-blue-800/80 dark:text-blue-300/70">
              Grading systems determine how student scores
              are interpreted across your school. Make sure
              score ranges do not overlap and that the pass
              mark matches your academic policy before
              publishing student results.
            </p>

          </div>

        </div>

      </div>

      {/* CREATE / EDIT MODAL */}

      <GradingSystemModal
        open={showModal}
        system={selectedSystem}
        saving={saving}
        formData={formData}
        setFormData={setFormData}
        validationErrors={validationErrors}
        onClose={closeModal}
        onSave={handleSave}
      />

      {/* DELETE DIALOG */}

      <DeleteConfirmDialog
        open={showDeleteDialog}
        loading={deleting}
        title="Delete Grading System"
        message={
          selectedSystem
            ? `Are you sure you want to delete ${selectedSystem.name}? This action cannot be undone.`
            : "Are you sure you want to delete this grading system?"
        }
        onCancel={() => {
          if (deleting) return;

          setShowDeleteDialog(false);
          setSelectedSystem(null);
        }}
        onConfirm={confirmDelete}
      />

    </div>
  );
}