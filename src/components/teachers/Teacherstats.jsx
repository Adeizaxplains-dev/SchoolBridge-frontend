import {
  Users,
  UserCheck,
  UserMinus,
  UserX,
  UserPlus,
  UserRoundSearch,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const defaultStats = {
  totalTeachers: 0,
  activeTeachers: 0,
  onLeave: 0,
  suspended: 0,
  newTeachers: 0,
  unassignedTeachers: 0,

  totalTeachersChange: "0%",
  activeTeachersChange: "0%",
  onLeaveChange: "0%",
  suspendedChange: "0%",
  newTeachersChange: "0%",
  unassignedTeachersChange: "0%",
};

export default function TeacherStats({
  stats = defaultStats,
  loading = false,
}) {
  const cards = [
    {
      title: "Total Teachers",
      value: stats.totalTeachers,
      icon: Users,
      color: "bg-blue-600",
      description: "Registered teachers",
      change: stats.totalTeachersChange,
      positive: true,
    },
    {
      title: "Active Teachers",
      value: stats.activeTeachers,
      icon: UserCheck,
      color: "bg-emerald-600",
      description: "Currently active",
      change: stats.activeTeachersChange,
      positive: true,
    },
    {
      title: "On Leave",
      value: stats.onLeave,
      icon: UserMinus,
      color: "bg-amber-500",
      description: "Official leave",
      change: stats.onLeaveChange,
      positive: false,
    },
    {
      title: "Suspended",
      value: stats.suspended,
      icon: UserX,
      color: "bg-red-600",
      description: "Temporarily suspended",
      change: stats.suspendedChange,
      positive: false,
    },
    {
      title: "New Teachers",
      value: stats.newTeachers,
      icon: UserPlus,
      color: "bg-indigo-600",
      description: "Joined this month",
      change: stats.newTeachersChange,
      positive: true,
    },
    {
      title: "Unassigned",
      value: stats.unassignedTeachers,
      icon: UserRoundSearch,
      color: "bg-purple-600",
      description: "No class assigned",
      change: stats.unassignedTeachersChange,
      positive: false,
    },
  ];

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-slate-900">
          Teacher Overview
        </h2>

        <p className="text-slate-500">
          Monitor and manage all teachers across your school.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <StatCard
            key={card.title}
            {...card}
            loading={loading}
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
  loading,
}) {
  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm animate-pulse">
        <div className="h-5 w-32 rounded bg-slate-200" />
        <div className="mt-5 h-10 w-20 rounded bg-slate-200" />
        <div className="mt-4 h-4 w-40 rounded bg-slate-200" />
        <div className="mt-8 h-8 w-24 rounded-full bg-slate-200" />
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div
        className={`absolute right-0 top-0 h-28 w-28 rounded-full opacity-10 ${color}`}
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
            className={`flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg ${color}`}
          >
            <Icon size={30} />
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${
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

            <span>{change}</span>
          </div>

          <span className="text-xs text-slate-400">
            Compared to last month
          </span>
        </div>
      </div>
    </div>
  );
}