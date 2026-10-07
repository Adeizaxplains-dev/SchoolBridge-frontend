import { useEffect, useState } from "react";
import API from "../../services/api";
import {
  CalendarDays,
  Clock,
  BookOpen,
  School,
  User2,
} from "lucide-react";

export default function Timetable() {
  const [loading, setLoading] = useState(true);
  const [today, setToday] = useState([]);
  const [week, setWeek] = useState([]);

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      setLoading(true);

      const res = await API.get("/teacher/timetable");

      setToday(res.data.data.today || []);
      setWeek(res.data.data.week || []);
    } catch (err) {
      console.error(err);

      // Demo Data
      const demo = [
        {
          day: "Monday",
          periods: [
            {
              period: 1,
              time: "08:00 - 08:40",
              subject: "Mathematics",
              class: "JSS1A",
              room: "Block A",
            },
            {
              period: 2,
              time: "08:45 - 09:25",
              subject: "Mathematics",
              class: "JSS2A",
              room: "Block A",
            },
            {
              period: 4,
              time: "10:30 - 11:10",
              subject: "Further Mathematics",
              class: "SS1",
              room: "Science Hall",
            },
          ],
        },
        {
          day: "Tuesday",
          periods: [
            {
              period: 1,
              time: "08:00 - 08:40",
              subject: "Mathematics",
              class: "JSS3",
              room: "Room 7",
            },
            {
              period: 3,
              time: "09:40 - 10:20",
              subject: "Further Mathematics",
              class: "SS2",
              room: "Room 11",
            },
          ],
        },
        {
          day: "Wednesday",
          periods: [],
        },
        {
          day: "Thursday",
          periods: [],
        },
        {
          day: "Friday",
          periods: [],
        },
      ];

      setWeek(demo);
      setToday(demo[0].periods);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="w-14 h-14 border-b-2 border-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* HERO */}

      <div className="rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-700 to-indigo-700 text-white p-8 shadow-xl">

        <div className="flex justify-between items-center flex-wrap gap-6">

          <div>

            <p className="uppercase tracking-widest text-cyan-200 text-sm">
              Teacher Schedule
            </p>

            <h1 className="text-4xl font-bold mt-2">
              Weekly Timetable
            </h1>

            <p className="mt-3 text-cyan-100 max-w-2xl">
              View today's lessons, classroom schedule and
              weekly teaching timetable.
            </p>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <StatCard
              title="Today's Classes"
              value={today.length}
            />

            <StatCard
              title="Weekly Lessons"
              value={week.reduce(
                (a, b) => a + b.periods.length,
                0
              )}
            />

          </div>

        </div>

      </div>

      {/* TODAY */}

      <div className="bg-white rounded-3xl shadow border">

        <div className="p-6 border-b flex items-center gap-3">

          <CalendarDays className="text-blue-600" />

          <div>

            <h2 className="font-bold text-xl">
              Today's Schedule
            </h2>

            <p className="text-gray-500">
              Upcoming lessons for today
            </p>

          </div>

        </div>

        <div className="p-6">

          {today.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              No class scheduled today.
            </div>
          ) : (
            <div className="space-y-5">

              {today.map((lesson) => (
                <div
                  key={lesson.period}
                  className="border rounded-2xl p-5 hover:shadow-md transition"
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <h3 className="font-bold text-lg">
                        {lesson.subject}
                      </h3>

                      <div className="flex gap-6 mt-3 text-gray-500 text-sm">

                        <span className="flex items-center gap-2">
                          <Clock size={16} />
                          {lesson.time}
                        </span>

                        <span className="flex items-center gap-2">
                          <School size={16} />
                          {lesson.class}
                        </span>

                        <span className="flex items-center gap-2">
                          <BookOpen size={16} />
                          {lesson.room}
                        </span>

                      </div>

                    </div>

                    <div className="bg-blue-100 text-blue-700 rounded-xl px-4 py-2 font-bold">

                      Period {lesson.period}

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>

      {/* WEEK */}

      <div className="bg-white rounded-3xl shadow border">

        <div className="p-6 border-b">

          <h2 className="font-bold text-xl">
            Weekly Timetable
          </h2>

          <p className="text-gray-500">
            Full teaching schedule
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="text-left p-4">Day</th>

                <th className="text-left p-4">
                  Lessons
                </th>

              </tr>

            </thead>

            <tbody>

              {week.map((day) => (
                <tr
                  key={day.day}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="p-5 font-semibold w-40">
                    {day.day}
                  </td>

                  <td className="p-5">

                    {day.periods.length === 0 ? (
                      <span className="text-gray-400">
                        Free Day
                      </span>
                    ) : (
                      <div className="space-y-3">

                        {day.periods.map((lesson) => (
                          <div
                            key={`${day.day}-${lesson.period}`}
                            className="flex justify-between bg-blue-50 rounded-xl px-4 py-3"
                          >

                            <div>

                              <div className="font-semibold">
                                {lesson.subject}
                              </div>

                              <div className="text-sm text-gray-500">

                                {lesson.class} • {lesson.room}

                              </div>

                            </div>

                            <div className="text-right">

                              <div className="font-medium">

                                {lesson.time}

                              </div>

                              <div className="text-blue-600 text-sm">

                                Period {lesson.period}

                              </div>

                            </div>

                          </div>
                        ))}

                      </div>
                    )}

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white/15 backdrop-blur rounded-2xl p-5 text-center">

      <div className="text-3xl font-bold">
        {value}
      </div>

      <div className="text-sm text-cyan-100">
        {title}
      </div>

    </div>
  );
}