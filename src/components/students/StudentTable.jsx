import API from "../../services/api";

export default function StudentTable({
  students,
  loading,
  onView,
  onEdit,
  onRefresh,
}) {

  /*
  =====================================
  OPEN PARENT PORTAL (IMPERSONATION)
  =====================================
  */
  const openParentPortal = async (parent) => {
    try {
      if (!parent) {
        alert("This student has no parent assigned.");
        return;
      }

      const parentId =
        typeof parent === "object"
          ? parent._id
          : parent;

      const adminToken = localStorage.getItem("token");

      const res = await API.post(
        `/admin/impersonate/${parentId}`
      );

      // Save admin session for restore later
      localStorage.setItem("adminToken", adminToken);

      // Switch to impersonation token
      localStorage.setItem("token", res.data.token);

      // Redirect to parent dashboard
      window.location.href = "/parent/dashboard";

    } catch (err) {
      console.error("Impersonation error:", err);

      alert(
        err.response?.data?.message ||
        "Failed to open Parent Portal"
      );
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded shadow">
        <p>Loading students...</p>
      </div>
    );
  }

  if (!students.length) {
    return (
      <div className="bg-white p-6 rounded shadow text-center text-gray-500">
        No students found
      </div>
    );
  }

  return (
    <div className="bg-white rounded shadow overflow-x-auto">

      <table className="w-full text-sm">

        {/* HEADER */}
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Student</th>
            <th className="p-3">Parent</th>
            <th className="p-3">Class</th>
            <th className="p-3">Gender</th>
            <th className="p-3">Fee</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {students.map((s) => (
            <tr
              key={s._id}
              className="border-b hover:bg-gray-50"
            >

              {/* STUDENT */}
              <td className="p-3">
                <div className="flex items-center gap-3">

                  <img
                    src={s.passport || "/avatar.png"}
                    alt="student"
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-medium">
                      {s.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {s.admissionNumber || "No ID"}
                    </p>
                  </div>

                </div>
              </td>

              {/* PARENT */}
              <td className="p-3">
                {s.parent ? (
                  <div>
                    <p className="font-medium">
                      {s.parent.fullName}
                    </p>

                    <p className="text-xs text-gray-500">
                      {s.parent.email}
                    </p>
                  </div>
                ) : (
                  <span className="text-red-500 text-xs">
                    No parent assigned
                  </span>
                )}
              </td>

              {/* CLASS */}
              <td className="p-3">{s.class}</td>

              {/* GENDER */}
              <td className="p-3">{s.gender || "-"}</td>

              {/* FEE */}
              <td className="p-3">
                <span
                  className={
                    s.feeStatus === "paid"
                      ? "text-green-600"
                      : s.feeStatus === "partial"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }
                >
                  {s.feeStatus}
                </span>
              </td>

              {/* ACTIONS */}
              <td className="p-3">
                <div className="flex justify-end gap-2 flex-wrap">

                  <button
                    onClick={() => onView(s)}
                    className="px-2 py-1 text-xs bg-gray-200 rounded"
                  >
                    View
                  </button>

                  <button
                    onClick={() => onEdit(s)}
                    className="px-2 py-1 text-xs bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => openParentPortal(s.parent)}
                    className="px-2 py-1 text-xs bg-green-600 text-white rounded"
                    disabled={!s.parent}
                  >
                    Parent Portal
                  </button>

                </div>
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}