import {
  UserPlus,
  GraduationCap,
  Wallet,
  Bell,
  Users,
  ClipboardList,
  Calendar,
  Settings,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";

const actions = [
  {
    title: "Register Student",
    subtitle: "Admissions",
    icon: UserPlus,
    to: "/students/add",
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Publish Results",
    subtitle: "Academics",
    icon: GraduationCap,
    to: "/results/publish",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Collect Fees",
    subtitle: "Finance",
    icon: Wallet,
    to: "/fees/create",
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "Messages",
    subtitle: "Communication",
    icon: Bell,
    to: "/messages/compose",
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Teachers",
    subtitle: "Staff",
    icon: Users,
    to: "/teachers",
    color: "bg-cyan-50 text-cyan-600",
  },
  {
    title: "Attendance",
    subtitle: "Daily Records",
    icon: ClipboardList,
    to: "/attendance",
    color: "bg-teal-50 text-teal-600",
  },
  {
    title: "Calendar",
    subtitle: "Schedule",
    icon: Calendar,
    to: "/calendar",
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    title: "Settings",
    subtitle: "Configuration",
    icon: Settings,
    to: "/settings",
    color: "bg-slate-100 text-slate-700",
  },
];

export default function QuickActions() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-100 px-7 py-6">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center">

            <Sparkles size={22} />

          </div>

          <div>

            <h2 className="text-xl font-bold text-slate-900">
              Quick Actions
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Frequently used administrator shortcuts.
            </p>

          </div>

        </div>

        <Link
          to="/quick-actions"
          className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition"
        >
          View All
          <ArrowRight size={16} />
        </Link>

      </div>

      {/* Actions */}

      <div className="p-7">

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">

          {actions.map((action) => {

            const Icon = action.icon;

            return (

              <Link
                key={action.title}
                to={action.to}
                className="group rounded-2xl border border-slate-200 p-5 hover:border-blue-500 hover:shadow-lg transition-all duration-300 bg-white"
              >

                <div className="flex justify-between items-start">

                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${action.color}`}
                  >
                    <Icon size={26} />
                  </div>

                  <ArrowRight
                    size={18}
                    className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition"
                  />

                </div>

                <div className="mt-6">

                  <p className="text-xs uppercase tracking-wider text-slate-400">

                    {action.subtitle}

                  </p>

                  <h3 className="mt-2 text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition">

                    {action.title}

                  </h3>

                </div>

              </Link>

            );

          })}

        </div>

      </div>

    </section>
  );
}