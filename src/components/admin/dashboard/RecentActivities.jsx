import {
  UserPlus,
  Wallet,
  GraduationCap,
  CalendarCheck,
  Bell,
  CheckCircle2,
  Clock3,
  ArrowRight,
} from "lucide-react";

const defaultActivities = [
  {
    id: 1,
    type: "student",
    title: "New student registered",
    description: "Abdulrahman Ibrahim was admitted into JSS1.",
    time: "10 mins ago",
  },
  {
    id: 2,
    type: "payment",
    title: "School fee received",
    description: "₦85,000 received from Fatimah Musa.",
    time: "25 mins ago",
  },
  {
    id: 3,
    type: "result",
    title: "Results published",
    description: "Second Term Result for SS2 has been published.",
    time: "1 hour ago",
  },
  {
    id: 4,
    type: "attendance",
    title: "Attendance completed",
    description: "Attendance submitted by Mathematics Department.",
    time: "2 hours ago",
  },
  {
    id: 5,
    type: "announcement",
    title: "New announcement",
    description: "Holiday notice sent to all parents.",
    time: "Yesterday",
  },
];

const activityIcons = {
  student: {
    icon: UserPlus,
    bg: "bg-blue-100",
    text: "text-blue-600",
  },
  payment: {
    icon: Wallet,
    bg: "bg-emerald-100",
    text: "text-emerald-600",
  },
  result: {
    icon: GraduationCap,
    bg: "bg-purple-100",
    text: "text-purple-600",
  },
  attendance: {
    icon: CalendarCheck,
    bg: "bg-orange-100",
    text: "text-orange-600",
  },
  announcement: {
    icon: Bell,
    bg: "bg-pink-100",
    text: "text-pink-600",
  },
};

export default function RecentActivities({
  activities = defaultActivities,
}) {
  return (
    <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

      {/* Header */}

      <div className="px-8 py-6 border-b bg-gradient-to-r from-slate-50 to-blue-50">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              Recent Activities
            </h2>

            <p className="text-slate-500 mt-1">
              Everything happening across your school today.
            </p>

          </div>

          <button className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition">

            Activity Log

            <ArrowRight size={18} />

          </button>

        </div>

      </div>

      {/* Timeline */}

      <div className="divide-y divide-slate-100">

        {activities.map((activity) => {
          const config =
            activityIcons[activity.type] ||
            activityIcons.student;

          const Icon = config.icon;

          return (
            <div
              key={activity.id}
              className="px-8 py-6 hover:bg-slate-50 transition"
            >

              <div className="flex gap-5">

                {/* Icon */}

                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${config.bg}`}
                >

                  <Icon
                    size={24}
                    className={config.text}
                  />

                </div>

                {/* Content */}

                <div className="flex-1">

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">

                    <div>

                      <h3 className="font-semibold text-slate-800">

                        {activity.title}

                      </h3>

                      <p className="text-slate-500 mt-1">

                        {activity.description}

                      </p>

                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-400">

                      <Clock3 size={15} />

                      {activity.time}

                    </div>

                  </div>

                  <div className="mt-4 flex items-center gap-2 text-emerald-600 text-sm font-medium">

                    <CheckCircle2 size={16} />

                    Successfully completed

                  </div>

                </div>

              </div>

            </div>
          );
        })}

      </div>
    </section>
  );
}