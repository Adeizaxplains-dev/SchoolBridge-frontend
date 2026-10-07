import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  CheckCircle,
  Send,
  PlusCircle,
  RefreshCw,
  BarChart3,
  Clock3,
  TrendingUp,
} from "lucide-react";

import DashboardStatCard from "../dashboard/DashboardStatCard";
import ResultPerformanceChart from "./ResultPerformanceChart";
import ResultHistoryCard from "./ResultHistoryCard";
import ResultTable from "./ResultTable";

export default function ResultDashboard({
  results = [],
  loading = false,
  onRefresh,
}) {
  const navigate = useNavigate();

  const stats = useMemo(() => {
    return {
      total: results.length,

      draft: results.filter(
        (r) => (r.status || "").toLowerCase() === "draft"
      ).length,

      approved: results.filter(
        (r) => (r.status || "").toLowerCase() === "approved"
      ).length,

      published: results.filter(
        (r) => (r.status || "").toLowerCase() === "published"
      ).length,

      sent: results.filter(
        (r) => (r.status || "").toLowerCase() === "sent"
      ).length,
    };
  }, [results]);

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}

      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 rounded-3xl text-white p-8 shadow-xl">

        <div className="flex flex-col lg:flex-row justify-between gap-6">

          <div>

            <h1 className="text-4xl font-bold">
              Result Dashboard
            </h1>

            <p className="mt-3 text-blue-100 text-lg">
              Monitor academic performance, publishing and student results.
            </p>

          </div>

          <div className="flex gap-3 self-start">

            <button
              onClick={onRefresh}
              className="bg-white/20 hover:bg-white/30 backdrop-blur rounded-xl px-5 py-3 flex items-center gap-2 transition"
            >
              <RefreshCw size={18} />
              Refresh
            </button>

            <button
              onClick={() => navigate("/results/create")}
              className="bg-white text-blue-700 hover:bg-gray-100 rounded-xl px-5 py-3 font-semibold flex items-center gap-2 transition"
            >
              <PlusCircle size={18} />
              New Result
            </button>

          </div>

        </div>

      </div>

      {/* ================= KPI ================= */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">

        <DashboardStatCard
          title="Total Results"
          value={stats.total}
          icon={FileText}
          color="blue"
        />

        <DashboardStatCard
          title="Draft"
          value={stats.draft}
          icon={Clock3}
          color="yellow"
        />

        <DashboardStatCard
          title="Approved"
          value={stats.approved}
          icon={CheckCircle}
          color="green"
        />

        <DashboardStatCard
          title="Published"
          value={stats.published}
          icon={TrendingUp}
          color="purple"
        />

        <DashboardStatCard
          title="Sent"
          value={stats.sent}
          icon={Send}
          color="emerald"
        />

      </div>

      {/* ================= QUICK ACTIONS ================= */}

      <div className="grid md:grid-cols-4 gap-5">

        <button
          onClick={() => navigate("/results/create")}
          className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-lg transition text-left"
        >
          <PlusCircle
            className="text-blue-600 mb-4"
            size={34}
          />

          <h3 className="font-semibold text-lg">
            Create Result
          </h3>

          <p className="text-gray-500 text-sm mt-2">
            Enter a new student's academic result.
          </p>
        </button>

        <button
          onClick={() => navigate("/results/publish")}
          className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-lg transition text-left"
        >
          <CheckCircle
            className="text-green-600 mb-4"
            size={34}
          />

          <h3 className="font-semibold text-lg">
            Publish Results
          </h3>

          <p className="text-gray-500 text-sm mt-2">
            Publish approved results.
          </p>
        </button>

        <button
          onClick={() => navigate("/results/send")}
          className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-lg transition text-left"
        >
          <Send
            className="text-purple-600 mb-4"
            size={34}
          />

          <h3 className="font-semibold text-lg">
            Send Results
          </h3>

          <p className="text-gray-500 text-sm mt-2">
            Deliver published results to parents.
          </p>
        </button>

        <button
          onClick={() => navigate("/results/analytics")}
          className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-lg transition text-left"
        >
          <BarChart3
            className="text-orange-600 mb-4"
            size={34}
          />

          <h3 className="font-semibold text-lg">
            Analytics
          </h3>

          <p className="text-gray-500 text-sm mt-2">
            View performance analytics.
          </p>
        </button>

      </div>

      {/* ================= CHARTS ================= */}

      <div className="grid xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2 bg-white rounded-3xl border shadow-sm p-6">

          <div className="flex justify-between items-center mb-5">

            <div>

              <h3 className="text-xl font-semibold">
                Performance Overview
              </h3>

              <p className="text-gray-500 text-sm">
                Average performance of recent results
              </p>

            </div>

          </div>

          <ResultPerformanceChart
            results={results}
          />

        </div>

        <div className="bg-white rounded-3xl border shadow-sm p-6">

          <ResultHistoryCard
            results={results}
          />

        </div>

      </div>

      {/* ================= RECENT RESULTS ================= */}

      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">

        <div className="flex justify-between items-center px-7 py-5 border-b">

          <div>

            <h3 className="text-xl font-semibold">
              Recent Results
            </h3>

            <p className="text-gray-500 text-sm">
              Latest saved academic records
            </p>

          </div>

          <button
            onClick={() => navigate("/results/saved")}
            className="text-blue-600 font-medium hover:underline"
          >
            View All
          </button>

        </div>

        <ResultTable
          loading={loading}
          compact
          results={results.slice(0, 5)}
          onView={(r) =>
            navigate(`/results/${r._id}`)
          }
          onEdit={(r) =>
            navigate(`/results/edit/${r._id}`)
          }
          onPDF={(r) =>
            navigate(`/results/${r._id}`)
          }
          onSend={(r) =>
            navigate(`/results/${r._id}`)
          }
          onDelete={() => {}}
        />

      </div>

    </div>
  );
}