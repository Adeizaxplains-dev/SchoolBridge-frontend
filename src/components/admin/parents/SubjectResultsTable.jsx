import {
  CheckCircle2,
  AlertTriangle,
  BookOpen,
} from "lucide-react";

const gradeColor = (grade) => {
  switch (grade) {
    case "A":
      return "bg-emerald-100 text-emerald-700";
    case "B":
      return "bg-blue-100 text-blue-700";
    case "C":
      return "bg-amber-100 text-amber-700";
    case "D":
      return "bg-orange-100 text-orange-700";
    default:
      return "bg-red-100 text-red-700";
  }
};

const remarkColor = (remark = "") => {
  const text = remark.toLowerCase();

  if (
    text.includes("excellent") ||
    text.includes("good") ||
    text.includes("pass")
  ) {
    return "text-emerald-600";
  }

  return "text-red-600";
};

function Info({ label, value }) {
  return (
    <div className="bg-slate-50 rounded-xl p-3">
      <p className="text-xs text-slate-500">{label}</p>

      <p className="font-semibold text-slate-800 mt-1">
        {value ?? "-"}
      </p>
    </div>
  );
}

export default function SubjectResultsTable({
  subjects = [],
}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg border overflow-hidden">

      {/* Header */}

      <div className="px-8 py-6 border-b bg-slate-50">

        <div className="flex items-center gap-3">
          <BookOpen className="text-indigo-600" />

          <h2 className="text-2xl font-bold text-slate-800">
            Subject Performance
          </h2>
        </div>

        <p className="text-slate-500 mt-2">
          Academic performance across all registered subjects.
        </p>

      </div>

      {/* Desktop */}

      <div className="hidden lg:block overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr className="text-slate-700">

              <th className="px-6 py-4 text-left">Subject</th>
              <th className="text-center">CA1</th>
              <th className="text-center">CA2</th>
              <th className="text-center">CA3</th>
              <th className="text-center">Exam</th>
              <th className="text-center">Total</th>
              <th className="text-center">Grade</th>
              <th className="text-center">Progress</th>
              <th className="text-center">Remark</th>
              <th className="px-6 py-4 text-left">
                Teacher Comment
              </th>

            </tr>

          </thead>

          <tbody>

            {subjects.map((subject, index) => (

              <tr
                key={subject._id || index}
                className="border-b hover:bg-slate-50"
              >

                <td className="px-6 py-5 font-semibold">
                  {subject.subject}
                </td>

                <td className="text-center">
                  {subject.ca1}
                </td>

                <td className="text-center">
                  {subject.ca2}
                </td>

                <td className="text-center">
                  {subject.ca3}
                </td>

                <td className="text-center">
                  {subject.exam}
                </td>

                <td className="text-center font-bold text-indigo-700">
                  {subject.total}
                </td>

                <td className="text-center">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${gradeColor(
                      subject.grade
                    )}`}
                  >
                    {subject.grade}
                  </span>

                </td>

                <td className="px-6">

                  <div className="flex items-center gap-3">

                    <div className="flex-1 bg-slate-200 rounded-full h-3 overflow-hidden">

                      <div
                        className="h-full bg-gradient-to-r from-indigo-600 to-cyan-500"
                        style={{
                          width: `${subject.total || 0}%`,
                        }}
                      />

                    </div>

                    <span className="font-medium text-sm">
                      {subject.total}%
                    </span>

                  </div>

                </td>

                <td
                  className={`text-center font-medium ${remarkColor(
                    subject.remark
                  )}`}
                >
                  {subject.remark}
                </td>

                <td className="px-6 text-slate-600">
                  {subject.teacherComment || "-"}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile */}

      <div className="lg:hidden p-5 space-y-5">

        {subjects.map((subject, index) => (

          <div
            key={subject._id || index}
            className="border rounded-2xl p-5 shadow-sm"
          >

            <div className="flex justify-between items-center">

              <h3 className="font-bold">
                {subject.subject}
              </h3>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${gradeColor(
                  subject.grade
                )}`}
              >
                {subject.grade}
              </span>

            </div>

            <div className="grid grid-cols-2 gap-3 mt-5">

              <Info label="CA1" value={subject.ca1} />
              <Info label="CA2" value={subject.ca2} />
              <Info label="CA3" value={subject.ca3} />
              <Info label="Exam" value={subject.exam} />
              <Info label="Total" value={subject.total} />
              <Info label="Remark" value={subject.remark} />

            </div>

            <div className="mt-5">

              <div className="flex justify-between mb-2">

                <span className="text-sm text-slate-500">
                  Performance
                </span>

                <span className="font-semibold">
                  {subject.total}%
                </span>

              </div>

              <div className="bg-slate-200 h-3 rounded-full overflow-hidden">

                <div
                  className="bg-gradient-to-r from-indigo-600 to-cyan-500 h-full"
                  style={{
                    width: `${subject.total || 0}%`,
                  }}
                />

              </div>

            </div>

            <div className="mt-5 flex gap-3">

              {subject.total >= 50 ? (
                <CheckCircle2 className="text-emerald-500 mt-1" />
              ) : (
                <AlertTriangle className="text-red-500 mt-1" />
              )}

              <div>

                <p className="text-sm text-slate-500">
                  Teacher Comment
                </p>

                <p className="text-slate-700 mt-1">
                  {subject.teacherComment || "-"}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}