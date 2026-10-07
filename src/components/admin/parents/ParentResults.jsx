import ParentResultHeader from "./ParentResultHeader";
import ResultActionBar from "./ResultActionBar";
import ResultSummaryCards from "../../results/ResultSummaryCards";
import ResultPerformanceChart from "../../results/ResultPerformanceChart";
import SubjectResultsTable from "./SubjectResultsTable";

export default function ParentResults({
  result,
  student,
}) {
  if (!result) {
    return (
      <div className="bg-white rounded-3xl shadow-lg border p-12 text-center">
        <h2 className="text-2xl font-bold text-slate-700">
          No Result Available
        </h2>

        <p className="mt-3 text-slate-500">
          The school has not published this result yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Student Header */}

      <ParentResultHeader
        student={student}
        result={result}
      />

      {/* Action Buttons */}

      <ResultActionBar
        resultId={result._id}
      />

      {/* Summary */}

      <ResultSummaryCards
        result={result}
      />

      {/* Chart */}

      <ResultPerformanceChart
        subjects={result.subjects || []}
      />

      {/* Subject Table */}

      <SubjectResultsTable
        subjects={result.subjects || []}
      />

      {/* Remarks */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-3xl shadow-lg border p-6">

          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Teacher's Remark
          </h2>

          <div className="rounded-2xl bg-slate-50 p-5">

            <p className="text-slate-700 leading-7">
              {result.teacherRemark ||
                "No teacher remark available."}
            </p>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-lg border p-6">

          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Principal's Remark
          </h2>

          <div className="rounded-2xl bg-slate-50 p-5">

            <p className="text-slate-700 leading-7">
              {result.principalRemark ||
                "No principal remark available."}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}