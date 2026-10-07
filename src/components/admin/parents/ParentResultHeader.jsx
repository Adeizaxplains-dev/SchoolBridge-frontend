import {
  GraduationCap,
  School,
  Calendar,
  Award,
  User,
  BadgeCheck,
} from "lucide-react";

export default function ParentResultHeader({ result }) {
  if (!result) return null;

  const percentage = Number(result.percentage || 0);

  const getPerformance = () => {
    if (percentage >= 75)
      return {
        text: "Excellent",
        bg: "bg-emerald-100",
        color: "text-emerald-700",
      };

    if (percentage >= 60)
      return {
        text: "Very Good",
        bg: "bg-blue-100",
        color: "text-blue-700",
      };

    if (percentage >= 50)
      return {
        text: "Good",
        bg: "bg-amber-100",
        color: "text-amber-700",
      };

    return {
      text: "Needs Improvement",
      bg: "bg-red-100",
      color: "text-red-700",
    };
  };

  const performance = getPerformance();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-700 shadow-xl">

      {/* Decorative background */}

      <div className="absolute right-0 top-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

      <div className="absolute left-0 bottom-0 w-56 h-56 bg-white/5 rounded-full blur-2xl" />

      <div className="relative p-8 lg:p-10">

        <div className="flex flex-col lg:flex-row justify-between gap-8">

          {/* LEFT */}

          <div className="flex items-center gap-6">

            <div className="relative">

              <img
                src={
                  result.studentPassport ||
                  "https://ui-avatars.com/api/?name=Student&background=ffffff&color=4f46e5&size=256"
                }
                alt={result.studentName}
                className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl object-cover"
              />

              <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-2 border-4 border-white">

                <BadgeCheck
                  size={20}
                  className="text-white"
                />

              </div>

            </div>

            <div className="text-white">

              <p className="uppercase tracking-[4px] text-sm opacity-80">

                Student Report Card

              </p>

              <h1 className="text-4xl font-extrabold mt-2">

                {result.studentName}

              </h1>

              <div className="flex flex-wrap gap-5 mt-6 text-sm">

                <div className="flex items-center gap-2">

                  <User size={16} />

                  <span>

                    {result.admissionNumber}

                  </span>

                </div>

                <div className="flex items-center gap-2">

                  <GraduationCap size={16} />

                  <span>

                    {result.className}

                  </span>

                </div>

                <div className="flex items-center gap-2">

                  <Calendar size={16} />

                  <span>

                    {result.term} • {result.session}

                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="grid grid-cols-2 gap-4 min-w-[320px]">

            <div className="rounded-2xl bg-white/15 backdrop-blur-md p-5">

              <p className="text-white/80 text-sm">

                Average Score

              </p>

              <h2 className="text-white text-4xl font-bold mt-3">

                {Number(result.average || 0).toFixed(2)}

              </h2>

            </div>

            <div className="rounded-2xl bg-white/15 backdrop-blur-md p-5">

              <p className="text-white/80 text-sm">

                Percentage

              </p>

              <h2 className="text-white text-4xl font-bold mt-3">

                {percentage.toFixed(1)}%

              </h2>

            </div>

            <div className="rounded-2xl bg-white/15 backdrop-blur-md p-5">

              <p className="text-white/80 text-sm">

                Position

              </p>

              <h2 className="text-white text-4xl font-bold mt-3">

                {result.position || "--"}

              </h2>

            </div>

            <div className="rounded-2xl bg-white/15 backdrop-blur-md p-5">

              <p className="text-white/80 text-sm">

                Performance

              </p>

              <div
                className={`inline-flex mt-4 px-4 py-2 rounded-full text-sm font-semibold ${performance.bg} ${performance.color}`}
              >
                <Award size={16} className="mr-2" />

                {performance.text}

              </div>

            </div>

          </div>

        </div>

        {/* School */}

        <div className="mt-8 flex items-center gap-3 text-white/90">

          <School size={18} />

          <span className="font-medium">

            {result.schoolName || "SchoolBridge Smart School"}

          </span>

        </div>

      </div>

    </div>
  );
}