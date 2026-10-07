import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  ClipboardList,
  CalendarDays,
} from "lucide-react";

export default function PendingTasks({
  tasks = [],
}) {
  const defaultTasks = [
    {
      id: 1,
      title: "Grade Mathematics Assignment",
      class: "SS2 Gold",
      due: "Today • 4:00 PM",
      priority: "High",
      status: "Pending",
    },
    {
      id: 2,
      title: "Complete Attendance Record",
      class: "JSS1 Blue",
      due: "Today • 2:00 PM",
      priority: "Medium",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Upload Continuous Assessment",
      class: "SS1 Science",
      due: "Tomorrow",
      priority: "High",
      status: "Pending",
    },
    {
      id: 4,
      title: "Review Student Project",
      class: "JSS3",
      due: "Friday",
      priority: "Low",
      status: "Pending",
    },
  ];

  const data = tasks.length ? tasks : defaultTasks;

  const priorityStyle = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-emerald-100 text-emerald-700",
  };

  const statusIcon = (status) => {
    if (status === "Completed")
      return (
        <CheckCircle2
          size={18}
          className="text-emerald-600"
        />
      );

    if (status === "In Progress")
      return (
        <Clock3
          size={18}
          className="text-amber-600"
        />
      );

    return (
      <AlertTriangle
        size={18}
        className="text-red-500"
      />
    );
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm">

      {/* Header */}

      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">

        <div>

          <h2 className="text-lg font-bold text-slate-800">
            Pending Tasks
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Tasks requiring your attention.
          </p>

        </div>

        <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">

          <ClipboardList
            size={22}
            className="text-red-600"
          />

        </div>

      </div>

      {/* Task List */}

      <div className="divide-y divide-slate-100">

        {data.map((task) => (

          <div
            key={task.id}
            className="p-5 hover:bg-slate-50 transition"
          >

            <div className="flex items-start justify-between gap-4">

              <div className="flex gap-3">

                <div className="mt-1">
                  {statusIcon(task.status)}
                </div>

                <div>

                  <h3 className="font-semibold text-slate-800">
                    {task.title}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {task.class}
                  </p>

                  <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">

                    <CalendarDays size={14} />

                    <span>{task.due}</span>

                  </div>

                </div>

              </div>

              <div className="text-right">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    priorityStyle[task.priority]
                  }`}
                >
                  {task.priority}
                </span>

                <p className="text-xs text-slate-500 mt-3">
                  {task.status}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Footer */}

      <div className="px-6 py-4 border-t border-slate-100">

        <button className="w-full rounded-xl bg-slate-900 text-white py-3 text-sm font-semibold hover:bg-slate-800 transition">

          View All Tasks

        </button>

      </div>

    </div>
  );
}