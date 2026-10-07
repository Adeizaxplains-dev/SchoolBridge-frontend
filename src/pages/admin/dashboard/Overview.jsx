import {
  Users,
  Wallet,
  AlertTriangle,
  GraduationCap,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Activity,
  UserPlus,
  CreditCard,
  ClipboardCheck,
  FileSpreadsheet,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

export default function Overview({
  analytics,
  financial,
}) {
  const cards = [
    {
      title: "Students",
      value: analytics?.totalStudents || 0,
      icon: Users,
      color: "bg-blue-500",
      change: "+12%",
      positive: true,
    },
    {
      title: "Revenue",
      value: `₦${(
        financial?.totalRevenue || 0
      ).toLocaleString()}`,
      icon: Wallet,
      color: "bg-emerald-500",
      change: "+18%",
      positive: true,
    },
    {
      title: "Outstanding",
      value: `₦${(
        financial?.totalOutstanding || 0
      ).toLocaleString()}`,
      icon: AlertTriangle,
      color: "bg-red-500",
      change: "-4%",
      positive: false,
    },
    {
      title: "Graduates",
      value: analytics?.graduates || 0,
      icon: GraduationCap,
      color: "bg-violet-500",
      change: "+7%",
      positive: true,
    },
  ];

  const actions = [
    {
      title: "Register Student",
      icon: UserPlus,
    },
    {
      title: "Collect Fees",
      icon: CreditCard,
    },
    {
      title: "Take Attendance",
      icon: ClipboardCheck,
    },
    {
      title: "Publish Results",
      icon: FileSpreadsheet,
    },
    {
      title: "Send Message",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="space-y-8">

      {/* ================= HERO ================= */}

      <section className="rounded-3xl overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 text-white p-10 shadow-xl">

        <div className="flex flex-col lg:flex-row justify-between gap-8">

          <div>

            <p className="uppercase tracking-widest text-blue-100 text-sm">
              SchoolBridge Analytics
            </p>

            <h1 className="text-4xl font-bold mt-3">
              School Performance Overview
            </h1>

            <p className="mt-4 text-blue-100 max-w-2xl leading-8">
              Monitor student growth, financial performance,
              attendance, academic progress and operational
              activities from one centralized dashboard.
            </p>

          </div>

          <div className="flex items-center">

            <div className="bg-white/20 backdrop-blur rounded-3xl p-6">

              <TrendingUp size={70} />

            </div>

          </div>

        </div>

      </section>

      {/* ================= KPI ================= */}

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card) => {

          const Icon = card.icon;

          return (

            <div
              key={card.title}
              className="rounded-3xl border bg-white shadow-sm hover:shadow-xl transition p-6"
            >

              <div className="flex justify-between">

                <div>

                  <p className="text-slate-500 text-sm">
                    {card.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-4 text-slate-900">
                    {card.value}
                  </h2>

                </div>

                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white ${card.color}`}
                >

                  <Icon size={28} />

                </div>

              </div>

              <div className="mt-6 flex items-center gap-2">

                {card.positive ? (
                  <ArrowUpRight
                    size={18}
                    className="text-green-600"
                  />
                ) : (
                  <ArrowDownRight
                    size={18}
                    className="text-red-600"
                  />
                )}

                <span
                  className={`font-semibold ${
                    card.positive
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {card.change}
                </span>

                <span className="text-sm text-slate-500">
                  compared with last month
                </span>

              </div>

            </div>

          );

        })}

      </section>

      {/* ================= CONTENT ================= */}

      <section className="grid xl:grid-cols-3 gap-8">

        {/* Left */}

        <div className="xl:col-span-2 space-y-8">

          <div className="bg-white rounded-3xl border shadow-sm p-8">

            <div className="flex justify-between items-center">

              <div>

                <h2 className="text-2xl font-bold">
                  School Activity
                </h2>

                <p className="text-slate-500 mt-1">
                  Overall operational performance
                </p>

              </div>

              <Activity
                size={42}
                className="text-blue-600"
              />

            </div>

            <div className="mt-8">

              <div className="flex justify-between mb-2">

                <span className="font-medium">
                  School Performance
                </span>

                <span className="font-bold text-blue-600">
                  82%
                </span>

              </div>

              <div className="h-3 rounded-full bg-slate-200 overflow-hidden">

                <div className="bg-blue-600 h-full rounded-full w-[82%]" />

              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-10">

              <div className="rounded-2xl bg-blue-50 p-6">

                <p className="text-slate-500">
                  Attendance
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  96%
                </h3>

              </div>

              <div className="rounded-2xl bg-green-50 p-6">

                <p className="text-slate-500">
                  Fee Payment
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  84%
                </h3>

              </div>

              <div className="rounded-2xl bg-orange-50 p-6">

                <p className="text-slate-500">
                  Results Published
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  72%
                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="bg-white rounded-3xl border shadow-sm p-8">

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-xl font-bold">
                Quick Actions
              </h2>

              <p className="text-slate-500 mt-1">
                Frequently used shortcuts
              </p>

            </div>

          </div>

          <div className="space-y-4 mt-8">

            {actions.map((action) => {

              const Icon = action.icon;

              return (

                <button
                  key={action.title}
                  className="w-full flex items-center justify-between rounded-2xl border hover:bg-slate-50 transition p-4"
                >

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">

                      <Icon
                        size={22}
                        className="text-blue-700"
                      />

                    </div>

                    <span className="font-medium">
                      {action.title}
                    </span>

                  </div>

                  <ChevronRight size={18} />

                </button>

              );

            })}

          </div>

        </div>

      </section>

    </div>
  );
}