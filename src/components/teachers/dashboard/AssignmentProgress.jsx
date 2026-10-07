import {
  ClipboardCheck,
  Clock3,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function AssignmentProgress({
  assignments = [],
}) {
  const demoAssignments = [
    {
      id: 1,
      title: "Algebra Assignment",
      class: "JSS 2A",
      submitted: 32,
      total: 40,
      dueDate: "Today",
    },
    {
      id: 2,
      title: "English Essay",
      class: "SS1",
      submitted: 26,
      total: 35,
      dueDate: "Tomorrow",
    },
    {
      id: 3,
      title: "Physics Practical",
      class: "SS3",
      submitted: 18,
      total: 30,
      dueDate: "2 Days",
    },
  ];

  const data =
    assignments.length > 0
      ? assignments
      : demoAssignments;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200">

      {/* Header */}

      <div className="px-6 py-5 border-b flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Assignment Progress
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Monitor submission completion
          </p>

        </div>

        <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center">

          <ClipboardCheck
            size={24}
            className="text-indigo-600"
          />

        </div>

      </div>

      {/* Content */}

      <div className="divide-y">

        {data.map((assignment) => {
          const progress = Math.round(
            (assignment.submitted /
              assignment.total) *
              100
          );

          return (
            <div
              key={assignment.id}
              className="p-6"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h3 className="font-semibold text-slate-800">
                    {assignment.title}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {assignment.class}
                  </p>

                </div>

                <div className="text-right">

                  <span className="text-lg font-bold text-slate-800">
                    {progress}%
                  </span>

                  <p className="text-xs text-slate-500">
                    Completed
                  </p>

                </div>

              </div>

              {/* Progress */}

              <div className="mt-5">

                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-full transition-all duration-700"
                    style={{
                      width: `${progress}%`,
                    }}
                  />

                </div>

              </div>

              {/* Footer */}

              <div className="mt-5 flex justify-between items-center">

                <div className="flex items-center gap-2 text-sm text-slate-600">

                  <CheckCircle2
                    size={16}
                    className="text-emerald-600"
                  />

                  {assignment.submitted} /{" "}
                  {assignment.total} Submitted

                </div>

                <div className="flex items-center gap-2">

                  {assignment.dueDate ===
                  "Today" ? (
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-medium">

                      <AlertTriangle size={14} />

                      Due Today

                    </span>
                  ) : (
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-medium">

                      <Clock3 size={14} />

                      {assignment.dueDate}

                    </span>
                  )}

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}