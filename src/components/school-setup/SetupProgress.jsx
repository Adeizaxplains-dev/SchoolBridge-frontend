// src/components/school-setup/SetupProgress.jsx

import PropTypes from "prop-types";
import clsx from "clsx";
import {
  CheckCircle2,
  Circle,
} from "lucide-react";

export default function SetupProgress({
  progress,
  loading = false,
  className = "",
}) {
  if (loading) {
    return (
      <div
        className={clsx(
          "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm",
          "dark:border-gray-800 dark:bg-gray-900",
          className
        )}
      >
        <div className="h-6 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />

        <div className="mt-8 h-3 w-full animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />

        <div className="mt-8 space-y-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="h-5 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700"
            />
          ))}
        </div>
      </div>
    );
  }

  const {
    completed = 0,
    total = 0,
    percentage = 0,
    items = [],
  } = progress || {};

  return (
    <section
      className={clsx(
        "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm",
        "dark:border-gray-800 dark:bg-gray-900",
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            School Setup Progress
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {completed} of {total} setup sections completed
          </p>
        </div>

        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {percentage}%
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            Complete
          </div>
        </div>
      </div>

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{
            width: `${Math.max(
              0,
              Math.min(percentage, 100)
            )}%`,
          }}
        />
      </div>

      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <div
            key={item.key}
            className="flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              {item.completed ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-600" />
              ) : (
                <Circle className="mt-0.5 h-5 w-5 text-gray-400" />
              )}

              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {item.title}
                </div>

                {item.description && (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {item.description}
                  </div>
                )}
              </div>
            </div>

            <span
              className={clsx(
                "rounded-full px-3 py-1 text-xs font-medium",
                item.completed
                  ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
              )}
            >
              {item.completed ? "Completed" : "Pending"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

SetupProgress.propTypes = {
  loading: PropTypes.bool,
  className: PropTypes.string,
  progress: PropTypes.shape({
    completed: PropTypes.number,
    total: PropTypes.number,
    percentage: PropTypes.number,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        completed: PropTypes.bool.isRequired,
      })
    ),
  }),
};