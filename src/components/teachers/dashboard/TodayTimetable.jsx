import {
  Clock3,
  MapPin,
  Users,
  BookOpen,
  ArrowRight,
} from "lucide-react";

export default function TodayTimetable({
  timetable = [],
}) {
  const demoData = [
    {
      id: 1,
      subject: "Mathematics",
      class: "SS2 Gold",
      room: "Room A3",
      time: "08:00 - 09:00",
      students: 42,
      status: "Current",
    },
    {
      id: 2,
      subject: "Further Mathematics",
      class: "SS3 Science",
      room: "Room B1",
      time: "09:20 - 10:20",
      students: 37,
      status: "Next",
    },
    {
      id: 3,
      subject: "Mathematics",
      class: "JSS3 Blue",
      room: "Room C2",
      time: "11:00 - 12:00",
      students: 45,
      status: "Upcoming",
    },
    {
      id: 4,
      subject: "Mathematics",
      class: "SS1 Red",
      room: "Room A1",
      time: "01:00 - 02:00",
      students: 39,
      status: "Upcoming",
    },
  ];

  const schedule =
    timetable.length > 0 ? timetable : demoData;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

      {/* Header */}

      <div className="px-8 py-6 border-b bg-slate-50 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Today's Timetable
          </h2>

          <p className="text-slate-500 mt-1">
            Your teaching schedule for today.
          </p>

        </div>

        <button className="flex items-center gap-2 text-blue-600 font-semibold">

          Full Schedule

          <ArrowRight size={18} />

        </button>

      </div>

      {/* Content */}

      <div className="divide-y">

        {schedule.map((lesson) => (

          <div
            key={lesson.id}
            className="px-8 py-6 hover:bg-slate-50 transition"
          >

            <div className="flex flex-col lg:flex-row justify-between gap-5">

              {/* Left */}

              <div className="flex gap-5">

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg">

                  <BookOpen size={28} />

                </div>

                <div>

                  <div className="flex items-center gap-3">

                    <h3 className="font-bold text-lg text-slate-800">
                      {lesson.subject}
                    </h3>

                    <StatusBadge
                      status={lesson.status}
                    />

                  </div>

                  <p className="text-slate-500 mt-2">
                    {lesson.class}
                  </p>

                  <div className="flex flex-wrap gap-5 mt-4 text-sm text-slate-600">

                    <div className="flex items-center gap-2">

                      <Clock3 size={16} />

                      {lesson.time}

                    </div>

                    <div className="flex items-center gap-2">

                      <MapPin size={16} />

                      {lesson.room}

                    </div>

                    <div className="flex items-center gap-2">

                      <Users size={16} />

                      {lesson.students} Students

                    </div>

                  </div>

                </div>

              </div>

              {/* Right */}

              <div className="flex items-center gap-3">

                <button className="px-5 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700">

                  Attendance

                </button>

                <button className="px-5 py-2 rounded-xl border border-slate-300 hover:bg-slate-100">

                  Open Class

                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

function StatusBadge({
  status,
}) {
  const styles = {
    Current:
      "bg-green-100 text-green-700",
    Next:
      "bg-blue-100 text-blue-700",
    Upcoming:
      "bg-slate-100 text-slate-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        styles[status] ||
        styles.Upcoming
      }`}
    >
      {status}
    </span>
  );
}