import {
  CalendarDays,
  Clock3,
  MapPin,
  ChevronRight,
  Bell,
  Flag,
} from "lucide-react";

const demoEvents = [
  {
    id: 1,
    title: "Mid-Term Examination",
    date: "18 Jul 2026",
    time: "09:00 AM",
    location: "All Classrooms",
    priority: "high",
  },
  {
    id: 2,
    title: "PTA General Meeting",
    date: "21 Jul 2026",
    time: "11:00 AM",
    location: "School Hall",
    priority: "medium",
  },
  {
    id: 3,
    title: "Inter-House Sports",
    date: "29 Jul 2026",
    time: "08:00 AM",
    location: "Sports Complex",
    priority: "low",
  },
  {
    id: 4,
    title: "Teachers Workshop",
    date: "05 Aug 2026",
    time: "10:00 AM",
    location: "Conference Room",
    priority: "medium",
  },
];

export default function UpcomingEvents({
  events = demoEvents,
}) {
  return (
    <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

      {/* Header */}

      <div className="px-8 py-6 border-b bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50">

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">

              <CalendarDays
                className="text-orange-600"
                size={28}
              />

            </div>

            <div>

              <h2 className="text-2xl font-bold text-slate-800">
                Upcoming Events
              </h2>

              <p className="text-slate-500 mt-1">
                School calendar and scheduled activities.
              </p>

            </div>

          </div>

          <button className="text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-2">

            View Calendar

            <ChevronRight size={18} />

          </button>

        </div>

      </div>

      {/* Events */}

      <div className="divide-y divide-slate-100">

        {events.map((event) => (

          <div
            key={event.id}
            className="px-8 py-6 hover:bg-slate-50 transition"
          >

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

              {/* Left */}

              <div className="flex items-start gap-5">

                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    event.priority === "high"
                      ? "bg-red-100 text-red-600"
                      : event.priority === "medium"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-emerald-100 text-emerald-600"
                  }`}
                >

                  <Bell size={24} />

                </div>

                <div>

                  <h3 className="text-xl font-bold text-slate-800">

                    {event.title}

                  </h3>

                  <div className="flex flex-wrap gap-6 mt-3 text-slate-500 text-sm">

                    <div className="flex items-center gap-2">

                      <CalendarDays size={16} />

                      {event.date}

                    </div>

                    <div className="flex items-center gap-2">

                      <Clock3 size={16} />

                      {event.time}

                    </div>

                    <div className="flex items-center gap-2">

                      <MapPin size={16} />

                      {event.location}

                    </div>

                  </div>

                </div>

              </div>

              {/* Right */}

              <div className="flex items-center gap-4">

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    event.priority === "high"
                      ? "bg-red-100 text-red-700"
                      : event.priority === "medium"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >

                  {event.priority.toUpperCase()}

                </span>

                <button className="w-11 h-11 rounded-xl border border-slate-200 hover:bg-slate-100 flex items-center justify-center">

                  <ChevronRight size={18} />

                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Footer */}

      <div className="bg-slate-50 border-t px-8 py-6">

        <div className="flex items-center justify-between flex-wrap gap-4">

          <div className="flex items-center gap-3">

            <Flag
              className="text-orange-600"
              size={22}
            />

            <div>

              <p className="font-semibold text-slate-800">

                Academic Session

              </p>

              <p className="text-sm text-slate-500">

                Stay updated with school activities and important deadlines.

              </p>

            </div>

          </div>

          <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition">

            Add Event

          </button>

        </div>

      </div>

    </section>
  );
}