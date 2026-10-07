export default function Input({ label, className, ...props }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm mb-1 text-gray-600">
          {label}
        </label>
      )}

      <input
        className={`w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    </div>
  );
}