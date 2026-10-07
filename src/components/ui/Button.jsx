import clsx from "clsx";

export default function Button({
  children,
  className,
  variant = "primary",
  ...props
}) {
  const baseStyle =
    "px-4 py-2 rounded-lg font-medium text-sm transition flex items-center justify-center";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "bg-transparent hover:bg-gray-100",
  };

  return (
    <button
      className={clsx(baseStyle, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}