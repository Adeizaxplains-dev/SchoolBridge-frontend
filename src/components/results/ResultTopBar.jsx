import {
  ArrowLeft,
  Save,
  Eye,
  FileText,
} from "lucide-react";

export default function ResultTopBar({
  onBack,
  onSave,
  onPreview,
  onDraft,
  saving,
}) {
  return (
    <div className="sticky top-0 z-40 bg-white border-b shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Left */}

        <div className="flex items-center gap-4">

          <button
            onClick={onBack}
            className="
              p-2
              rounded-lg
              hover:bg-gray-100
              transition
            "
          >
            <ArrowLeft size={20} />
          </button>

          <div>

            <h1 className="text-2xl font-bold text-gray-900">
              Create Student Result
            </h1>

            <p className="text-sm text-gray-500">
              Enter scores, remarks and publish report card
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          <button
            onClick={onDraft}
            className="
              flex
              items-center
              gap-2
              px-4
              py-2
              border
              rounded-lg
              hover:bg-gray-100
              transition
            "
          >
            <FileText size={18} />
            Save Draft
          </button>

          <button
            onClick={onPreview}
            className="
              flex
              items-center
              gap-2
              px-4
              py-2
              border
              rounded-lg
              hover:bg-blue-50
              transition
            "
          >
            <Eye size={18} />
            Preview
          </button>

          <button
            onClick={onSave}
            disabled={saving}
            className="
              flex
              items-center
              gap-2
              px-5
              py-2
              rounded-lg
              bg-blue-600
              hover:bg-blue-700
              text-white
              transition
              disabled:opacity-60
            "
          >
            <Save size={18} />

            {saving
              ? "Saving..."
              : "Save Result"}
          </button>

        </div>

      </div>

    </div>
  );
}