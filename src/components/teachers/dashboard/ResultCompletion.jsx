import {
  CheckCircle2,
  Clock3,
  FileCheck2,
  FileText,
  TrendingUp,
} from "lucide-react";

export default function ResultCompletion({
  analytics = {},
}) {
  const stats = {
    completed: analytics.completed ?? 156,
    pending: analytics.pending ?? 24,
    drafts: analytics.drafts ?? 12,
    published: analytics.published ?? 144,
  };

  const total =
    stats.completed +
    stats.pending +
    stats.drafts;

  const completion =
    total > 0
      ? Math.round(
          (stats.completed / total) * 100
        )
      : 0;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

      {/* Header */}

      <div className="px-8 py-6 border-b bg-slate-50 flex justify-between items-center">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Result Completion
          </h2>

          <p className="text-slate-500 mt-1">
            Track grading progress across your assigned classes.
          </p>

        </div>

        <div className="flex items-center gap-3 bg-emerald-50 px-4 py-3 rounded-2xl">

          <TrendingUp
            size={22}
            className="text-emerald-600"
          />

          <div>

            <p className="text-xs text-slate-500">
              Completion
            </p>

            <h3 className="text-2xl font-bold text-emerald-600">
              {completion}%
            </h3>

          </div>

        </div>

      </div>

      {/* Main */}

      <div className="grid lg:grid-cols-3 gap-8 p-8">

        {/* Progress Circle */}

        <div className="flex flex-col items-center justify-center">

          <div className="relative w-44 h-44">

            <svg
              className="w-full h-full rotate-[-90deg]"
              viewBox="0 0 120 120"
            >
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="10"
              />

              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#2563eb"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={327}
                strokeDashoffset={
                  327 -
                  (327 * completion) / 100
                }
              />

            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">

              <h2 className="text-4xl font-bold text-slate-800">
                {completion}%
              </h2>

              <p className="text-slate-500 text-sm">
                Completed
              </p>

            </div>

          </div>

        </div>

        {/* Status Cards */}

        <div className="lg:col-span-2 grid md:grid-cols-2 gap-5">

          <StatusCard
            title="Completed"
            value={stats.completed}
            icon={
              <CheckCircle2 size={28} />
            }
            bg="bg-emerald-50"
            text="text-emerald-600"
          />

          <StatusCard
            title="Pending"
            value={stats.pending}
            icon={<Clock3 size={28} />}
            bg="bg-orange-50"
            text="text-orange-600"
          />

          <StatusCard
            title="Draft Results"
            value={stats.drafts}
            icon={<FileText size={28} />}
            bg="bg-purple-50"
            text="text-purple-600"
          />

          <StatusCard
            title="Published"
            value={stats.published}
            icon={
              <FileCheck2 size={28} />
            }
            bg="bg-blue-50"
            text="text-blue-600"
          />

        </div>

      </div>

      {/* Progress */}

      <div className="border-t px-8 py-6">

        <div className="flex justify-between mb-3">

          <span className="font-medium text-slate-700">
            Overall Result Progress
          </span>

          <span className="font-bold text-blue-600">
            {completion}%
          </span>

        </div>

        <div className="w-full h-4 rounded-full bg-slate-200 overflow-hidden">

          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 transition-all duration-700"
            style={{
              width: `${completion}%`,
            }}
          />

        </div>

      </div>

    </div>
  );
}

function StatusCard({
  title,
  value,
  icon,
  bg,
  text,
}) {
  return (
    <div className="border rounded-2xl p-6 hover:shadow-md transition">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-500">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-2 text-slate-800">
            {value}
          </h2>

        </div>

        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center ${bg} ${text}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}