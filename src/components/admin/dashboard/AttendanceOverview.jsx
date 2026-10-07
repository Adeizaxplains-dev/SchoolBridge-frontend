import {
  CalendarCheck,
  Users,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

const demoAttendance = {
  overall: 94,
  teachers: 98,
  students: 93,
  absent: 47,
  classes: [
    { class: "JSS 1", attendance: 96 },
    { class: "JSS 2", attendance: 92 },
    { class: "JSS 3", attendance: 95 },
    { class: "SS 1", attendance: 90 },
    { class: "SS 2", attendance: 94 },
    { class: "SS 3", attendance: 97 },
  ],
};

export default function AttendanceOverview({
  attendance = demoAttendance,
}) {
  return (
    <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

      {/* Header */}

      <div className="px-8 py-6 border-b bg-gradient-to-r from-emerald-50 to-cyan-50">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center">

            <CalendarCheck
              size={28}
              className="text-emerald-600"
            />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              Attendance Overview
            </h2>

            <p className="text-slate-500 mt-1">
              Live attendance statistics across the school.
            </p>

          </div>

        </div>

      </div>

      <div className="p-8">

        {/* KPI */}

        <div className="grid md:grid-cols-4 gap-5 mb-8">

          <AttendanceCard
            title="Overall"
            value={`${attendance.overall}%`}
            icon={TrendingUp}
            color="emerald"
          />

          <AttendanceCard
            title="Students"
            value={`${attendance.students}%`}
            icon={Users}
            color="blue"
          />

          <AttendanceCard
            title="Teachers"
            value={`${attendance.teachers}%`}
            icon={CalendarCheck}
            color="purple"
          />

          <AttendanceCard
            title="Absent Today"
            value={attendance.absent}
            icon={AlertTriangle}
            color="orange"
          />

        </div>

        {/* Progress */}

        <div className="space-y-5">

          {attendance.classes.map((item) => (

            <div key={item.class}>

              <div className="flex justify-between mb-2">

                <span className="font-medium text-slate-700">
                  {item.class}
                </span>

                <span className="font-bold text-slate-800">
                  {item.attendance}%
                </span>

              </div>

              <div className="h-3 rounded-full bg-slate-200 overflow-hidden">

                <div
                  className={`h-full rounded-full ${
                    item.attendance >= 95
                      ? "bg-emerald-500"
                      : item.attendance >= 90
                      ? "bg-blue-500"
                      : "bg-orange-500"
                  }`}
                  style={{
                    width: `${item.attendance}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

/* -------------------------------- */

function AttendanceCard({
  title,
  value,
  icon: Icon,
  color,
}) {
  const colors = {
    emerald:
      "bg-emerald-100 text-emerald-600",
    blue:
      "bg-blue-100 text-blue-600",
    purple:
      "bg-purple-100 text-purple-600",
    orange:
      "bg-orange-100 text-orange-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200 p-5">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h3 className="text-3xl font-bold mt-2 text-slate-800">
            {value}
          </h3>

        </div>

        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colors[color]}`}
        >

          <Icon size={28} />

        </div>

      </div>

    </div>
  );
}