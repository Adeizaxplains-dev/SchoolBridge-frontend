import { useEffect, useState } from "react";
import API from "../../services/api";

import {
  Users,
  CheckCircle2,
  XCircle,
  Calendar,
} from "lucide-react";

export default function Attendance() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      const res = await API.get("/attendance/admin");

      setData(res.data.data || res.data);
    } catch (err) {
      console.error("Attendance Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6 animate-pulse">
        <div className="h-24 bg-slate-200 rounded-2xl" />
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-slate-200 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const stats = data?.stats || {};
  const classes = data?.classes || [];

  const attendanceRate =
    stats.totalStudents > 0
      ? ((stats.present / stats.totalStudents) * 100).toFixed(1)
      : 0;

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">
          Attendance Management
        </h1>
        <p className="text-slate-500">
          Monitor student attendance across all classes
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid md:grid-cols-3 gap-6">

        <StatCard
          title="Total Students"
          value={stats.totalStudents || 0}
          icon={<Users size={26} />}
          color="bg-blue-600"
        />

        <StatCard
          title="Present Today"
          value={stats.present || 0}
          icon={<CheckCircle2 size={26} />}
          color="bg-green-600"
        />

        <StatCard
          title="Absent Today"
          value={stats.absent || 0}
          icon={<XCircle size={26} />}
          color="bg-red-600"
        />

      </div>

      {/* ATTENDANCE RATE */}
      <div className="bg-white rounded-2xl shadow p-6 border">

        <div className="flex justify-between mb-2">
          <h2 className="font-bold text-lg">
            Attendance Rate
          </h2>

          <span className="font-semibold text-blue-600">
            {attendanceRate}%
          </span>
        </div>

        <div className="w-full bg-slate-200 rounded-full h-4">
          <div
            className="h-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
            style={{ width: `${attendanceRate}%` }}
          />
        </div>

      </div>

      {/* CLASS BREAKDOWN */}
      <div className="bg-white rounded-2xl shadow border p-6">

        <div className="flex items-center gap-2 mb-5">
          <Calendar className="text-indigo-600" />
          <h2 className="text-xl font-bold">
            Class Breakdown
          </h2>
        </div>

        <div className="space-y-4">

          {classes.map((cls, i) => (
            <div
              key={i}
              className="flex justify-between items-center border-b last:border-none py-4"
            >

              <div>
                <h3 className="font-semibold">
                  {cls.className}
                </h3>

                <p className="text-sm text-slate-500">
                  {cls.totalStudents} Students
                </p>
              </div>

              <div className="flex items-center gap-4">

                <span className="text-green-600 font-medium">
                  {cls.present} Present
                </span>

                <span className="text-red-500 font-medium">
                  {cls.absent} Absent
                </span>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

/* ===================== CARD ===================== */

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-2xl shadow border p-6">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-slate-500">{title}</p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div className={`${color} text-white p-3 rounded-xl`}>
          {icon}
        </div>

      </div>

    </div>
  );
}