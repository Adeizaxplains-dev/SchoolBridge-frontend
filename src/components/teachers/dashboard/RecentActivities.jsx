import {
  Activity,
  CheckCircle2,
  ClipboardCheck,
  FileSpreadsheet,
  CalendarCheck,
  Bell,
  ArrowRight,
} from "lucide-react";

export default function RecentActivities({
  activities = [],
}) {
  const demoActivities = [
    {
      id: 1,
      title: "Results Uploaded",
      description:
        "Mathematics results for SS2 Science were successfully uploaded.",
      time: "15 mins ago",
      type: "result",
    },
    {
      id: 2,
      title: "Attendance Completed",
      description:
        "Attendance marked for JSS3 Gold.",
      time: "1 hour ago",
      type: "attendance",
    },
    {
      id: 3,
      title: "Assignment Graded",
      description:
        "Essay assignment for English Language has been graded.",
      time: "Yesterday",
      type: "assignment",
    },
    {
      id: 4,
      title: "Announcement Sent",
      description:
        "Parents notified about next week's PTA meeting.",
      time: "2 days ago",
      type: "notification",
    },
  ];

  const items =
    activities.length > 0
      ? activities
      : demoActivities;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

      {/* Header */}

      <div className="flex justify-between items-center px-6 py-5 border-b bg-slate-50">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Recent Activities
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Your latest teaching actions across the platform.
          </p>

        </div>

        <Activity
          className="text-blue-600"
          size={24}
        />

      </div>

      {/* Timeline */}

      <div className="relative">

        {items.map((item, index) => (
          <div
            key={item.id}
            className="relative flex gap-5 px-6 py-6 hover:bg-slate-50 transition"
          >
            {/* Timeline */}

            <div className="relative flex flex-col items-center">

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBackground(
                  item.type
                )}`}
              >
                {renderIcon(item.type)}
              </div>

              {index !== items.length - 1 && (
                <div className="w-px flex-1 bg-slate-200 mt-2" />
              )}

            </div>

            {/* Content */}

            <div className="flex-1">

              <div className="flex justify-between items-start gap-4">

                <div>

                  <h3 className="font-semibold text-slate-800">
                    {item.title}
                  </h3>

                  <p className="text-slate-500 mt-2 leading-6">
                    {item.description}
                  </p>

                </div>

                <span className="text-xs text-slate-400 whitespace-nowrap">
                  {item.time}
                </span>

              </div>

            </div>

          </div>
        ))}

      </div>

      {/* Footer */}

      <div className="border-t bg-slate-50 px-6 py-4">

        <button className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition">
          View Activity History
          <ArrowRight size={17} />
        </button>

      </div>

    </div>
  );
}

/* ========================================= */

function renderIcon(type) {
  switch (type) {
    case "attendance":
      return (
        <CalendarCheck
          size={22}
          className="text-green-600"
        />
      );

    case "assignment":
      return (
        <ClipboardCheck
          size={22}
          className="text-purple-600"
        />
      );

    case "notification":
      return (
        <Bell
          size={22}
          className="text-amber-600"
        />
      );

    case "result":
    default:
      return (
        <FileSpreadsheet
          size={22}
          className="text-blue-600"
        />
      );
  }
}

function iconBackground(type) {
  switch (type) {
    case "attendance":
      return "bg-green-100";

    case "assignment":
      return "bg-purple-100";

    case "notification":
      return "bg-amber-100";

    case "result":
    default:
      return "bg-blue-100";
  }
}