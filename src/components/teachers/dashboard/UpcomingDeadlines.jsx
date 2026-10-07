import {
  CalendarClock,
  ArrowRight,
  ClipboardList,
  FileSpreadsheet,
  BookOpen,
} from "lucide-react";

export default function UpcomingDeadlines({
  deadlines = [],
}) {
  const demoDeadlines = [
    {
      id: 1,
      title: "Submit Mid-Term Results",
      class: "SS2 Science",
      due: "Today • 4:00 PM",
      priority: "High",
      icon: FileSpreadsheet,
    },
    {
      id: 2,
      title: "Grade Mathematics Assignment",
      class: "JSS3 Gold",
      due: "Tomorrow",
      priority: "Medium",
      icon: ClipboardList,
    },
    {
      id: 3,
      title: "Upload Weekly Lesson Note",
      class: "All Classes",
      due: "Friday",
      priority: "Low",
      icon: BookOpen,
    },
  ];

  const items =
    deadlines.length > 0
      ? deadlines
      : demoDeadlines;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

      {/* Header */}

      <div className="flex justify-between items-center px-6 py-5 border-b bg-slate-50">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Upcoming Deadlines
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Important academic tasks awaiting completion.
          </p>

        </div>

        <CalendarClock
          className="text-blue-600"
          size={26}
        />

      </div>

      {/* List */}

      <div className="divide-y">

        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="p-5 hover:bg-slate-50 transition"
            >
              <div className="flex justify-between items-start gap-4">

                <div className="flex gap-4 flex-1">

                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Icon size={22} />
                  </div>

                  <div className="flex-1">

                    <h3 className="font-semibold text-slate-800">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      {item.class}
                    </p>

                    <div className="mt-3 flex items-center gap-3">

                      <span className="text-xs bg-slate-100 px-3 py-1 rounded-full text-slate-600">
                        {item.due}
                      </span>

                      <PriorityBadge
                        priority={item.priority}
                      />

                    </div>

                  </div>

                </div>

                <button className="text-blue-600 hover:text-blue-700">
                  <ArrowRight size={18} />
                </button>

              </div>
            </div>
          );
        })}

      </div>

      {/* Footer */}

      <div className="px-6 py-4 border-t bg-slate-50">

        <button className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3">
          View Full Academic Calendar
        </button>

      </div>

    </div>
  );
}

function PriorityBadge({ priority }) {
  const styles = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-emerald-100 text-emerald-600",
  };

  return (
    <span
      className={`text-xs px-3 py-1 rounded-full font-semibold ${
        styles[priority] || styles.Low
      }`}
    >
      {priority}
    </span>
  );
}