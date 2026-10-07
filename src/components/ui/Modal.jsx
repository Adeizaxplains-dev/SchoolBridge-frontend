export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white w-[90%] max-w-md rounded-xl p-6">
        <button
          onClick={onClose}
          className="float-right text-gray-500"
        >
          ✕
        </button>

        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}