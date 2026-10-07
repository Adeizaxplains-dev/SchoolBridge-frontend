// src/components/school-setup/SetupEmptyState.jsx

import PropTypes from "prop-types";
import clsx from "clsx";
import {
  FolderOpen,
  Plus,
} from "lucide-react";

export default function SetupEmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon: Icon = FolderOpen,
  className = "",
}) {
  return (
    <section
      className={clsx(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center",
        "dark:border-gray-700 dark:bg-gray-900",
        className
      )}
    >
      {/* Icon */}

      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
        <Icon className="h-8 w-8" />
      </div>


      {/* Content */}

      <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>


      {description && (
        <p className="mt-3 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}


      {/* Action */}

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="
            mt-6
            inline-flex
            items-center
            gap-2
            rounded-lg
            bg-primary
            px-5
            py-3
            text-sm
            font-medium
            text-white
            transition
            hover:opacity-90
            focus:outline-none
            focus:ring-2
            focus:ring-primary/40
          "
        >
          <Plus className="h-4 w-4" />

          {actionLabel}
        </button>
      )}
    </section>
  );
}


SetupEmptyState.propTypes = {
  title: PropTypes.string.isRequired,

  description: PropTypes.string,

  actionLabel: PropTypes.string,

  onAction: PropTypes.func,

  icon: PropTypes.elementType,

  className: PropTypes.string,
};