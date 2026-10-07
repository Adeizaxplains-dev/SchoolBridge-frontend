import {
  Save,
  ArrowLeft,
  FileText,
} from "lucide-react";

export default function StickySaveBar({
  totalScore,
  average,
  percentage,
  onSave,
  onBack,
  loading = false,
}) {
  return (
    <div
      className="
      sticky
      bottom-0
      left-0
      right-0
      bg-white
      border-t
      shadow-2xl
      mt-8
      z-40
    "
    >
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-wrap justify-between items-center gap-4 px-6 py-4">

          {/* Summary */}

          <div className="flex flex-wrap gap-8">

            <div>
              <p className="text-xs text-gray-500 uppercase">
                Total
              </p>

              <p className="font-bold text-xl text-blue-700">
                {totalScore}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase">
                Average
              </p>

              <p className="font-bold text-xl text-green-700">
                {average.toFixed(2)}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase">
                Percentage
              </p>

              <p className="font-bold text-xl text-purple-700">
                {percentage.toFixed(2)}%
              </p>
            </div>

          </div>

          {/* Buttons */}

          <div className="flex gap-3">

            <button
              onClick={onBack}
              className="
                flex
                items-center
                gap-2
                border
                rounded-xl
                px-5
                py-3
                hover:bg-gray-100
              "
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <button
              className="
                flex
                items-center
                gap-2
                border
                rounded-xl
                px-5
                py-3
                hover:bg-gray-100
              "
            >
              <FileText size={18} />
              Preview
            </button>

            <button
              disabled={loading}
              onClick={onSave}
              className="
                flex
                items-center
                gap-2
                bg-blue-600
                hover:bg-blue-700
                text-white
                rounded-xl
                px-6
                py-3
                font-semibold
                disabled:opacity-50
              "
            >
              <Save size={18} />

              {loading
                ? "Saving..."
                : "Save Result"}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}