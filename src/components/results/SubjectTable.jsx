import ResultStatusBadge from "./ResultStatusBadge";

export default function SubjectTable({
  subjects = [],
  readonly = true,
}) {
  const getTotal = () =>
    subjects.reduce(
      (sum, s) => sum + Number(s.total || 0),
      0
    );

  const getAverage = () =>
    subjects.length ? getTotal() / subjects.length : 0;

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">

      {/* HEADER */}
      <div className="px-6 py-4 border-b bg-gray-50">

        <h2 className="text-lg font-semibold">
          Subject Breakdown
        </h2>

        <p className="text-sm text-gray-500">
          Performance per subject
        </p>

      </div>

      {/* TABLE WRAPPER */}
      <div className="overflow-x-auto">

        <table className="w-full min-w-[900px]">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">Subject</th>
              <th className="p-3 text-center">CA1</th>
              <th className="p-3 text-center">CA2</th>
              <th className="p-3 text-center">CA3</th>
              <th className="p-3 text-center">Exam</th>
              <th className="p-3 text-center">Total</th>
              <th className="p-3 text-center">%</th>
              <th className="p-3 text-center">Grade</th>
              <th className="p-3 text-center">Remark</th>

            </tr>

          </thead>

          <tbody>

            {subjects.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="text-center p-10 text-gray-500"
                >
                  No subjects found
                </td>
              </tr>
            ) : (
              subjects.map((subject, index) => (
                <tr
                  key={subject._id || index}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-3 font-medium">
                    {subject.subject || "-"}
                  </td>

                  <td className="p-3 text-center">
                    {subject.ca1 ?? 0}
                  </td>

                  <td className="p-3 text-center">
                    {subject.ca2 ?? 0}
                  </td>

                  <td className="p-3 text-center">
                    {subject.ca3 ?? 0}
                  </td>

                  <td className="p-3 text-center">
                    {subject.exam ?? 0}
                  </td>

                  <td className="p-3 text-center font-bold text-blue-600">
                    {Number(subject.total || 0).toFixed(0)}
                  </td>

                  <td className="p-3 text-center">
                    {Number(subject.percentage || subject.total || 0).toFixed(0)}%
                  </td>

                  <td className="p-3 text-center font-semibold">
                    <ResultStatusBadge status="published" />
                    <div className="text-xs mt-1">
                      {subject.grade || "-"}
                    </div>
                  </td>

                  <td className="p-3 text-center text-gray-600">
                    {subject.remark || "-"}
                  </td>

                </tr>
              ))
            )}

          </tbody>

          {/* SUMMARY FOOTER */}
          {subjects.length > 0 && (
            <tfoot className="bg-gray-50 border-t">

              <tr>

                <td className="p-3 font-bold text-right" colSpan={5}>
                  Summary
                </td>

                <td className="p-3 text-center font-bold text-blue-600">
                  {getTotal().toFixed(0)}
                </td>

                <td className="p-3 text-center font-bold text-green-600">
                  {getAverage().toFixed(2)}%
                </td>

                <td colSpan={2}></td>

              </tr>

            </tfoot>
          )}

        </table>

      </div>

    </div>
  );
}