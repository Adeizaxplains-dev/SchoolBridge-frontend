import { MessageSquare } from "lucide-react";

export default function RemarksSection({
  teacherRemark,
  setTeacherRemark,
  principalRemark,
  setPrincipalRemark,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="text-blue-600" size={22} />
        <h2 className="text-xl font-semibold text-gray-800">
          Overall Remarks
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Teacher */}

        <div>

          <label className="block font-semibold text-gray-700 mb-2">
            Teacher's Remark
          </label>

          <textarea
            rows={6}
            value={teacherRemark}
            onChange={(e) =>
              setTeacherRemark(e.target.value)
            }
            placeholder="Write overall teacher's assessment..."
            className="
              w-full
              border
              border-gray-300
              rounded-xl
              p-4
              resize-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
            "
          />

          <p className="text-xs text-gray-400 mt-2">
            This remark appears on the final report card.
          </p>

        </div>

        {/* Principal */}

        <div>

          <label className="block font-semibold text-gray-700 mb-2">
            Principal's Remark
          </label>

          <textarea
            rows={6}
            value={principalRemark}
            onChange={(e) =>
              setPrincipalRemark(e.target.value)
            }
            placeholder="Write principal's final remark..."
            className="
              w-full
              border
              border-gray-300
              rounded-xl
              p-4
              resize-none
              focus:ring-2
              focus:ring-green-500
              focus:border-green-500
            "
          />

          <p className="text-xs text-gray-400 mt-2">
            Displayed below the teacher's remark.
          </p>

        </div>

      </div>

    </div>
  );
}