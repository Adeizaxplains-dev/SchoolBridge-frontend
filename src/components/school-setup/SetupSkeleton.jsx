import PropTypes from "prop-types";
import clsx from "clsx";

function Skeleton({ className = "" }) {
  return (
    <div
      className={clsx(
        "animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700",
        className
      )}
    />
  );
}

export default function SetupSkeleton({
  variant = "page",
  className = "",
}) {
  switch (variant) {
    case "cards":
      return (
        <div
          className={clsx(
            "grid gap-6 md:grid-cols-2 xl:grid-cols-4",
            className
          )}
        >
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <Skeleton className="h-12 w-12 rounded-xl" />

              <Skeleton className="mt-5 h-5 w-32" />

              <Skeleton className="mt-3 h-9 w-20" />

              <Skeleton className="mt-5 h-4 w-full" />
            </div>
          ))}
        </div>
      );

    case "table":
      return (
        <div
          className={clsx(
            "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900",
            className
          )}
        >
          <Skeleton className="h-10 w-56" />

          <div className="mt-8 space-y-5">
            {[...Array(8)].map((_, index) => (
              <Skeleton
                key={index}
                className="h-12 w-full"
              />
            ))}
          </div>
        </div>
      );

    case "form":
      return (
        <div
          className={clsx(
            "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900",
            className
          )}
        >
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="mb-6"
            >
              <Skeleton className="mb-2 h-4 w-32" />

              <Skeleton className="h-11 w-full" />
            </div>
          ))}
        </div>
      );

    case "list":
      return (
        <div
          className={clsx("space-y-4", className)}
        >
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <Skeleton className="h-5 w-52" />

              <Skeleton className="mt-3 h-4 w-full" />

              <Skeleton className="mt-2 h-4 w-3/4" />
            </div>
          ))}
        </div>
      );

    default:
      return (
        <div className={clsx("space-y-8", className)}>
          {/* Header */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Skeleton className="h-8 w-72" />

              <Skeleton className="mt-3 h-5 w-96 max-w-full" />
            </div>

            <Skeleton className="h-11 w-40" />
          </div>

          {/* Summary cards */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
              >
                <Skeleton className="h-12 w-12 rounded-xl" />

                <Skeleton className="mt-5 h-5 w-36" />

                <Skeleton className="mt-4 h-8 w-24" />
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="grid gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <Skeleton className="h-6 w-60" />

              <div className="mt-8 space-y-5">
                {[...Array(6)].map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-12 w-full"
                  />
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <Skeleton className="h-6 w-36" />

              <Skeleton className="mt-8 h-40 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      );
  }
}

SetupSkeleton.propTypes = {
  variant: PropTypes.oneOf([
    "page",
    "cards",
    "table",
    "form",
    "list",
  ]),
  className: PropTypes.string,
};