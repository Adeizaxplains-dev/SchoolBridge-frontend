import React from "react";

export default function SummaryCard({
  title,
  value,
  icon: Icon,
  description,
  color = "primary",
}) {
  const colorClasses = {
    primary: {
      bg: "bg-primary/10",
      text: "text-primary",
    },
    green: {
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-600 dark:text-green-400",
    },
    blue: {
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-600 dark:text-blue-400",
    },
    amber: {
      bg: "bg-amber-100 dark:bg-amber-900/30",
      text: "text-amber-600 dark:text-amber-400",
    },
    red: {
      bg: "bg-red-100 dark:bg-red-900/30",
      text: "text-red-600 dark:text-red-400",
    },
  };

  const selected =
    colorClasses[color] || colorClasses.primary;

  return (
    <div
      className="
      rounded-2xl
      border
      border-gray-200
      bg-white
      p-6
      shadow-sm
      transition-all
      duration-200
      hover:shadow-md
      dark:border-gray-800
      dark:bg-gray-900
    "
    >
      <div className="flex items-start justify-between">
        <div>
          <p
            className="
            text-sm
            font-medium
            text-gray-500
            dark:text-gray-400
          "
          >
            {title}
          </p>

          <h3
            className="
            mt-2
            text-3xl
            font-bold
            text-gray-900
            dark:text-white
          "
          >
            {value}
          </h3>

          {description && (
            <p
              className="
              mt-2
              text-sm
              text-gray-500
              dark:text-gray-400
            "
            >
              {description}
            </p>
          )}
        </div>

        {Icon && (
          <div
            className={`
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              ${selected.bg}
            `}
          >
            <Icon
              className={`h-6 w-6 ${selected.text}`}
            />
          </div>
        )}
      </div>
    </div>
  );
}