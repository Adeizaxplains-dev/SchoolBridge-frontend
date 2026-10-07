export default function Card({ title, value, icon, className }) {
  return (
    <div className={`bg-white rounded-xl shadow p-5 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          {title && (
            <p className="text-sm text-gray-500">{title}</p>
          )}

          {value && (
            <h2 className="text-xl font-bold mt-1">{value}</h2>
          )}
        </div>

        {icon && (
          <div className="text-blue-600 text-2xl">{icon}</div>
        )}
      </div>
    </div>
  );
}