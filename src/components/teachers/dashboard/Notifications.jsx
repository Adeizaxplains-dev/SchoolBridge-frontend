import {
  Bell,
  AlertCircle,
  CheckCircle2,
  CalendarDays,
  BookOpen,
} from "lucide-react";

export default function Notifications({
  notifications = [],
}) {
  const demoNotifications = [
    {
      id: 1,
      type: "assignment",
      title: "25 students submitted Mathematics Assignment",
      time: "10 mins ago",
      priority: "normal",
    },
    {
      id: 2,
      type: "attendance",
      title: "Attendance for SS2A has not been completed",
      time: "30 mins ago",
      priority: "high",
    },
    {
      id: 3,
      type: "result",
      title: "Mid-term results awaiting publication",
      time: "2 hours ago",
      priority: "normal",
    },
    {
      id: 4,
      type: "meeting",
      title: "Staff meeting scheduled tomorrow by 9:00 AM",
      time: "Yesterday",
      priority: "low",
    },
  ];

  const items =
    notifications.length > 0
      ? notifications
      : demoNotifications;

  const getIcon = (type) => {
    switch (type) {
      case "assignment":
        return (
          <BookOpen className="text-blue-600" size={18} />
        );

      case "attendance":
        return (
          <AlertCircle className="text-orange-600" size={18} />
        );

      case "result":
        return (
          <CheckCircle2 className="text-green-600" size={18} />
        );

      case "meeting":
        return (
          <CalendarDays className="text-purple-600" size={18} />
        );

      default:
        return (
          <Bell className="text-slate-600" size={18} />
        );
    }
  };

  const badge = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-600";

      case "normal":
        return "bg-blue-100 text-blue-600";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

      {/* Header */}

      <div className="px-6 py-5 border-b bg-slate-50 flex justify-between items-center">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Notifications
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Recent updates from your classes.
          </p>

        </div>

        <div className="w-11 h-11 rounded-2xl bg-blue-100 flex items-center justify-center">

          <Bell
            className="text-blue-600"
            size={22}
          />

        </div>

      </div>

      {/* Notifications */}

      <div className="divide-y">

        {items.map((item) => (

          <div
            key={item.id}
            className="px-6 py-5 hover:bg-slate-50 transition flex gap-4"
          >

            <div className="mt-1">
              {getIcon(item.type)}
            </div>

            <div className="flex-1">

              <div className="flex justify-between gap-4">

                <h4 className="font-semibold text-slate-800 leading-6">
                  {item.title}
                </h4>

                <span
                  className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${badge(
                    item.priority
                  )}`}
                >
                  {item.priority}
                </span>

              </div>

              <p className="text-sm text-slate-500 mt-2">
                {item.time}
              </p>

            </div>

          </div>

        ))}

      </div>

      {/* Footer */}

      <div className="px-6 py-4 border-t bg-slate-50">

        <button className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 transition">
          View All Notifications
        </button>

      </div>

    </div>
  );
}