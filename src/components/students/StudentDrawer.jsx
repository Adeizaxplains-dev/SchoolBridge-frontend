export default function StudentDrawer({
  open,
  student,
  onClose,
  onEdit,
}) {
  if (!open || !student) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">

      {/* OVERLAY CLICK CLOSE */}
      <div
        className="flex-1"
        onClick={onClose}
      />

      {/* DRAWER */}
      <div className="w-full max-w-md bg-white h-full shadow-lg p-6 overflow-y-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">

          <h2 className="text-xl font-bold">
            Student Profile
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 text-xl"
          >
            ✕
          </button>

        </div>

        {/* PROFILE HEADER */}
        <div className="flex items-center gap-3 mb-6">

          <img
            src={student.passport || "/avatar.png"}
            alt="student"
            className="w-16 h-16 rounded-full object-cover"
          />

          <div>
            <h3 className="text-lg font-semibold">
              {student.name}
            </h3>

            <p className="text-sm text-gray-500">
              {student.class}
            </p>
          </div>

        </div>

        {/* INFO SECTION */}
        <div className="space-y-4">

          {/* BASIC INFO */}
          <div className="bg-gray-50 p-3 rounded">
            <h4 className="font-semibold mb-2">
              Basic Info
            </h4>

            <p><b>Gender:</b> {student.gender || "-"}</p>
            <p>
              <b>DOB:</b>{" "}
              {student.dateOfBirth
                ? new Date(student.dateOfBirth).toDateString()
                : "-"}
            </p>
            <p><b>Admission No:</b> {student.admissionNumber || "-"}</p>
          </div>

          {/* PARENT INFO */}
          <div className="bg-gray-50 p-3 rounded">
            <h4 className="font-semibold mb-2">
              Parent Info
            </h4>

            {student.parent ? (
              <>
                <p><b>Name:</b> {student.parent.fullName}</p>
                <p><b>Email:</b> {student.parent.email}</p>
              </>
            ) : (
              <p className="text-red-500">
                No parent assigned
              </p>
            )}
          </div>

          {/* FINANCE */}
          <div className="bg-gray-50 p-3 rounded">
            <h4 className="font-semibold mb-2">
              Fees
            </h4>

            <p>
              <b>Status:</b>{" "}
              <span
                className={
                  student.feeStatus === "paid"
                    ? "text-green-600"
                    : student.feeStatus === "partial"
                    ? "text-yellow-600"
                    : "text-red-600"
                }
              >
                {student.feeStatus}
              </span>
            </p>
          </div>

        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex gap-2">

          <button
            onClick={() => onEdit(student)}
            className="flex-1 bg-blue-600 text-white py-2 rounded"
          >
            Edit Student
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 py-2 rounded"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}