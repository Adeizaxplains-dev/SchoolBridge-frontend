import TextField from "./TextField";

export default function DateField({
  label,
  name,
  value,
  onChange,

  required = false,
  disabled = false,
  readOnly = false,

  error = "",

  helperText = "",

  min,
  max,

  icon,

  className = "",

  inputClassName = "",

  autoCalculateAge = false,
  onAgeChange,
}) {
  function handleChange(date) {
    onChange?.(date);

    if (
      autoCalculateAge &&
      date &&
      typeof onAgeChange === "function"
    ) {
      onAgeChange(calculateAge(date));
    }
  }

  return (
    <TextField
      type="date"
      label={label}
      name={name}
      value={value}
      onChange={handleChange}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
      error={error}
      helperText={helperText}
      icon={icon}
      className={className}
      inputClassName={inputClassName}
      min={min}
      max={max}
    />
  );
}

/* ----------------------------------------------------
   Helper
---------------------------------------------------- */

function calculateAge(dateString) {
  if (!dateString) return "";

  const today = new Date();

  const birthDate = new Date(dateString);

  let age =
    today.getFullYear() -
    birthDate.getFullYear();

  const monthDifference =
    today.getMonth() -
    birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 &&
      today.getDate() <
        birthDate.getDate())
  ) {
    age--;
  }

  return age;
}