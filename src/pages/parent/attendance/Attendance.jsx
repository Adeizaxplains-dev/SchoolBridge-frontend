import { useEffect, useState } from "react";
import axios from "axios";

import { API_BASE_URL } from "../../../services/api";

const API = `${API_BASE_URL}/parent`;

export default function ParentAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchAttendance = async () => {
    try {
      const { data } = await axios.get(
        `${API}/attendance`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAttendance(data.data || []);
    } catch (error) {
      console.error("GET ATTENDANCE ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Attendance
          </h1>

          <p className="text-gray-500">
            View your child's attendance records.
          </p>

        </div>

        <div className="bg-blue-600 text-white rounded-lg px-5 py-3 shadow">

          <p className="text-xs uppercase">
            Records
          </p>

          <h2 className="text-2xl font-bold">
            {attendance.length}
          </h2>

        </div>

      </div>

      {/* Attendance Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="px-6 py-4 border-b">

          <h2 className="font-semibold text-lg">
            Attendance History
          </h2>

        </div>

        {loading ? (

          <div className="p-8 text-center">
            Loading attendance...
          </div>

        ) : attendance.length === 0 ? (

          <div className="p-10 text-center text-gray-500">
            No attendance records available.
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-100">

                <tr>

                  <th className="text-left p-4">
                    Student
                  </th>

                  <th className="text-left p-4">
                    Class
                  </th>

                  <th className="text-left p-4">
                    Date
                  </th>

                  <th className="text-left p-4">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {attendance.map((record) => (

                  <tr
                    key={record._id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="p-4 font-medium">
                      {record.student?.name}
                    </td>

                    <td className="p-4">
                      {record.student?.class}
                    </td>

                    <td className="p-4">
                      {new Date(
                        record.date
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          record.status === "Present"
                            ? "bg-green-100 text-green-700"
                            : record.status === "Late"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {record.status}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}