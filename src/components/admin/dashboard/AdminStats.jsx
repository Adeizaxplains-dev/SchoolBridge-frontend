import {
  GraduationCap,
  Users,
  UserCheck,
  BookOpen,
  Wallet,
  ClipboardCheck,
  FileText,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

export default function AdminStats({
  analytics = {},
  financial = {},
}) {
  const stats = [
    {
      title: "Students",
      value: analytics.totalStudents || 0,
      subtitle: "Registered Students",
      icon: GraduationCap,
      color: "bg-blue-600",
      trend: "+8%",
    },
    {
      title: "Teachers",
      value: analytics.totalTeachers || 0,
      subtitle: "Academic Staff",
      icon: UserCheck,
      color: "bg-emerald-600",
      trend: "+2%",
    },
    {
      title: "Parents",
      value: analytics.totalParents || 0,
      subtitle: "Linked Parents",
      icon: Users,
      color: "bg-violet-600",
      trend: "+5%",
    },
    {
      title: "Classes",
      value: analytics.totalClasses || 0,
      subtitle: "Active Classes",
      icon: BookOpen,
      color: "bg-orange-600",
      trend: "Stable",
    },
    {
      title: "Revenue",
      value: `₦${(
        financial.totalRevenue || 0
      ).toLocaleString()}`,
      subtitle: "Collected Fees",
      icon: Wallet,
      color: "bg-green-600",
      trend: "+12%",
    },
    {
      title: "Attendance",
      value: `${analytics.attendanceRate || 0}%`,
      subtitle: "Today's Attendance",
      icon: ClipboardCheck,
      color: "bg-cyan-600",
      trend: "+3%",
    },
    {
      title: "Results",
      value: analytics.totalResults || 0,
      subtitle: "Published Results",
      icon: FileText,
      color: "bg-indigo-600",
      trend: "+15%",
    },
    {
      title: "Messages",
      value: analytics.messagesSent || 0,
      subtitle: "Messages Sent",
      icon: MessageSquare,
      color: "bg-pink-600",
      trend: "+9%",
    },
  ];

  return (
    <section className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            School Overview
          </h2>

          <p className="text-slate-500 mt-1">
            Live statistics across the school.
          </p>

        </div>

      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            {...stat}
          />
        ))}

      </div>

    </section>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  trend,
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Accent */}

      <div className={`absolute top-0 left-0 h-1 w-full ${color}`} />

      <div className="p-6">

        <div className="flex items-start justify-between">

          <div>

            <p className="text-sm font-medium text-slate-500">
              {title}
            </p>

            <h3 className="mt-3 text-3xl font-bold text-slate-900 break-words">
              {value}
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              {subtitle}
            </p>

          </div>

          <div
            className={`${color} rounded-2xl p-4 text-white shadow-lg`}
          >
            <Icon size={28} />
          </div>

        </div>

        <div className="mt-6 flex items-center justify-between border-t pt-4">

          <div className="flex items-center gap-2 text-emerald-600">

            <TrendingUp size={16} />

            <span className="text-sm font-semibold">
              {trend}
            </span>

          </div>

          <span className="text-xs text-slate-400">
            vs last month
          </span>

        </div>

      </div>

    </div>
  );
}