import useCreateResult from "../../hooks/useCreateResult";

import ResultTopBar from "../../components/results/ResultTopBar";
import StudentSelectorCard from "../../components/results/StudentSelectorCard";
import SubjectEntryTable from "../../components/results/SubjectEntryTable";
import ResultAnalytics from "../../components/results/ResultAnalytics";
import RemarksSection from "../../components/results/RemarksSection";
import StickySaveBar from "../../components/results/StickySaveBar";
import StudentMiniCard from "../../components/results/StudentMiniCard";

export default function CreateResult() {
  const {
    students,
    selectedStudent,
    setSelectedStudent,
    student,
    fetchStudent,

    session,
    setSession,
    term,
    setTerm,

    teacherRemark,
    setTeacherRemark,
    principalRemark,
    setPrincipalRemark,

    subjects,
    updateSubject,
    addSubject,
    removeSubject,

    totalScore,
    average,
    percentage,

    saveResult,
    loading,
  } = useCreateResult();

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Top Navigation */}

      <ResultTopBar
        onSave={saveResult}
        loading={loading}
      />

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* Hero */}

        <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white shadow-xl p-8">

          <div className="flex flex-col lg:flex-row justify-between gap-6">

            <div>

              <p className="uppercase tracking-widest text-blue-200 text-sm">
                Academic Management
              </p>

              <h1 className="text-4xl font-bold mt-2">
                Create Student Result
              </h1>

              <p className="text-blue-100 mt-3 max-w-2xl">
                Record continuous assessment scores, examination results,
                teacher comments and publish professionally formatted report
                cards.
              </p>

            </div>

            <div className="grid grid-cols-3 gap-4 self-start">

              <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">

                <div className="text-3xl font-bold">
                  {subjects.length}
                </div>

                <div className="text-xs text-blue-100">
                  Subjects
                </div>

              </div>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">

                <div className="text-3xl font-bold">
                  {average.toFixed(1)}
                </div>

                <div className="text-xs text-blue-100">
                  Average
                </div>

              </div>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">

                <div className="text-3xl font-bold">
                  {percentage.toFixed(0)}%
                </div>

                <div className="text-xs text-blue-100">
                  Performance
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Student Information */}

        <section className="bg-white rounded-3xl shadow-sm border border-gray-200">

          <div className="px-8 py-6 border-b">

            <h2 className="text-xl font-semibold">
              Student Information
            </h2>

            <p className="text-gray-500 mt-1">
              Select the student, session and academic term.
            </p>

          </div>

          <div className="p-8 space-y-8">

            <StudentSelectorCard
              students={students}
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
              fetchStudent={fetchStudent}
              term={term}
              setTerm={setTerm}
              session={session}
              setSession={setSession}
            />

            {student && (
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">

                <StudentMiniCard
                  student={{
                    passport: student.passport,
                    name: student.name,
                    admissionNumber: student.admissionNumber,
                    class: student.class,
                    parentPhone: student.parentPhone,
                  }}
                />

              </div>
            )}

          </div>

        </section>

        {/* Subject Scores */}

        <section className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">

          <div className="px-8 py-6 border-b">

            <h2 className="text-xl font-semibold">
              Subject Assessment
            </h2>

            <p className="text-gray-500 mt-1">
              Enter CA scores, examination marks and teacher comments.
            </p>

          </div>

          <div className="p-8">

            <SubjectEntryTable
              subjects={subjects}
              updateSubject={updateSubject}
              addSubject={addSubject}
              removeSubject={removeSubject}
            />

          </div>

        </section>

        {/* Analytics */}

        <section className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">

          <div className="px-8 py-6 border-b">

            <h2 className="text-xl font-semibold">
              Performance Summary
            </h2>

            <p className="text-gray-500 mt-1">
              Real-time statistics generated from the entered scores.
            </p>

          </div>

          <div className="p-8">

            <ResultAnalytics
              totalScore={totalScore}
              average={average}
              percentage={percentage}
              subjects={subjects}
            />

          </div>

        </section>

        {/* Remarks */}

        <section className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">

          <div className="px-8 py-6 border-b">

            <h2 className="text-xl font-semibold">
              Teacher & Principal Remarks
            </h2>

            <p className="text-gray-500 mt-1">
              Academic observations and recommendations.
            </p>

          </div>

          <div className="p-8">

            <RemarksSection
              teacherRemark={teacherRemark}
              setTeacherRemark={setTeacherRemark}
              principalRemark={principalRemark}
              setPrincipalRemark={setPrincipalRemark}
            />

          </div>

        </section>

      </div>

      <StickySaveBar
        totalScore={totalScore}
        average={average}
        percentage={percentage}
        loading={loading}
        onSave={saveResult}
      />

    </div>
  );
}