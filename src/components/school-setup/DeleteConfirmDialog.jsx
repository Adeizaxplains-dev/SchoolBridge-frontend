import {
  AlertTriangle,
  Loader2,
  Trash2,
  X,
} from "lucide-react";

export default function DeleteConfirmDialog({
  open = false,
  title = "Delete Item",
  message = "Are you sure you want to delete this item?",
  confirmText = "Delete",
  cancelText = "Cancel",
  deleting = false,
  onConfirm,
  onClose,
}) {
  if (!open) return null;

  return (
    <div
      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/50
      p-4
      backdrop-blur-sm
    "
    >
      <div
        className="
        w-full
        max-w-md
        overflow-hidden
        rounded-2xl
        bg-white
        shadow-2xl

        dark:bg-gray-900
      "
      >
        {/* =======================================
            Header
        ======================================= */}

        <div
          className="
          flex
          items-center
          justify-between
          border-b
          border-gray-200
          px-6
          py-4

          dark:border-gray-800
        "
        >
          <div className="flex items-center gap-3">
            <div
              className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-red-100
              dark:bg-red-900/30
              "
            >
              <AlertTriangle
                className="
                h-6
                w-6
                text-red-600
                dark:text-red-400
              "
              />
            </div>

            <div>
              <h2
                className="
                text-lg
                font-semibold
                text-gray-900
                dark:text-white
              "
              >
                {title}
              </h2>

              <p
                className="
                mt-1
                text-sm
                text-gray-500
                dark:text-gray-400
              "
              >
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="
            rounded-lg
            p-2
            text-gray-500
            transition
            hover:bg-gray-100

            dark:hover:bg-gray-800

            disabled:cursor-not-allowed
            disabled:opacity-50
          "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* =======================================
            Body
        ======================================= */}

        <div className="px-6 py-6">
          <p
            className="
            leading-7
            text-gray-600
            dark:text-gray-300
          "
          >
            {message}
          </p>
        </div>

        {/* =======================================
            Footer
        ======================================= */}

        <div
          className="
          flex
          justify-end
          gap-3
          border-t
          border-gray-200
          px-6
          py-4

          dark:border-gray-800
        "
        >
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="
            rounded-xl
            border
            border-gray-300
            px-5
            py-2.5
            font-medium
            transition

            hover:bg-gray-50

            dark:border-gray-700
            dark:hover:bg-gray-800

            disabled:cursor-not-allowed
            disabled:opacity-50
          "
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-red-600
            px-5
            py-2.5
            font-medium
            text-white
            transition

            hover:bg-red-700

            disabled:cursor-not-allowed
            disabled:opacity-70
          "
          >
            {deleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                {confirmText}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}