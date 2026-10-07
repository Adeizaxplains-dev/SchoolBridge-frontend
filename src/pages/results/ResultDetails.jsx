import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Loader2,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import API from "../../services/api";
import ResultPrintLayout from "../../components/results/ResultPrintLayout";
import ResultPDFButton from "../../components/results/ResultPDFButton";

export default function ResultDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadResult();
  }, [id]);

  const loadResult = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get(`/results/${id}`);

      setResult(res.data.data);
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          "Unable to load result."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2
            className="animate-spin text-blue-600"
            size={42}
          />

          <div className="text-center">
            <h3 className="font-semibold text-slate-800">
              Loading Student Result
            </h3>

            <p className="text-sm text-slate-500">
              Please wait...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="rounded-3xl bg-white p-10 shadow-lg border text-center max-w-md">

          <FileText
            className="mx-auto text-red-500"
            size={48}
          />

          <h2 className="mt-4 text-xl font-bold text-slate-900">
            Result Not Available
          </h2>

          <p className="mt-2 text-slate-500">
            {error || "Result not found."}
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const published =
    result.status === "published";

  return (
    <div className="min-h-screen bg-slate-100">

      {/* PAGE HEADER */}

      <div className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>

            <button
              onClick={() => navigate(-1)}
              className="mb-3 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition"
            >
              <ArrowLeft size={16} />

              Back to Results
            </button>

            <h1 className="text-2xl font-bold text-slate-900">
              Student Report Card
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              {result.studentName} •{" "}
              {result.className} •{" "}
              {result.term} Term •{" "}
              {result.session}
            </p>

          </div>

          <div className="flex items-center gap-3">

            <span
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                published
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {published ? (
                <CheckCircle2 size={16} />
              ) : (
                <Clock3 size={16} />
              )}

              {published
                ? "Published"
                : "Draft"}
            </span>

            <ResultPDFButton
              resultId={result._id}
            />

          </div>

        </div>

      </div>

      {/* REPORT */}

      <div className="mx-auto max-w-7xl p-6">

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">

          <ResultPrintLayout
            result={result}
          />

        </div>

      </div>

    </div>
  );
}