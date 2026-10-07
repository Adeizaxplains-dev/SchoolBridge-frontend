import {
  Trophy,
  Percent,
  Sigma,
  Medal,
  TrendingUp,
  TrendingDown,
  Minus,
  BookOpen,
  Star,
} from "lucide-react";

export default function ResultSummaryCards({
  result = {},
}) {
  const subjects = result.subjects || [];

  const average = Number(result.average || 0);
  const percentage = Number(result.percentage || 0);
  const totalScore = Number(result.totalScore || 0);

  const highest =
    subjects.length > 0
      ? Math.max(...subjects.map((s) => Number(s.total || 0)))
      : 0;

  const lowest =
    subjects.length > 0
      ? Math.min(...subjects.map((s) => Number(s.total || 0)))
      : 0;

  const grade =
    percentage >= 75
      ? "A"
      : percentage >= 65
      ? "B"
      : percentage >= 55
      ? "C"
      : percentage >= 45
      ? "D"
      : percentage >= 40
      ? "E"
      : "F";

  const performance = (() => {
    if (percentage >= 75)
      return {
        label: "Outstanding Performance",
        color:
          "from-emerald-500 via-green-500 to-teal-500",
        bg:
          "from-emerald-50 to-green-50",
        icon: TrendingUp,
      };

    if (percentage >= 60)
      return {
        label: "Very Good Performance",
        color:
          "from-blue-500 via-indigo-500 to-cyan-500",
        bg:
          "from-blue-50 to-indigo-50",
        icon: TrendingUp,
      };

    if (percentage >= 50)
      return {
        label: "Average Performance",
        color:
          "from-amber-500 via-orange-500 to-yellow-500",
        bg:
          "from-amber-50 to-orange-50",
        icon: Minus,
      };

    return {
      label: "Needs Improvement",
      color:
        "from-red-500 via-rose-500 to-pink-500",
      bg:
        "from-red-50 to-rose-50",
      icon: TrendingDown,
    };
  })();

  const PerformanceIcon = performance.icon;

  const cards = [
    {
      title: "Average",
      value: average.toFixed(1),
      suffix: "%",
      icon: Trophy,
      color: "emerald",
    },

    {
      title: "Total Score",
      value: totalScore,
      suffix: "",
      icon: Sigma,
      color: "blue",
    },

    {
      title: "Subjects",
      value: subjects.length,
      suffix: "",
      icon: BookOpen,
      color: "purple",
    },

    {
      title: "Position",
      value: result.position || "--",
      suffix: "",
      icon: Medal,
      color: "orange",
    },

    {
      title: "Highest",
      value: highest,
      suffix: "",
      icon: TrendingUp,
      color: "green",
    },

    {
      title: "Lowest",
      value: lowest,
      suffix: "",
      icon: TrendingDown,
      color: "red",
    },
  ];

  const colorMap = {
    emerald: {
      bg: "bg-emerald-50",
      icon: "text-emerald-600",
      progress:
        "from-emerald-500 to-green-600",
    },

    blue: {
      bg: "bg-blue-50",
      icon: "text-blue-600",
      progress:
        "from-blue-500 to-indigo-600",
    },

    purple: {
      bg: "bg-purple-50",
      icon: "text-purple-600",
      progress:
        "from-purple-500 to-fuchsia-600",
    },

    orange: {
      bg: "bg-orange-50",
      icon: "text-orange-600",
      progress:
        "from-orange-500 to-amber-600",
    },

    green: {
      bg: "bg-green-50",
      icon: "text-green-600",
      progress:
        "from-green-500 to-emerald-600",
    },

    red: {
      bg: "bg-red-50",
      icon: "text-red-600",
      progress:
        "from-red-500 to-rose-600",
    },
  };

  return (
    <div className="space-y-8">

      {/* PERFORMANCE HERO */}

      <div
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${performance.bg} border border-slate-200 shadow-sm`}
      >
        <div
          className={`absolute inset-0 opacity-10 bg-gradient-to-r ${performance.color}`}
        />

        <div className="relative p-8 flex flex-col lg:flex-row justify-between items-center gap-8">

          <div>

            <p className="uppercase tracking-[4px] text-xs font-semibold text-slate-500">

              Overall Academic Performance

            </p>

            <h2 className="text-4xl font-bold mt-3 text-slate-900">

              {performance.label}

            </h2>

            <div className="mt-5 flex items-center gap-4">

              <span className="text-5xl font-black text-slate-900">

                {percentage.toFixed(1)}%

              </span>

              <span className="px-5 py-2 rounded-full bg-white shadow font-bold text-xl">

                Grade {grade}

              </span>

            </div>

          </div>

          <div className="flex flex-col items-center">

            <div
              className={`w-28 h-28 rounded-3xl bg-gradient-to-r ${performance.color} flex items-center justify-center shadow-xl`}
            >
              <PerformanceIcon
                size={50}
                className="text-white"
              />
            </div>

            <div className="mt-5 flex items-center gap-2">

              <Star
                className="text-yellow-500"
                size={18}
              />

              <span className="font-semibold">

                SchoolBridge Report Intelligence

              </span>

            </div>

          </div>

        </div>

      </div>

      {/* KPI GRID */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

        {cards.map((card, index) => {
          const Icon = card.icon;
          const style =
            colorMap[card.color];

          return (
            <div
              key={index}
              className="rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >

              <div
                className={`h-1 bg-gradient-to-r ${style.progress}`}
              />

              <div className="p-6">

                <div className="flex justify-between">

                  <div>

                    <p className="text-sm text-slate-500 font-medium">

                      {card.title}

                    </p>

                    <h3 className="mt-4 text-4xl font-black text-slate-900">

                      {card.value}

                      <span className="text-xl ml-1">

                        {card.suffix}

                      </span>

                    </h3>

                  </div>

                  <div
                    className={`w-16 h-16 rounded-2xl ${style.bg} flex items-center justify-center`}
                  >
                    <Icon
                      className={style.icon}
                      size={30}
                    />
                  </div>

                </div>

                <div className="mt-6">

                  <div className="flex justify-between text-xs mb-2 text-slate-500">

                    <span>Progress</span>

                    <span>

                      {percentage.toFixed(0)}%

                    </span>

                  </div>

                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">

                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${style.progress}`}
                      style={{
                        width: `${Math.min(
                          percentage,
                          100
                        )}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}