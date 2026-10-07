import {
  ArrowLeft,
  Pencil,
  FileText,
  Printer,
  Send,
  CheckCircle,
  Rocket,
} from "lucide-react";

export default function ResultHeaderActions({
  result,
  onBack,
  onEdit,
  onGeneratePDF,
  onPrint,
  onSend,
  onApprove,
  onPublish,
}) {
  return (
    <div className="sticky top-0 z-40 bg-white border-b shadow-sm">

      <div className="flex items-center justify-between px-6 py-4">

        {/* LEFT */}

        <div className="flex items-center gap-4">

          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>

          <div>

            <h1 className="text-2xl font-bold text-gray-900">
              Student Result
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              {result?.studentName} • {result?.className}
            </p>

          </div>

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-3 flex-wrap">

          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-gray-50 transition"
          >
            <Pencil size={18} />
            Edit
          </button>

          <button
            onClick={onGeneratePDF}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            <FileText size={18} />
            PDF
          </button>

          <button
            onClick={onPrint}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-gray-50 transition"
          >
            <Printer size={18} />
            Print
          </button>

          <button
            onClick={onSend}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            <Send size={18} />
            Send
          </button>

          {result?.status === "draft" && (

            <button
              onClick={onApprove}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              <CheckCircle size={18} />
              Approve
            </button>

          )}

          {result?.status === "approved" && (

            <button
              onClick={onPublish}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
            >
              <Rocket size={18} />
              Publish
            </button>

          )}

        </div>

      </div>

    </div>
  );
}