import {
  GraduationCap,
  Trophy,
  TrendingUp,
  Award,
  Target,
  Users,
} from "lucide-react";

const demoPerformance = {
  overallPassRate: 91,
  averageScore: 74,
  distinctionRate: 28,
  promotionRate: 95,

  topClasses: [
    { class: "SS 3 Science", score: 91 },
    { class: "JSS 3 Gold", score: 88 },
    { class: "SS 2 Commercial", score: 86 },
    { class: "JSS 2 Blue", score: 84 },
    { class: "SS 1 Arts", score: 82 },
  ],

  departments: [
    {
      name: "Science",
      performance: 89,
    },
    {
      name: "Commercial",
      performance: 84,
    },
    {
      name: "Arts",
      performance: 81,
    },
  ],
};

export default function SchoolPerformance({
  performance = demoPerformance,
}) {
  return (
    <section className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

      {/* Header */}

      <div className="px-8 py-6 border-b bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center">

            <GraduationCap
              size={28}
              className="text-indigo-600"
            />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              School Performance
            </h2>

            <p className="text-slate-500 mt-1">
              Academic analytics and institution performance overview.
            </p>

          </div>

        </div>

      </div>

      <div className="p-8 space-y-8">

        {/* KPI */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <PerformanceCard
            title="Pass Rate"
            value={`${performance.overallPassRate}%`}
            icon={Target}
            color="emerald"
          />

          <PerformanceCard
            title="Average Score"
            value={`${performance.averageScore}%`}
            icon={TrendingUp}
            color="blue"
          />

          <PerformanceCard
            title="Distinctions"
            value={`${performance.distinctionRate}%`}
            icon={Award}
            color="purple"
          />

          <PerformanceCard
            title="Promotion Rate"
            value={`${performance.promotionRate}%`}
            icon={Users}
            color="orange"
          />

        </div>

        <div className="grid xl:grid-cols-2 gap-8">

          {/* Top Classes */}

          <div className="border border-slate-200 rounded-2xl p-6">

            <div className="flex items-center gap-3 mb-6">

              <Trophy
                className="text-yellow-500"
                size={24}
              />

              <h3 className="text-xl font-bold">
                Top Performing Classes
              </h3>

            </div>

            <div className="space-y-5">

              {performance.topClasses.map(
                (item, index) => (

                  <div
                    key={item.class}
                    className="flex items-center justify-between"
                  >

                    <div className="flex items-center gap-4">

                      <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">

                        #{index + 1}

                      </div>

                      <div>

                        <h4 className="font-semibold text-slate-800">
                          {item.class}
                        </h4>

                        <p className="text-sm text-slate-500">
                          Overall Academic Score
                        </p>

                      </div>

                    </div>

                    <span className="font-bold text-lg text-indigo-600">
                      {item.score}%
                    </span>

                  </div>

                )
              )}

            </div>

          </div>

          {/* Department Performance */}

          <div className="border border-slate-200 rounded-2xl p-6">

            <h3 className="text-xl font-bold mb-6">
              Department Performance
            </h3>

            <div className="space-y-6">

              {performance.departments.map(
                (dept) => (

                  <div key={dept.name}>

                    <div className="flex justify-between mb-2">

                      <span className="font-medium text-slate-700">
                        {dept.name}
                      </span>

                      <span className="font-bold text-slate-800">
                        {dept.performance}%
                      </span>

                    </div>

                    <div className="h-4 bg-slate-200 rounded-full overflow-hidden">

                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400"
                        style={{
                          width: `${dept.performance}%`,
                        }}
                      />

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

        {/* Summary Banner */}

        <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 p-8 text-white">

          <div className="flex items-center justify-between flex-wrap gap-6">

            <div>

              <h3 className="text-2xl font-bold">
                Academic Performance Trend
              </h3>

              <p className="text-blue-100 mt-2 max-w-xl">
                School performance has improved significantly
                this academic session with increased pass rate,
                better student engagement and improved classroom
                outcomes.
              </p>

            </div>

            <div className="text-center">

              <div className="text-5xl font-bold">
                +12%
              </div>

              <p className="text-blue-100">
                Improvement over last term
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

/* ------------------------------------------------ */

function PerformanceCard({
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
    <div className="border border-slate-200 rounded-2xl p-6">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h3 className="text-3xl font-bold mt-3 text-slate-800">
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