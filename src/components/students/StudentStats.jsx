import {
  Users,
  UserCheck,
  UserX,
  GraduationCap,
  Clock3,
  Mars,
  Venus,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export default function StudentStats({
  stats = {},
  loading = false,
}) {
  const cards = [
    {
      title: "Total Students",
      value: stats.totalStudents || 0,
      icon: Users,
      color: "bg-blue-600",
      description: "Registered students",
      change: stats.totalChange ?? "+0%",
      positive: true,
    },
    {
      title: "Active Students",
      value: stats.activeStudents || 0,
      icon: UserCheck,
      color: "bg-emerald-600",
      description: "Currently active",
      change: stats.activeChange ?? "+0%",
      positive: true,
    },
    {
      title: "Pending Admission",
      value: stats.pendingAdmission || 0,
      icon: Clock3,
      color: "bg-amber-500",
      description: "Awaiting approval",
      change: stats.pendingChange ?? "0%",
      positive: false,
    },
    {
      title: "Graduated",
      value: stats.graduatedStudents || 0,
      icon: GraduationCap,
      color: "bg-purple-600",
      description: "Completed studies",
      change: stats.graduatedChange ?? "+0%",
      positive: true,
    },
    {
      title: "Male Students",
      value: stats.maleStudents || 0,
      icon: Mars,
      color: "bg-cyan-600",
      description: "Male enrolment",
      change: stats.maleChange ?? "0%",
      positive: true,
    },
    {
      title: "Female Students",
      value: stats.femaleStudents || 0,
      icon: Venus,
      color: "bg-pink-600",
      description: "Female enrolment",
      change: stats.femaleChange ?? "0%",
      positive: true,
    },
    {
      title: "Suspended",
      value: stats.suspendedStudents || 0,
      icon: UserX,
      color: "bg-red-600",
      description: "Disciplinary action",
      change: stats.suspendedChange ?? "0%",
      positive: false,
    },
  ];

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className="h-40 animate-pulse rounded-3xl bg-slate-200"
          />
        ))}
      </div>
    );
  }

  return (
    <section className="space-y-6">

      <div>

        <h2 className="text-2xl font-bold text-slate-900">
          Student Overview
        </h2>

        <p className="mt-1 text-slate-500">
          Live statistics across admissions and student records.
        </p>

      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

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
  icon: Icon,
  color,
  description,
  change,
  positive,
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div
        className={`absolute right-0 top-0 h-24 w-24 rounded-full ${color} opacity-10`}
      />

      <div className="p-6">

        <div className="flex items-start justify-between">

          <div>

            <p className="text-sm font-medium text-slate-500">
              {title}
            </p>

            <h3 className="mt-3 text-4xl font-bold text-slate-900">
              {value}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {description}
            </p>

          </div>

          <div
            className={`flex h-16 w-16 items-center justify-center rounded-2xl ${color} text-white shadow-lg`}
          >
            <Icon size={30} />
          </div>

        </div>

        <div className="mt-7 flex items-center justify-between">

          <div
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${
              positive
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"
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
            Since last month
          </span>

        </div>

      </div>

    </div>
  );
}