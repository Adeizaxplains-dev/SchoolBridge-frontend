import PropTypes from "prop-types";
import clsx from "clsx";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
} from "lucide-react";

export default function SetupModuleCard({
  title,
  description,
  icon: Icon,
  completed = false,
  badge,
  disabled = false,
  loading = false,
  onClick,
  className = "",
}) {
  const clickable = typeof onClick === "function" && !disabled;

  return (
    <article
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : -1}
      onClick={clickable ? onClick : undefined}
      onKeyDown={(event) => {
        if (!clickable) return;

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      className={clsx(
        "group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200",
        "dark:border-gray-800 dark:bg-gray-900",
        clickable && [
          "cursor-pointer",
          "hover:-translate-y-1",
          "hover:border-primary/40",
          "hover:shadow-lg",
          "focus:outline-none",
          "focus:ring-2",
          "focus:ring-primary/30",
        ],
        disabled && "cursor-not-allowed opacity-60",
        className
      )}
    >
      {/* ==========================
          Loading State
      ========================== */}

      {loading ? (
        <div className="animate-pulse">
          <div className="flex items-start justify-between">
            <div className="h-12 w-12 rounded-xl bg-gray-200 dark:bg-gray-700" />

            <div className="h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700" />
          </div>

          <div className="mt-6 h-5 w-40 rounded bg-gray-200 dark:bg-gray-700" />

          <div className="mt-3 h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />

          <div className="mt-2 h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      ) : (
        <>
          {/* ==========================
              Header
          ========================== */}

          <div className="flex items-start justify-between gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              {Icon && <Icon className="h-6 w-6" />}
            </div>

            {completed ? (
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            ) : (
              <Circle className="h-6 w-6 text-gray-400" />
            )}
          </div>

          {/* ==========================
              Content
          ========================== */}

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>

          {/* ==========================
              Footer
          ========================== */}

          <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
            <div className="flex items-center gap-2">
              {badge && (
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  {badge}
                </span>
              )}
            </div>

            {clickable && (
              <ArrowRight className="h-5 w-5 text-gray-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary" />
            )}
          </div>
        </>
      )}
    </article>
  );
}

SetupModuleCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  completed: PropTypes.bool,
  badge: PropTypes.node,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};