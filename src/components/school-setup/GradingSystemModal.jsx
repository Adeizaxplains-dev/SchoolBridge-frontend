import {
  X,
  Plus,
  Save,
} from "lucide-react";

import GradeRow from "./GradeRow";

export default function GradingSystemModal({
  open,
  system,
  formData,
  setFormData,
  validationErrors = {},
  saving = false,
  onSave,
  onClose,
}) {
  if (!open) return null;

  const updateGrade = (index, updatedGrade) => {
    const grades = [...formData.grades];
    grades[index] = updatedGrade;

    setFormData({
      ...formData,
      grades,
    });
  };

  const addGrade = () => {
    setFormData({
      ...formData,
      grades: [
        ...formData.grades,
        {
          grade: "",
          minScore: 0,
          maxScore: 0,
          remark: "",
        },
      ],
    });
  };

  const removeGrade = (index) => {
    const grades = formData.grades.filter(
      (_, i) => i !== index
    );

    setFormData({
      ...formData,
      grades,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-xl dark:bg-gray-900">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b px-6 py-5 dark:border-gray-800">
          <div>
            <h2 className="text-xl font-bold dark:text-white">
              {system
                ? "Edit Grading System"
                : "Create Grading System"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Configure score ranges used for student results.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* BODY */}
        <div className="space-y-6 p-6">

          {/* NAME */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              System Name
            </label>

            <input
              type="text"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              placeholder="Example: WAEC Grading System"
              className={`w-full rounded-xl border px-4 py-3 ${
                validationErrors.name
                  ? "border-red-500"
                  : "border-gray-300"
              } dark:border-gray-700 dark:bg-gray-950`}
            />

            {validationErrors.name && (
              <p className="mt-1 text-sm text-red-600">
                {validationErrors.name}
              </p>
            )}
          </div>

          {/* PASS MARK */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Pass Mark (%)
            </label>

            <input
              type="number"
              value={formData.passMark ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  passMark: Number(e.target.value),
                })
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 dark:border-gray-700 dark:bg-gray-950"
            />
          </div>

          {/* GRADES */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold dark:text-white">
                Grade Rules
              </h3>

              <button
                type="button"
                onClick={addGrade}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Plus className="h-4 w-4" />
                Add Grade
              </button>
            </div>

            <div className="space-y-3">
              {formData.grades?.map((grade, index) => (
                <GradeRow
                  key={index}
                  grade={grade}
                  index={index}
                  onChange={updateGrade}
                  onRemove={() => removeGrade(index)}
                  error={
                    validationErrors[`grade-${index}`]
                  }
                />
              ))}
            </div>

            {validationErrors.grades && (
              <p className="mt-2 text-sm text-red-600">
                {validationErrors.grades}
              </p>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 border-t px-6 py-5 dark:border-gray-800">

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-xl border border-gray-300 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save className="h-4 w-4" />

            {saving ? "Saving..." : "Save System"}
          </button>

        </div>
      </div>
    </div>
  );
}