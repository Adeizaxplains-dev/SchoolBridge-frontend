import {
  Users,
  School,
  CalendarCheck,
  ClipboardCheck,
  TrendingUp,
  TrendingDown,
  BookOpen,
  FileCheck,
} from "lucide-react";

export default function TeacherStats({
  stats = {},
}) {
  const cards = [
    {
      title: "Students",
      value: stats.students || 0,
      icon: Users,
      color: "bg-blue-600",
      change: stats.studentChange ?? "+0%",
      positive: true,
      description: "Assigned students",
    },
    {
      title: "Classes",
      value: stats.classes || 0,
      icon: School,
      color: "bg-emerald-600",
      change: stats.classChange ?? "0%",
      positive: true,
      description: "Teaching classes",
    },
    {
      title: "Attendance Today",
      value: `${stats.attendanceRate || 0}%`,
      icon: CalendarCheck,
      color: "bg-purple-600",
      change: stats.attendanceChange ?? "+0%",
      positive: true,
      description: "Marked attendance",
    },
    {
      title: "Pending Results",
      value: stats.pendingResults || 0,
      icon: ClipboardCheck,
      color: "bg-orange-600",
      change: stats.pendingChange ?? "-0%",
      positive: false,
      description: "Awaiting submission",
    },
    {
      title: "Assignments",
      value: stats.assignments || 0,
      icon: BookOpen,
      color: "bg-cyan-600",
      change: stats.assignmentChange ?? "+0%",
      positive: true,
      description: "Created this term",
    },
    {
      title: "Ungraded",
      value: stats.ungraded || 0,
      icon: FileCheck,
      color: "bg-rose-600",
      change: stats.ungradedChange ?? "-0%",
      positive: false,
      description: "Need grading",
    },
  ];

  return (
    <section className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Teaching Overview
          </h2>

          <p className="text-slate-500 mt-1">
            Live statistics from your teaching workspace.
          </p>

        </div>

      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {cards.map((card) => (
          <StatCard
            key={card.title}
            {...card}
          />
        ))}

      </div>

    </section>
  );
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  color,
  change,
  positive,
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300">

      {/* Decorative */}

      <div
        className={`absolute top-0 right-0 w-24 h-24 opacity-10 rounded-full ${color}`}
      />

      <div className="p-7">

        <div className="flex justify-between items-start">

          <div>

            <p className="text-sm font-medium text-slate-500">
              {title}
            </p>

            <h3 className="text-4xl font-bold mt-3 text-slate-900">
              {value}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {description}
            </p>

          </div>

          <div
            className={`w-16 h-16 rounded-2xl ${color} text-white flex items-center justify-center shadow-lg`}
          >
            <Icon size={30} />
          </div>

        </div>

        <div className="mt-7 flex items-center justify-between">

          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
              positive
                ? "bg-emerald-100 text-emerald-700"
                : "bg-rose-100 text-rose-700"
            }`}
          >

            {positive ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}

            {change}

          </div>

          <span className="text-xs text-slate-400">
            Since last week
          </span>

        </div>

      </div>

    </div>
  );
}