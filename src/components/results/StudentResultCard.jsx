import {
  User,
  Award,
  FileText,
  MessageCircle,
  Edit,
} from "lucide-react";

export default function StudentResultCard({
  student,
  result,
  onEdit,
  onSendWhatsApp,
  onGeneratePDF,
}) {
  const getPerformanceColor = (
    percentage
  ) => {
    if (percentage >= 75)
      return "bg-green-100 text-green-700";

    if (percentage >= 60)
      return "bg-blue-100 text-blue-700";

    if (percentage >= 50)
      return "bg-yellow-100 text-yellow-700";

    return "bg-red-100 text-red-700";
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

      {/* HEADER */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-24 relative">

        <div className="absolute left-6 top-10">

          <img
            src={
              student?.passport ||
              "/avatar.png"
            }
            alt="student"
            className="
              w-24
              h-24
              rounded-full
              border-4
              border-white
              object-cover
              bg-white
            "
          />

        </div>

      </div>

      {/* BODY */}

      <div className="pt-14 px-6 pb-6">

        <div className="flex justify-between items-start">

          <div>

            <h2 className="text-xl font-bold text-gray-900">
              {student?.name}
            </h2>

            <p className="text-gray-500">
              Admission No:
              {" "}
              {student?.admissionNumber}
            </p>

          </div>

          <span
            className={`
              px-3
              py-1
              rounded-full
              text-sm
              font-semibold
              ${getPerformanceColor(
                result?.percentage || 0
              )}
            `}
          >
            {result?.percentage || 0}%
          </span>

        </div>

        {/* DETAILS */}

        <div className="grid md:grid-cols-2 gap-4 mt-6">

          <div className="bg-gray-50 rounded-xl p-4">

            <p className="text-xs text-gray-500 uppercase">
              Class
            </p>

            <h4 className="font-semibold">
              {result?.className}
            </h4>

          </div>

          <div className="bg-gray-50 rounded-xl p-4">

            <p className="text-xs text-gray-500 uppercase">
              Session
            </p>

            <h4 className="font-semibold">
              {result?.session}
            </h4>

          </div>

          <div className="bg-gray-50 rounded-xl p-4">

            <p className="text-xs text-gray-500 uppercase">
              Term
            </p>

            <h4 className="font-semibold">
              {result?.term}
            </h4>

          </div>

          <div className="bg-gray-50 rounded-xl p-4">

            <p className="text-xs text-gray-500 uppercase">
              Position
            </p>

            <h4 className="font-semibold">
              {result?.position || "-"}
            </h4>

          </div>

        </div>

        {/* PERFORMANCE */}

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="bg-blue-50 rounded-xl p-4">

            <p className="text-sm text-gray-500">
              Total Score
            </p>

            <h3 className="text-2xl font-bold text-blue-700">
              {result?.totalScore || 0}
            </h3>

          </div>

          <div className="bg-green-50 rounded-xl p-4">

            <p className="text-sm text-gray-500">
              Average
            </p>

            <h3 className="text-2xl font-bold text-green-700">
              {result?.average || 0}
            </h3>

          </div>

          <div className="bg-purple-50 rounded-xl p-4">

            <p className="text-sm text-gray-500">
              Subjects
            </p>

            <h3 className="text-2xl font-bold text-purple-700">
              {
                result?.subjects
                  ?.length
              }
            </h3>

          </div>

        </div>

        {/* REMARKS */}

        <div className="mt-6 space-y-3">

          <div className="bg-gray-50 rounded-xl p-4">

            <p className="text-sm font-semibold mb-2">
              Teacher Remark
            </p>

            <p className="text-gray-600">
              {result?.teacherRemark ||
                "No remark"}
            </p>

          </div>

          <div className="bg-gray-50 rounded-xl p-4">

            <p className="text-sm font-semibold mb-2">
              Principal Remark
            </p>

            <p className="text-gray-600">
              {result?.principalRemark ||
                "No remark"}
            </p>

          </div>

        </div>

        {/* ACTIONS */}

        <div className="grid grid-cols-3 gap-3 mt-6">

          <button
            onClick={
              onGeneratePDF
            }
            className="
              flex
              items-center
              justify-center
              gap-2
              bg-red-600
              text-white
              py-3
              rounded-xl
              hover:bg-red-700
            "
          >
            <FileText size={18} />
            PDF
          </button>

          <button
            onClick={
              onSendWhatsApp
            }
            className="
              flex
              items-center
              justify-center
              gap-2
              bg-green-600
              text-white
              py-3
              rounded-xl
              hover:bg-green-700
            "
          >
            <MessageCircle
              size={18}
            />
            WhatsApp
          </button>

          <button
            onClick={onEdit}
            className="
              flex
              items-center
              justify-center
              gap-2
              bg-blue-600
              text-white
              py-3
              rounded-xl
              hover:bg-blue-700
            "
          >
            <Edit size={18} />
            Edit
          </button>

        </div>

      </div>

    </div>
  );
}