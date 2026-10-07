import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Cell,
} from "recharts";

export default function ResultPerformanceChart({
  subjects = [],
  results = [],
}) {
  /*
  ==========================================
  BUILD DATA
  ==========================================
  */

  let chartData = [];

  if (subjects.length > 0) {
    chartData = subjects.map((subject) => ({
      name: subject.subject || "Unknown",
      score: Number(subject.total || 0),
    }));
  } else if (results.length > 0) {
    chartData = results.slice(0, 10).map((result) => ({
      name:
        result.studentName ||
        result.student?.name ||
        "Student",
      score:
        Number(result.percentage) ||
        Number(result.average) ||
        0,
    }));
  }

  /*
  ==========================================
  COLORS
  ==========================================
  */

  const getColor = (score) => {
    if (score >= 75) return "#16a34a";
    if (score >= 60) return "#2563eb";
    if (score >= 50) return "#d97706";
    return "#dc2626";
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-200 px-6 py-5">

        <h2 className="text-lg font-bold text-slate-900">
          Performance Analysis
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Visual overview of student performance.
        </p>

      </div>

      {/* Chart */}

      <div className="h-[420px] w-full p-6">

        {chartData.length === 0 ? (

          <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-slate-400">

            No performance data available.

          </div>

        ) : (

          <ResponsiveContainer width="100%" height="100%">

            <BarChart
              data={chartData}
              margin={{
                top: 15,
                right: 15,
                left: 5,
                bottom: 20,
              }}
            >

              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="#e2e8f0"
              />

              <XAxis
                dataKey="name"
                tick={{
                  fontSize: 12,
                  fill: "#64748b",
                }}
                tickLine={false}
                axisLine={false}
                interval={0}
                angle={-15}
                textAnchor="end"
                height={60}
              />

              <YAxis
                domain={[0, 100]}
                tick={{
                  fontSize: 12,
                  fill: "#64748b",
                }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                cursor={{
                  fill: "#f8fafc",
                }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  boxShadow:
                    "0 10px 25px rgba(0,0,0,0.08)",
                }}
                formatter={(value) => [
                  `${value}%`,
                  "Score",
                ]}
              />

              <Bar
                dataKey="score"
                radius={[10, 10, 0, 0]}
                maxBarSize={45}
              >

                {chartData.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={getColor(entry.score)}
                  />

                ))}

              </Bar>

            </BarChart>

          </ResponsiveContainer>

        )}

      </div>

    </div>
  );
}