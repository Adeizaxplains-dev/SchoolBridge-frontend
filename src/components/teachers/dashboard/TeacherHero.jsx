import {
  CalendarDays,
  GraduationCap,
  School,
} from "lucide-react";

export default function TeacherHero({
  teacher = {},
  stats = {},
}) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white shadow-xl">

      {/* Decorative circles */}

      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative px-8 py-10 lg:px-10">

        <div className="flex flex-col lg:flex-row justify-between gap-10">

          {/* LEFT */}

          <div className="flex gap-6">

            <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur flex items-center justify-center border border-white/20">

              {teacher.passport ? (
                <img
                  src={teacher.passport}
                  alt={teacher.fullName}
                  className="w-full h-full rounded-3xl object-cover"
                />
              ) : (
                <GraduationCap size={46} />
              )}

            </div>

            <div>

              <p className="uppercase tracking-[4px] text-blue-200 text-xs font-semibold">
                Teacher Workspace
              </p>

              <h1 className="text-4xl font-bold mt-2">
                Welcome back,
              </h1>

              <h2 className="text-3xl font-semibold mt-1">
                {teacher.fullName || "Teacher"}
              </h2>

              <p className="text-blue-100 mt-5 max-w-2xl leading-7">
                Manage classes, assignments, attendance,
                examinations and student performance from one
                intelligent workspace.
              </p>

            </div>

          </div>

          {/* RIGHT */}

          <div className="grid grid-cols-1 gap-4 min-w-[300px]">

            <InfoCard
              icon={<School size={20} />}
              title="Department"
              value={teacher.department || "General Studies"}
            />

            <InfoCard
              icon={<GraduationCap size={20} />}
              title="Designation"
              value={teacher.designation || "Teacher"}
            />

            <InfoCard
              icon={<CalendarDays size={20} />}
              title="Today"
              value={today}
            />

          </div>

        </div>

        {/* Bottom quick summary */}

        <div className="grid md:grid-cols-4 gap-5 mt-10">

          <MiniStat
            title="Students"
            value={stats.students || 0}
          />

          <MiniStat
            title="Classes"
            value={stats.classes || 0}
          />

          <MiniStat
            title="Subjects"
            value={stats.subjects || 0}
          />

          <MiniStat
            title="Pending Results"
            value={stats.pendingResults || 0}
          />

        </div>

      </div>

    </section>
  );
}

function InfoCard({
  icon,
  title,
  value,
}) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 p-5">

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
          {icon}
        </div>

        <div>

          <p className="text-xs uppercase tracking-wide text-blue-200">
            {title}
          </p>

          <h3 className="font-semibold mt-1">
            {value}
          </h3>

        </div>

      </div>

    </div>
  );
}

function MiniStat({
  title,
  value,
}) {
  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/10 p-5">

      <p className="text-sm text-blue-200">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>

    </div>
  );
}