export default function DeliveryOption({
  icon,
  title,
  description,
  selected,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer
        rounded-xl
        border-2
        p-5
        transition-all
        duration-200
        hover:shadow-lg
        ${
          selected
            ? "border-blue-600 bg-blue-50"
            : "border-gray-200 bg-white"
        }
      `}
    >
      <div className="flex items-center gap-4">

        <div className="text-4xl">
          {icon}
        </div>

        <div>

          <h3 className="font-semibold text-lg">
            {title}
          </h3>

          <p className="text-gray-500 text-sm">
            {description}
          </p>

        </div>

      </div>
    </div>
  );
}