import {
  Download,
  Printer,
  Share2,
  ArrowLeft,
} from "lucide-react";

export default function ResultActionBar({
  onBack,
  onDownload,
  onPrint,
  onShare,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm px-8 py-5">

      <div className="flex flex-col lg:flex-row justify-between items-center gap-5">

        {/* LEFT */}

        <div className="flex items-center gap-4">

          <button
            onClick={onBack}
            className="w-12 h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center"
          >
            <ArrowLeft size={20} />
          </button>

          <div>

            <h1 className="text-2xl font-bold text-slate-800">

              Academic Result

            </h1>

            <p className="text-sm text-slate-500">

              Student Performance Report

            </p>

          </div>

        </div>

        {/* RIGHT */}

        <div className="flex flex-wrap gap-3">

          <button
            onClick={onDownload}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition"
          >
            <Download size={18} />
            Download PDF
          </button>

          <button
            onClick={onPrint}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-black text-white font-medium transition"
          >
            <Printer size={18} />
            Print
          </button>

          <button
            onClick={onShare}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium transition"
          >
            <Share2 size={18} />
            Share
          </button>

        </div>

      </div>

    </div>
  );
}