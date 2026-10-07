import { useEffect, useState } from "react";
import API from "../../services/api";
import Button from "../../components/ui/Button";

export default function Attendance() {
  const [students, setStudents] = useState([]);
  const [className, setClassName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [attendance, setAttendance] = useState({}); // {studentId: status}

  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  /*
  ============================
  LOAD STUDENTS BY CLASS
  ============================
  */
  const fetchStudents = async (cls) => {
    if (!cls) return;

    try {
      setLoading(true);

      const res = await API.get(`/students?class=${cls}`);

      setStudents(res.data.data || res.data || []);
    } catch (err) {
      console.error("Failed to load students", err);
    } finally {
      setLoading(false);
    }
  };

  /*
  ============================
  MARK ATTENDANCE
  ============================
  */
  const markAttendance = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  /*
  ============================
  SUBMIT ATTENDANCE
  ============================
  */
  const submitAttendance = async () => {
    try {
      const payload = {
        className,
        date,
        attendance,
      };

      await API.post("/attendance", payload);

      alert("Attendance saved successfully");

      fetchStats();
    } catch (err) {
      console.error(err);
      alert("Failed to save attendance");
    }
  };

  /*
  ============================
  ANALYTICS
  ============================
  */
  const fetchStats = async () => {
    try {
      const res = await API.get("/attendance/stats");

      setStats(res.data.data || res.data);
    } catch (err) {
      console.error("Stats error", err);
    }
  };

  /*
  ============================
  SEND WHATSAPP REMINDER
  ============================
  */
  const sendReminder = async (studentId) => {
    try {
      await API.post("/notifications/whatsapp", {
        studentId,
        message: "Your child was absent today.",
      });

      alert("Reminder sent");
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    }
  };

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">
          Attendance Management
        </h1>
        <p className="text-gray-500">
          Mark attendance and notify parents via WhatsApp
        </p>
      </div>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded shadow flex gap-4">
        <input
          type="text"
          placeholder="Class (e.g SS1)"
          className="border p-2"
          value={className}
          onChange={(e) => {
            setClassName(e.target.value);
            fetchStudents(e.target.value);
          }}
        />

        <input
          type="date"
          className="border p-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* ATTENDANCE TABLE */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-4">
          Mark Attendance
        </h2>

        {loading ? (
          <p>Loading students...</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th>Name</th>
                <th>Class</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="border-b">
                  <td>{student.name}</td>
                  <td>{student.class}</td>

                  <td>
                    {attendance[student._id] || "Not marked"}
                  </td>

                  <td className="space-x-2">
                    <Button
                      onClick={() =>
                        markAttendance(student._id, "present")
                      }
                    >
                      Present
                    </Button>

                    <Button
                      onClick={() =>
                        markAttendance(student._id, "absent")
                      }
                    >
                      Absent
                    </Button>

                    {attendance[student._id] === "absent" && (
                      <Button
                        onClick={() =>
                          sendReminder(student._id)
                        }
                        className="bg-red-500"
                      >
                        Notify Parent
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="mt-4">
          <Button onClick={submitAttendance}>
            Submit Attendance
          </Button>
        </div>
      </div>

      {/* ANALYTICS */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-4">
          Attendance Analytics
        </h2>

        {!stats ? (
          <p>No data available</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p>Total Present</p>
              <h3 className="text-xl font-bold">
                {stats.totalPresent}
              </h3>
            </div>

            <div>
              <p>Total Absent</p>
              <h3 className="text-xl font-bold">
                {stats.totalAbsent}
              </h3>
            </div>

            <div>
              <p>Attendance Rate</p>
              <h3 className="text-xl font-bold">
                {stats.attendanceRate}%
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}