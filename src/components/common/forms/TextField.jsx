import { AlertCircle } from "lucide-react";

export default function TextField({
  label,
  name,
  value,
  onChange,

  type = "text",

  placeholder = "",

  icon: Icon,

  required = false,

  disabled = false,

  readOnly = false,

  error = "",

  helperText = "",

  maxLength,

  autoComplete = "off",

  className = "",

  inputClassName = "",

  leftElement,

  rightElement,
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

      {/* Input */}

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

        <input
          id={name}
          name={name}
          type={type}
          value={value ?? ""}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          autoComplete={autoComplete}
          maxLength={maxLength}
          onChange={(e) =>
            onChange?.(e.target.value)
          }
          className={`
            w-full
            bg-transparent
            px-4
            py-3
            outline-none
            placeholder:text-slate-400
            disabled:cursor-not-allowed
            disabled:bg-slate-50
            ${inputClassName}
          `}
        />

        {rightElement}

        {hasError && (
          <div className="pr-3 text-red-500">

            <AlertCircle size={18} />

          </div>
        )}
      </div>

      {/* Helper */}

      {!hasError && helperText && (
        <p className="text-xs text-slate-500">

          {helperText}

        </p>
      )}

      {/* Error */}

      {hasError && (
        <p className="flex items-center gap-1 text-xs text-red-600">

          <AlertCircle size={14} />

          {error}

        </p>
      )}

    </div>
  );
}