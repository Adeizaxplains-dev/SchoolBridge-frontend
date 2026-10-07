// src/components/school-setup/SetupNextAction.jsx

import PropTypes from "prop-types";
import clsx from "clsx";
import {
  ArrowRight,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";

export default function SetupNextAction({
  action,
  loading = false,
  onNavigate,
  className = "",
}) {
  if (loading) {
    return (
      <section
        className={clsx(
          "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm",
          "dark:border-gray-800 dark:bg-gray-900",
          className
        )}
      >
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-48 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-10 w-40 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </section>
    );
  }

  if (!action) {
    return (
      <section
        className={clsx(
          "rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm",
          "dark:border-green-900 dark:bg-green-950/20",
          className
        )}
      >
        <div className="flex items-start gap-4">
          <CheckCircle2 className="mt-1 h-7 w-7 text-green-600" />

          <div>
            <h2 className="text-lg font-semibold text-green-700 dark:text-green-400">
              School setup completed
            </h2>

            <p className="mt-2 text-sm leading-6 text-green-600 dark:text-green-300">
              Your master data has been configured. You can now continue using
              operational modules such as Students, Teachers, Attendance,
              Results, Assignments and Fees.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={clsx(
        "rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-sm",
        "dark:border-blue-900 dark:bg-blue-950/20",
        className
      )}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
            <Lightbulb className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recommended Next Step
            </h2>

            <h3 className="mt-2 text-base font-medium text-blue-700 dark:text-blue-300">
              {action.title}
            </h3>

            {action.description && (
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                {action.description}
              </p>
            )}
          </div>
        </div>

        {action.route && (
          <button
            type="button"
            onClick={() => onNavigate?.(action.route)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Continue Setup

            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </section>
  );
}

SetupNextAction.propTypes = {
  loading: PropTypes.bool,

  className: PropTypes.string,

  onNavigate: PropTypes.func,

  action: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    route: PropTypes.string,
  }),
};