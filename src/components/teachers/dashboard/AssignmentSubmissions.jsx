import {
  FileText,
  CheckCircle2,
  Clock3,
  User,
  ArrowRight,
  Eye,
} from "lucide-react";

export default function AssignmentSubmissions({
  submissions = [],
}) {
  const demoSubmissions = [
    {
      id: 1,
      student: "Aisha Ibrahim",
      assignment: "Quadratic Equations",
      class: "SS2 Gold",
      submittedAt: "09:35 AM",
      score: null,
      status: "Pending",
    },
    {
      id: 2,
      student: "David Samuel",
      assignment: "Statistics Project",
      class: "SS3 Science",
      submittedAt: "08:42 AM",
      score: 88,
      status: "Graded",
    },
    {
      id: 3,
      student: "Fatima Bello",
      assignment: "Algebra Worksheet",
      class: "JSS3 Blue",
      submittedAt: "Yesterday",
      score: null,
      status: "Pending",
    },
    {
      id: 4,
      student: "John Peter",
      assignment: "Coordinate Geometry",
      class: "SS1 Red",
      submittedAt: "Yesterday",
      score: 74,
      status: "Graded",
    },
  ];

  const data =
    submissions.length > 0
      ? submissions
      : demoSubmissions;

  const pending = data.filter(
    (s) => s.status === "Pending"
  ).length;

  const graded = data.filter(
    (s) => s.status === "Graded"
  ).length;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

      {/* Header */}

      <div className="px-8 py-6 border-b bg-slate-50 flex justify-between items-center">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Assignment Submissions
          </h2>

          <p className="text-slate-500 mt-1">
            Recently submitted student assignments.
          </p>

        </div>

        <button className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700">

          View All

          <ArrowRight size={18} />

        </button>

      </div>

      {/* Summary */}

      <div className="grid grid-cols-2 border-b">

        <SummaryCard
          title="Pending Review"
          value={pending}
          color="text-orange-600"
        />

        <SummaryCard
          title="Graded"
          value={graded}
          color="text-emerald-600"
        />

      </div>

      {/* List */}

      <div className="divide-y">

        {data.map((submission) => (

          <div
            key={submission.id}
            className="px-8 py-6 hover:bg-slate-50 transition"
          >

            <div className="flex flex-col lg:flex-row justify-between gap-5">

              {/* Left */}

              <div className="flex gap-5">

                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">

                  <FileText size={24} />

                </div>

                <div>

                  <h3 className="font-bold text-slate-800">

                    {submission.assignment}

                  </h3>

                  <div className="mt-2 flex flex-wrap gap-5 text-sm text-slate-500">

                    <span className="flex items-center gap-2">

                      <User size={15} />

                      {submission.student}

                    </span>

                    <span>

                      {submission.class}

                    </span>

                    <span className="flex items-center gap-2">

                      <Clock3 size={15} />

                      {submission.submittedAt}

                    </span>

                  </div>

                </div>

              </div>

              {/* Right */}

              <div className="flex items-center gap-3">

                {submission.status ===
                "Pending" ? (
                  <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-semibold text-sm">
                    Pending
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-sm flex items-center gap-1">
                    <CheckCircle2
                      size={14}
                    />
                    {submission.score}%
                  </span>
                )}

                <button className="w-11 h-11 rounded-xl border border-slate-300 flex items-center justify-center hover:bg-blue-50 hover:border-blue-300 transition">

                  <Eye size={18} />

                </button>

                <button
                  className={`px-5 py-2 rounded-xl font-medium transition ${
                    submission.status ===
                    "Pending"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-slate-100 hover:bg-slate-200"
                  }`}
                >

                  {submission.status ===
                  "Pending"
                    ? "Grade"
                    : "View"}

                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

function SummaryCard({
  title,
  value,
  color,
}) {
  return (
    <div className="p-6">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h3
        className={`text-3xl font-bold mt-2 ${color}`}
      >
        {value}
      </h3>

    </div>
  );
}