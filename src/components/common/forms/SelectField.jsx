import { AlertCircle, ChevronDown } from "lucide-react";

export default function SelectField({
  label,
  name,
  value,
  onChange,

  options = [],

  placeholder = "Select an option",

  icon: Icon,

  required = false,

  disabled = false,

  error = "",

  helperText = "",

  className = "",

  selectClassName = "",

  leftElement,

  rightElement,

  renderOption,

  getOptionLabel = (option) =>
    typeof option === "object"
      ? option.label
      : option,

  getOptionValue = (option) =>
    typeof option === "object"
      ? option.value
      : option,
}) {
  const hasError = Boolean(error);

  return (
    <div className={`space-y-2 ${className}`}>

      {/* Label */}

      {label && (
        <label
          htmlFor={name}
          className="flex items-center gap-1 text-sm font-semibold text-slate-700"
        >
          {label}

          {required && (
            <span className="text-red-500">
              *
            </span>
          )}
        </label>
      )}

      {/* Select */}

      <div
        className={`
          relative
          flex
          items-center
          rounded-xl
          border
          bg-white
          transition-all
          ${
            hasError
              ? "border-red-500 ring-2 ring-red-100"
              : "border-slate-300 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100"
          }
        `}
      >

        {Icon && (
          <div className="pl-4 text-slate-400">

            <Icon size={18} />

          </div>
        )}

        {leftElement}

        <select
          id={name}
          name={name}
          disabled={disabled}
          value={value ?? ""}
          onChange={(e) =>
            onChange?.(e.target.value)
          }
          className={`
            w-full
            appearance-none
            bg-transparent
            px-4
            py-3
            outline-none
            disabled:cursor-not-allowed
            disabled:bg-slate-50
            ${selectClassName}
          `}
        >

          <option value="">
            {placeholder}
          </option>

          {options.map((option) => {

            const optionValue =
              getOptionValue(option);

            const optionLabel =
              getOptionLabel(option);

            return (
              <option
                key={optionValue}
                value={optionValue}
              >
                {renderOption
                  ? renderOption(option)
                  : optionLabel}
              </option>
            );

          })}

        </select>

        {rightElement}

        <ChevronDown
          size={18}
          className="pointer-events-none absolute right-4 text-slate-400"
        />

      </div>

      {!hasError && helperText && (
        <p className="text-xs text-slate-500">
          {helperText}
        </p>
      )}

      {hasError && (
        <p className="flex items-center gap-1 text-xs text-red-600">

          <AlertCircle size={14} />

          {error}

        </p>
      )}

    </div>
  );
}