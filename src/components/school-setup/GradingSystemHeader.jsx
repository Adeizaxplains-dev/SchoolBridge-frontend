import {
  Award,
  Plus,
} from "lucide-react";

export default function GradingSystemHeader({
  totalSystems = 0,
  onCreate,
}) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
          <Award className="h-8 w-8" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Grading System
          </h1>

          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Configure score ranges, grades and remarks used for student
            results.
          </p>

          <p className="mt-2 text-sm font-medium text-blue-600">
            {totalSystems} Grading System
            {totalSystems !== 1 && "s"}
          </p>
        </div>
      </div>

      {/* ACTION BUTTON */}
      <button
        type="button"
        onClick={onCreate}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Plus className="h-5 w-5" />
        New Grading System
      </button>
    </div>
  );
}