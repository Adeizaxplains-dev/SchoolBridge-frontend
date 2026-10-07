import { useEffect, useState } from "react";
import axios from "axios";

import { API_BASE_URL } from "../../services/api";

const API = `${API_BASE_URL}/teacher`;

export default function TeacherStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchStudents = async () => {
    try {
      const { data } = await axios.get(
        `${API}/students`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudents(data.data || []);
    } catch (error) {
      console.error("GET STUDENTS ERROR:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            My Students
          </h1>

          <p className="text-gray-500">
            Students assigned to your classes.
          </p>

        </div>

        <div className="bg-blue-600 text-white rounded-lg px-5 py-3 shadow">

          <p className="text-xs uppercase">
            Total Students
          </p>

          <h2 className="text-2xl font-bold">
            {students.length}
          </h2>

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="px-6 py-4 border-b">

          <h2 className="font-semibold text-lg">
            Student List
          </h2>

        </div>

        {loading ? (

          <div className="p-10 text-center">

            Loading students...

          </div>

        ) : students.length === 0 ? (

          <div className="p-10 text-center text-gray-500">

            No students assigned.

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-100">

                <tr>

                  <th className="text-left p-4">
                    Passport
                  </th>

                  <th className="text-left p-4">
                    Name
                  </th>

                  <th className="text-left p-4">
                    Admission No.
                  </th>

                  <th className="text-left p-4">
                    Class
                  </th>

                  <th className="text-left p-4">
                    Gender
                  </th>

                  <th className="text-left p-4">
                    Fee Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {students.map((student) => (

                  <tr
                    key={student._id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="p-4">

                      {student.passport ? (

                        <img
                          src={student.passport}
                          alt={student.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />

                      ) : (

                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">

                          {student.name?.charAt(0)}

                        </div>

                      )}

                    </td>

                    <td className="p-4 font-medium">

                      {student.name}

                    </td>

                    <td className="p-4">

                      {student.admissionNumber || "--"}

                    </td>

                    <td className="p-4">

                      {student.class}

                    </td>

                    <td className="p-4">

                      {student.gender}

                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          student.feeStatus === "paid"
                            ? "bg-green-100 text-green-700"
                            : student.feeStatus === "partial"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >

                        {student.feeStatus}

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