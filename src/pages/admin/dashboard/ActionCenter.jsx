import { Link } from "react-router-dom";
import {
  Search,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Users,
  UserPlus,
  Wallet,
  ClipboardCheck,
  FileSpreadsheet,
  MessageSquare,
  Bot,
  Building2,
  Settings,
  BarChart3,
  CreditCard,
  UserRound,
} from "lucide-react";

const sections = [
  {
    title: "Admissions",
    description: "Student registration and management",
    color: "bg-blue-50",
    items: [
      {
        title: "Students",
        description: "View all students",
        icon: GraduationCap,
        to: "/students",
      },
      {
        title: "Register Student",
        description: "Create a new student",
        icon: UserPlus,
        to: "/students/add",
      },
    ],
  },

  {
    title: "Academics",
    description: "Attendance, results and classroom management",
    color: "bg-emerald-50",
    items: [
      {
        title: "Attendance",
        description: "Daily attendance records",
        icon: ClipboardCheck,
        to: "/attendance",
      },
      {
        title: "Results",
        description: "Manage examination results",
        icon: FileSpreadsheet,
        to: "/results",
      },
      {
        title: "Publish Results",
        description: "Release results",
        icon: FileSpreadsheet,
        to: "/results/publish",
      },
    ],
  },

  {
    title: "Finance",
    description: "Payments and fee management",
    color: "bg-orange-50",
    items: [
      {
        title: "Fees Dashboard",
        description: "Fee overview",
        icon: Wallet,
        to: "/fees",
      },
      {
        title: "Create Fee",
        description: "Create fee structure",
        icon: CreditCard,
        to: "/fees/create",
      },
    ],
  },

  {
    title: "Communication",
    description: "School-wide communication",
    color: "bg-purple-50",
    items: [
      {
        title: "Compose Message",
        description: "Send announcements",
        icon: MessageSquare,
        to: "/messages/compose",
      },
      {
        title: "Message History",
        description: "View sent messages",
        icon: MessageSquare,
        to: "/messages/history",
      },
    ],
  },

  {
    title: "Staff",
    description: "Teachers and parents",
    color: "bg-cyan-50",
    items: [
      {
        title: "Teachers",
        description: "Teacher management",
        icon: Users,
        to: "/teachers",
      },
      {
        title: "Parents",
        description: "Parent management",
        icon: UserRound,
        to: "/parents",
      },
    ],
  },

  {
    title: "Administration",
    description: "Reports, automation and settings",
    color: "bg-slate-100",
    items: [
      {
        title: "Reports",
        description: "Financial reports",
        icon: BarChart3,
        to: "/finance/reports",
      },
      {
        title: "Automation",
        description: "Automation center",
        icon: Bot,
        to: "/automations",
      },
      {
        title: "School Profile",
        description: "School information",
        icon: Building2,
        to: "/school-profile",
      },
      {
        title: "Settings",
        description: "Platform settings",
        icon: Settings,
        to: "/settings",
      },
    ],
  },
];

function StatCard({
  title,
  value,
  icon: Icon,
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900">
            {value}
          </h2>

        </div>

        <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center">

          <Icon
            size={28}
            className="text-blue-600"
          />

        </div>

      </div>

    </div>
  );
}

function ActionTile({
  action,
}) {
  const Icon = action.icon;

  return (
    <Link
      to={action.to}
      className="
      group
      flex
      items-center
      justify-between
      rounded-xl
      border
      border-slate-200
      bg-white
      p-4
      transition
      hover:border-blue-500
      hover:shadow-md
      "
    >

      <div className="flex items-center gap-4">

        <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center">

          <Icon
            size={22}
            className="text-blue-600"
          />

        </div>

        <div>

          <h3 className="font-semibold text-slate-800">

            {action.title}

          </h3>

          <p className="text-sm text-slate-500">

            {action.description}

          </p>

        </div>

      </div>

      <ArrowRight
        size={18}
        className="
        text-slate-400
        group-hover:text-blue-600
        group-hover:translate-x-1
        transition
        "
      />

    </Link>
  );
}

export default function ActionCenter() {

  return (

    <div className="space-y-8">

      {/* HERO */}

      <section className="rounded-3xl overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 p-10 text-white">

        <div className="flex flex-col lg:flex-row justify-between gap-8">

          <div>

            <div className="flex items-center gap-3">

              <Sparkles />

              <span className="uppercase tracking-widest text-sm">

                SchoolBridge Enterprise

              </span>

            </div>

            <h1 className="mt-5 text-4xl font-bold">

              Action Center

            </h1>

            <p className="mt-4 max-w-3xl text-blue-100 leading-8">

              Access every administrative operation from one
              centralized command center. Manage admissions,
              academics, finance, communication, teachers,
              parents, reports and school settings.

            </p>

          </div>

        </div>

      </section>

      {/* SEARCH */}

      <section className="rounded-3xl border bg-white p-6 shadow-sm">

        <div className="relative">

          <Search
            className="absolute left-4 top-4 text-slate-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search actions..."
            className="
            w-full
            rounded-xl
            border
            border-slate-200
            py-4
            pl-12
            pr-4
            outline-none
            focus:border-blue-500
            "
          />

        </div>

      </section>

      {/* STATS */}

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Departments"
          value="6"
          icon={Building2}
        />

        <StatCard
          title="Available Actions"
          value="15+"
          icon={Sparkles}
        />

        <StatCard
          title="Automation"
          value="Enabled"
          icon={Bot}
        />

        <StatCard
          title="Modules"
          value="12"
          icon={Settings}
        />

      </section>

            {/* ================= ACTION SECTIONS ================= */}

      <section className="space-y-8">

        {sections.map((section) => (

          <div
            key={section.title}
            className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden"
          >

            {/* Section Header */}

            <div
              className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-8 py-6 border-b border-slate-100 ${section.color}`}
            >

              <div>

                <h2 className="text-2xl font-bold text-slate-900">

                  {section.title}

                </h2>

                <p className="mt-2 text-slate-600">

                  {section.description}

                </p>

              </div>

              <div className="hidden lg:flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">

                <Sparkles
                  size={18}
                  className="text-blue-600"
                />

                <span className="text-sm font-medium text-slate-700">

                  {section.items.length} Actions

                </span>

              </div>

            </div>

            {/* Action Cards */}

            <div className="p-8">

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {section.items.map((action) => (

                  <ActionTile
                    key={action.title}
                    action={action}
                  />

                ))}

              </div>

            </div>

          </div>

        ))}

      </section>

      {/* ================= QUICK OVERVIEW ================= */}

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8">

          <h3 className="text-xl font-bold">

            Student Management

          </h3>

          <p className="mt-3 text-blue-100 leading-7">

            Register students, manage admissions,
            update profiles and monitor enrolment
            from one place.

          </p>

          <Link
            to="/students"
            className="mt-8 inline-flex items-center gap-2 font-semibold"
          >

            Open Module

            <ArrowRight size={18} />

          </Link>

        </div>

        <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-green-700 text-white p-8">

          <h3 className="text-xl font-bold">

            Academic Management

          </h3>

          <p className="mt-3 text-green-100 leading-7">

            Attendance, examinations, grading,
            publishing results and classroom
            administration.

          </p>

          <Link
            to="/results"
            className="mt-8 inline-flex items-center gap-2 font-semibold"
          >

            Open Module

            <ArrowRight size={18} />

          </Link>

        </div>

        <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 text-white p-8">

          <h3 className="text-xl font-bold">

            Finance Management

          </h3>

          <p className="mt-3 text-orange-100 leading-7">

            Collect fees, monitor outstanding
            balances and generate financial
            reports.

          </p>

          <Link
            to="/fees"
            className="mt-8 inline-flex items-center gap-2 font-semibold"
          >

            Open Module

            <ArrowRight size={18} />

          </Link>

        </div>

      </section>

            {/* ================= SYSTEM SHORTCUTS ================= */}

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Platform Status */}

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-8 py-6">

            <h2 className="text-xl font-bold text-slate-900">

              Platform Status

            </h2>

            <p className="mt-2 text-slate-500">

              Overview of your SchoolBridge workspace.

            </p>

          </div>

          <div className="p-8 space-y-5">

            <StatusItem
              title="Database"
              value="Connected"
              color="bg-emerald-500"
            />

            <StatusItem
              title="School Portal"
              value="Online"
              color="bg-blue-500"
            />

            <StatusItem
              title="Messaging"
              value="Active"
              color="bg-purple-500"
            />

            <StatusItem
              title="Automation"
              value="Running"
              color="bg-orange-500"
            />

          </div>

        </div>

        {/* Helpful Links */}

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-8 py-6">

            <h2 className="text-xl font-bold text-slate-900">

              Helpful Shortcuts

            </h2>

            <p className="mt-2 text-slate-500">

              Frequently visited administrator pages.

            </p>

          </div>

          <div className="p-8 grid grid-cols-1 gap-4">

            <ShortcutCard
              title="Manage Students"
              subtitle="Admissions"
              to="/students"
            />

            <ShortcutCard
              title="Manage Teachers"
              subtitle="Staff"
              to="/teachers"
            />

            <ShortcutCard
              title="Fee Dashboard"
              subtitle="Finance"
              to="/fees"
            />

            <ShortcutCard
              title="Message Center"
              subtitle="Communication"
              to="/messages"
            />

            <ShortcutCard
              title="Automation Center"
              subtitle="Automation"
              to="/automations"
            />

            <ShortcutCard
              title="School Settings"
              subtitle="Administration"
              to="/settings"
            />

          </div>

        </div>

      </section>

      {/* Footer */}

      <footer className="rounded-3xl bg-slate-900 text-white p-8">

        <div className="flex flex-col lg:flex-row justify-between gap-6">

          <div>

            <h2 className="text-2xl font-bold">

              SchoolBridge Enterprise

            </h2>

            <p className="mt-3 max-w-2xl text-slate-300 leading-7">

              Centralized school administration platform for
              admissions, academics, finance, communication,
              analytics and automation.

            </p>

          </div>

          <div className="flex items-center">

            <Link
              to="/dashboard"
              className="
              rounded-xl
              bg-blue-600
              px-6
              py-3
              font-semibold
              hover:bg-blue-700
              transition
              "
            >

              Return to Dashboard

            </Link>

          </div>

        </div>

      </footer>

    </div>

  );

}

/* ===========================================================
   COMPONENTS
=========================================================== */

function StatusItem({
  title,
  value,
  color,
}) {

  return (

    <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">

      <div className="flex items-center gap-4">

        <div
          className={`w-3 h-3 rounded-full ${color}`}
        />

        <span className="font-medium text-slate-700">

          {title}

        </span>

      </div>

      <span className="font-semibold text-slate-900">

        {value}

      </span>

    </div>

  );

}

function ShortcutCard({
  title,
  subtitle,
  to,
}) {

  return (

    <Link
      to={to}
      className="
      group
      flex
      items-center
      justify-between
      rounded-2xl
      border
      border-slate-200
      p-5
      hover:border-blue-500
      hover:shadow-md
      transition
      "
    >

      <div>

        <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition">

          {title}

        </h3>

        <p className="mt-1 text-sm text-slate-500">

          {subtitle}

        </p>

      </div>

      <ArrowRight
        size={18}
        className="
        text-slate-400
        group-hover:text-blue-600
        group-hover:translate-x-1
        transition
        "
      />

    </Link>

  );

}