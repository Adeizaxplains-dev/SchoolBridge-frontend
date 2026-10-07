import {
  CalendarCheck2,
  ClipboardPen,
  FileEdit,
  BookOpenCheck,
  CheckCheck,
  NotebookPen,
  MessageSquare,
  Clock3,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function TeacherQuickActions() {
  const actions = [
    {
      title: "Take Attendance",
      description: "Record today's class attendance",
      icon: CalendarCheck2,
      color: "from-blue-600 to-cyan-500",
      bg: "bg-blue-50",
      link: "/attendance",
    },
    {
      title: "Create Result",
      description: "Enter students examination scores",
      icon: ClipboardPen,
      color: "from-emerald-600 to-green-500",
      bg: "bg-emerald-50",
      link: "/results/create",
    },
    {
      title: "Edit Results",
      description: "Update previously submitted results",
      icon: FileEdit,
      color: "from-orange-500 to-amber-500",
      bg: "bg-orange-50",
      link: "/results",
    },
    {
      title: "Create Assignment",
      description: "Publish assignments for students",
      icon: NotebookPen,
      color: "from-purple-600 to-indigo-500",
      bg: "bg-purple-50",
      link: "/teacher/assignments/create",
    },
    {
      title: "Grade Assignment",
      description: "Review and score submissions",
      icon: CheckCheck,
      color: "from-pink-600 to-rose-500",
      bg: "bg-pink-50",
      link: "/teacher/assignments",
    },
    {
      title: "Lesson Notes",
      description: "Upload or manage lesson notes",
      icon: BookOpenCheck,
      color: "from-teal-600 to-cyan-500",
      bg: "bg-teal-50",
      link: "/teacher/lesson-notes",
    },
    {
      title: "Messages",
      description: "Communicate with students & parents",
      icon: MessageSquare,
      color: "from-sky-600 to-blue-500",
      bg: "bg-sky-50",
      link: "/messages",
    },
    {
      title: "Timetable",
      description: "View today's teaching schedule",
      icon: Clock3,
      color: "from-slate-700 to-slate-500",
      bg: "bg-slate-50",
      link: "/teacher/timetable",
    },
  ];

  return (
    <section className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Quick Actions
          </h2>

          <p className="text-slate-500 mt-1">
            Everything you need to manage your teaching activities.
          </p>
        </div>

        <Link
          to="/teacher/dashboard"
          className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
        >
          Dashboard

          <ArrowRight size={18} />
        </Link>

      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.link}
            className="group"
          >
            <div
              className={`${action.bg} relative overflow-hidden rounded-3xl border border-slate-200 p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >

              {/* Decorative */}

              <div
                className={`absolute top-0 right-0 w-28 h-28 rounded-full bg-gradient-to-br ${action.color} opacity-10`}
              />

              {/* Icon */}

              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${action.color} text-white flex items-center justify-center shadow-lg`}
              >
                <action.icon size={30} />
              </div>

              {/* Content */}

              <h3 className="mt-6 text-lg font-bold text-slate-800 group-hover:text-blue-700 transition">
                {action.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {action.description}
              </p>

              <div className="mt-6 flex items-center justify-between">

                <span className="text-sm font-semibold text-blue-600">
                  Open
                </span>

                <ArrowRight
                  size={18}
                  className="text-blue-600 transition-transform group-hover:translate-x-1"
                />

              </div>

            </div>
          </Link>
        ))}

      </div>

    </section>
  );
}