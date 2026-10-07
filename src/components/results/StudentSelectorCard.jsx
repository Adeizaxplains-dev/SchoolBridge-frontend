import { Search, Calendar, GraduationCap } from "lucide-react";

export default function StudentSelectorCard({
  students = [],
  selectedStudent,
  setSelectedStudent,
  fetchStudent,
  term,
  setTerm,
  session,
  setSession,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

      <div className="flex items-center gap-2 mb-6">
        <GraduationCap className="text-blue-600" size={22} />
        <h2 className="text-lg font-semibold">
          Student & Academic Information
        </h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">

        {/* Student */}

        <div>

          <label className="block text-sm font-medium text-gray-600 mb-2">
            Student
          </label>

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-3 text-gray-400"
            />

            <select
              value={selectedStudent}
              onChange={(e) => {
                setSelectedStudent(e.target.value);
                fetchStudent(e.target.value);
              }}
              className="
                w-full
                h-11
                pl-10
                pr-3
                rounded-xl
                border
                border-gray-300
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
                outline-none
              "
            >
              <option value="">
                Select Student
              </option>

              {students.map((student) => (
                <option
                  key={student._id}
                  value={student._id}
                >
                  {student.name}
                </option>
              ))}
            </select>

          </div>

        </div>

        {/* Term */}

        <div>

          <label className="block text-sm font-medium text-gray-600 mb-2">
            Academic Term
          </label>

          <select
            value={term}
            onChange={(e) =>
              setTerm(e.target.value)
            }
            className="
              w-full
              h-11
              rounded-xl
              border
              border-gray-300
              focus:ring-2
              focus:ring-blue-500
              outline-none
            "
          >
            <option>
              First Term
            </option>

            <option>
              Second Term
            </option>

            <option>
              Third Term
            </option>

          </select>

        </div>

        {/* Session */}

        <div>

          <label className="block text-sm font-medium text-gray-600 mb-2">
            Academic Session
          </label>

          <div className="relative">

            <Calendar
              size={18}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              value={session}
              onChange={(e) =>
                setSession(e.target.value)
              }
              placeholder="2026/2027"
              className="
                w-full
                h-11
                pl-10
                rounded-xl
                border
                border-gray-300
                focus:ring-2
                focus:ring-blue-500
                outline-none
              "
            />

          </div>

        </div>

      </div>

    </div>
  );
}