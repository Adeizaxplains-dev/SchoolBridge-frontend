import clsx from "clsx";

export default function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  error = "",
  required = false,
  disabled = false,
  helperText = "",
  className = "",
}) {
  return (
    <div className={clsx("space-y-2", className)}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-slate-700"
        >
          {label}
          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={clsx(
          "w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition",
          "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
          disabled && "cursor-not-allowed bg-slate-100",
          error
            ? "border-red-500"
            : "border-slate-300 hover:border-slate-400"
        )}
      />

      {helperText && !error && (
        <p className="text-xs text-slate-500">
          {helperText}
        </p>
      )}

      {error && (
        <p className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}