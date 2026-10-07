import PropTypes from "prop-types";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";

export default function SetupCard({
  title,
  description,
  value,
  icon: Icon,
  status,
  footer,
  actions,
  loading = false,
  onClick,
  children,
  className = "",
}) {
  const clickable = typeof onClick === "function";

  return (
    <div
      onClick={clickable ? onClick : undefined}
      className={clsx(
        "group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200",
        "dark:border-gray-800 dark:bg-gray-900",
        clickable && [
          "cursor-pointer",
          "hover:-translate-y-1",
          "hover:border-primary/30",
          "hover:shadow-lg",
        ],
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-4">
          {Icon && (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </div>
          )}

          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>

            {description && (
              <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
        </div>

        {clickable && (
          <ChevronRight className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-hover:translate-x-1" />
        )}
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="h-8 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        ) : (
          <>
            {value && (
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {value}
              </div>
            )}

            {status && (
              <div className="mt-3">
                {status}
              </div>
            )}

            {children}
          </>
        )}
      </div>

      {(footer || actions) && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-4 dark:border-gray-800">
          <div>{footer}</div>

          <div className="flex items-center gap-2">
            {actions}
          </div>
        </div>
      )}
    </div>
  );
}

SetupCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
  ]),
  icon: PropTypes.elementType,
  status: PropTypes.node,
  footer: PropTypes.node,
  actions: PropTypes.node,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};