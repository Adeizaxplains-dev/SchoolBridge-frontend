import StudentMiniCard from "./StudentMiniCard";
import ResultStatusBadge from "./ResultStatusBadge";
import ResultActionMenu from "./ResultActionMenu";

export default function ResultTable({
  results = [],
  loading = false,
  onView,
  onEdit,
  onSend,
  onPDF,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-12 text-center text-gray-500">
        Loading results...
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="bg-white rounded-xl shadow p-12 text-center text-gray-500">
        No Results Found
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      {/* 🔥 TABLE SCROLL WRAPPER */}
      <div className="overflow-x-auto">

        <table className="w-full min-w-[900px]">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">Student</th>
              <th className="p-4 text-left">Class</th>
              <th className="p-4 text-left">Term</th>
              <th className="p-4 text-left">Session</th>
              <th className="p-4 text-center">Average</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-right">Actions</th>

            </tr>

          </thead>

          <tbody>

            {results.map((result) => (
              <tr
                key={result._id}
                className="border-t hover:bg-gray-50"
              >

                {/* Student */}
                <td className="p-4">
                  <StudentMiniCard
                    student={{
                      passport: result.studentPassport,
                      name: result.studentName,
                      admissionNumber: result.admissionNumber,
                      class: result.className,
                      parentPhone: result.parentPhone,
                    }}
                  />
                </td>

                {/* Class */}
                <td className="p-4">
                  {result.className}
                </td>

                {/* Term */}
                <td className="p-4">
                  {result.term}
                </td>

                {/* Session */}
                <td className="p-4">
                  {result.session}
                </td>

                {/* Average */}
                <td className="p-4 text-center font-semibold">
                  {Number(result.average || 0).toFixed(1)}
                </td>

                {/* Status */}
                <td className="p-4 text-center">
                  <ResultStatusBadge status={result.status} />
                </td>

                {/* Actions */}
                <td className="p-4 text-right">
                  <ResultActionMenu
                    onView={() => onView?.(result)}
                    onEdit={() => onEdit?.(result)}
                    onSend={() => onSend?.(result)}
                    onPDF={() => onPDF?.(result)}
                    onDelete={() => onDelete?.(result)}
                  />
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}