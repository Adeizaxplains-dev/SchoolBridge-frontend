import {
  School,
  CalendarDays,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

export default function AdminHero({
  analytics = {},
  financial = {},
}) {
  const schoolName =
    analytics.schoolName || "School Management System";

  const activeSession =
    analytics.currentSession || "2026/2027";

  const activeTerm =
    analytics.currentTerm || "First Term";

  const collectionRate =
    financial.totalRevenue > 0
      ? (
          (financial.totalRevenue /
            (financial.totalRevenue +
              (financial.totalOutstanding || 0))) *
          100
        ).toFixed(1)
      : "0";

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white shadow-xl">

      {/* Background Glow */}

      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 px-10 py-10">

        {/* LEFT */}

        <div className="max-w-3xl">

          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-2 text-sm">

            <ShieldCheck size={16} />

            Administrator Portal

          </div>

          <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight">

            Welcome Back

          </h1>

          <h2 className="mt-2 text-2xl font-semibold text-blue-100">

            {schoolName}

          </h2>

          <p className="mt-5 max-w-2xl text-blue-100 leading-8">

            Monitor school operations, manage students,
            staff, finance, attendance, examinations,
            messaging, and overall academic performance
            from one centralized dashboard.

          </p>

          <div className="mt-8 flex flex-wrap gap-5">

            <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">

              <School size={24} />

              <div>

                <p className="text-xs uppercase text-blue-200">

                  School

                </p>

                <p className="font-semibold">

                  {schoolName}

                </p>

              </div>

            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">

              <CalendarDays size={24} />

              <div>

                <p className="text-xs uppercase text-blue-200">

                  Session

                </p>

                <p className="font-semibold">

                  {activeSession}

                </p>

              </div>

            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">

              <TrendingUp size={24} />

              <div>

                <p className="text-xs uppercase text-blue-200">

                  Collection Rate

                </p>

                <p className="font-semibold">

                  {collectionRate}%

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="grid grid-cols-2 gap-5 w-full lg:w-auto">

          <HeroMetric
            title="Revenue"
            value={`₦${(
              financial.totalRevenue || 0
            ).toLocaleString()}`}
          />

          <HeroMetric
            title="Outstanding"
            value={`₦${(
              financial.totalOutstanding || 0
            ).toLocaleString()}`}
          />

          <HeroMetric
            title="Current Term"
            value={activeTerm}
          />

          <HeroMetric
            title="Students"
            value={
              analytics.totalStudents || 0
            }
          />

        </div>

      </div>

    </section>
  );
}

function HeroMetric({
  title,
  value,
}) {
  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/10 p-6 hover:bg-white/15 transition">

      <p className="text-sm text-blue-200">

        {title}

      </p>

      <h3 className="mt-3 text-2xl font-bold break-words">

        {value}

      </h3>

    </div>
  );
}