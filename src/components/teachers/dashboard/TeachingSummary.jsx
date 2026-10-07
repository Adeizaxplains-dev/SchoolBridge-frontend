import {
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  Clock3,
} from "lucide-react";

export default function TeachingSummary({
  summary = {},
}) {
  const data = {
    lessonsCompleted:
      summary.lessonsCompleted ?? 26,
    assignmentsGiven:
      summary.assignmentsGiven ?? 14,
    assignmentsMarked:
      summary.assignmentsMarked ?? 109,
    averageScore:
      summary.averageScore ?? 78,
    teachingHours:
      summary.teachingHours ?? 32,
    attendanceRate:
      summary.attendanceRate ?? 96,
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

      {/* Header */}

      <div className="px-6 py-5 border-b bg-slate-50">

        <h2 className="text-xl font-bold text-slate-800">
          Teaching Summary
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Weekly teaching performance overview.
        </p>

      </div>

      {/* Stats */}

      <div className="p-6 grid gap-5">

        <SummaryRow
          icon={<BookOpen size={20} />}
          label="Lessons Completed"
          value={data.lessonsCompleted}
          color="blue"
        />

        <SummaryRow
          icon={<ClipboardCheck size={20} />}
          label="Assignments Given"
          value={data.assignmentsGiven}
          color="purple"
        />

        <SummaryRow
          icon={<GraduationCap size={20} />}
          label="Assignments Marked"
          value={data.assignmentsMarked}
          color="emerald"
        />

        <SummaryRow
          icon={<Clock3 size={20} />}
          label="Teaching Hours"
          value={`${data.teachingHours} hrs`}
          color="orange"
        />

      </div>

      {/* Divider */}

      <div className="border-t px-6 py-6 space-y-5">

        {/* Average Score */}

        <MetricProgress
          label="Average Student Score"
          value={data.averageScore}
          suffix="%"
          color="bg-blue-600"
        />

        {/* Attendance */}

        <MetricProgress
          label="Attendance Completion"
          value={data.attendanceRate}
          suffix="%"
          color="bg-emerald-600"
        />

      </div>

    </div>
  );
}

function SummaryRow({
  icon,
  label,
  value,
  color,
}) {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    emerald: "bg-emerald-100 text-emerald-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (
    <div className="flex justify-between items-center">

      <div className="flex items-center gap-4">

        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center ${colors[color]}`}
        >
          {icon}
        </div>

        <span className="font-medium text-slate-700">
          {label}
        </span>

      </div>

      <span className="text-xl font-bold text-slate-800">
        {value}
      </span>

    </div>
  );
}

function MetricProgress({
  label,
  value,
  suffix,
  color,
}) {
  return (
    <div>

      <div className="flex justify-between mb-2">

        <span className="text-sm font-medium text-slate-600">
          {label}
        </span>

        <span className="font-bold text-slate-800">
          {value}
          {suffix}
        </span>

      </div>

      <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">

        <div
          className={`${color} h-full rounded-full transition-all duration-700`}
          style={{
            width: `${value}%`,
          }}
        />

      </div>

    </div>
  );
}