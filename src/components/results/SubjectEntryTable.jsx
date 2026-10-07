import {
  Plus,
  Trash2,
  BookOpen,
  Sparkles,
} from "lucide-react";

import ResultSubjectRow from "./ResultSubjectRow";

export default function SubjectEntryTable({
  subjects = [],
  updateSubject,
  addSubject,
  removeSubject,
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col gap-5 border-b border-slate-200 bg-gradient-to-r from-blue-50 via-white to-indigo-50 px-8 py-7 md:flex-row md:items-center md:justify-between">

        <div className="flex items-start gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">

            <BookOpen size={24} />

          </div>

          <div>

            <div className="flex items-center gap-3">

              <h2 className="text-xl font-bold text-slate-900">
                Subject Assessment
              </h2>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                {subjects.length} Subject{subjects.length !== 1 && "s"}
              </span>

            </div>

            <p className="mt-1 text-sm text-slate-500">
              Enter continuous assessment, examination scores and teacher comments.
            </p>

          </div>

        </div>

        <button
          onClick={addSubject}
          className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Subject
        </button>

      </div>

      {/* ================= EMPTY ================= */}

      {subjects.length === 0 ? (

        <div className="flex flex-col items-center justify-center py-20">

          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">

            <Sparkles
              size={34}
              className="text-blue-600"
            />

          </div>

          <h3 className="text-xl font-semibold text-slate-900">
            No Subjects Added
          </h3>

          <p className="mt-2 max-w-md text-center text-slate-500">
            Start building this student's report by adding the first subject.
          </p>

          <button
            onClick={addSubject}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            <Plus size={18} />
            Add First Subject
          </button>

        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1500px] table-fixed">

            {/* ================= HEADER ================= */}

            <thead className="sticky top-0 z-20 bg-slate-50">

              <tr className="border-b border-slate-200">

                <th className="w-64 px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                  Subject
                </th>

                <th className="w-24 px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-600">
                  CA1
                </th>

                <th className="w-24 px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-600">
                  CA2
                </th>

                <th className="w-24 px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-600">
                  CA3
                </th>

                <th className="w-24 px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-600">
                  Exam
                </th>

                <th className="w-24 px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-600">
                  Total
                </th>

                <th className="w-20 px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-600">
                  %
                </th>

                <th className="w-28 px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-600">
                  Grade
                </th>

                <th className="w-40 px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-600">
                  Remark
                </th>

                <th className="w-72 px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                  Teacher Comment
                </th>

                <th className="w-20 px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-600">
                  Action
                </th>

              </tr>

            </thead>

            {/* ================= BODY ================= */}

            <tbody>

              {subjects.map((subject, index) => (

                <ResultSubjectRow
                  key={subject._id || index}
                  index={index}
                  subject={subject}
                  onChange={updateSubject}
                  action={
                    <button
                      type="button"
                      onClick={() => removeSubject(index)}
                      disabled={subjects.length === 1}
                      className="rounded-xl p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:text-slate-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  }
                />

              ))}

            </tbody>

          </table>

        </div>

      )}

      {/* ================= FOOTER ================= */}

      {subjects.length > 0 && (

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 bg-slate-50 px-8 py-5">

          <div className="text-sm text-slate-600">

            Showing

            <span className="mx-1 font-bold text-slate-900">

              {subjects.length}

            </span>

            subject{subjects.length !== 1 && "s"}

          </div>

          <button
            onClick={addSubject}
            className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-5 py-2.5 font-medium text-blue-600 transition hover:bg-blue-50"
          >
            <Plus size={18} />
            Add Another Subject
          </button>

        </div>

      )}

    </div>
  );
}