import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart,
} from "recharts";

export default function AttendanceTrend({
  data = [],
}) {
  const demoData = [
    {
      day: "Mon",
      attendance: 96,
    },
    {
      day: "Tue",
      attendance: 92,
    },
    {
      day: "Wed",
      attendance: 94,
    },
    {
      day: "Thu",
      attendance: 98,
    },
    {
      day: "Fri",
      attendance: 95,
    },
  ];

  const chartData =
    data.length > 0 ? data : demoData;

  const average =
    (
      chartData.reduce(
        (a, b) => a + b.attendance,
        0
      ) / chartData.length
    ).toFixed(1);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

      {/* Header */}

      <div className="px-8 py-6 border-b bg-slate-50 flex justify-between items-center">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Weekly Attendance Trend
          </h2>

          <p className="text-slate-500 mt-1">
            Student attendance performance for the current week.
          </p>

        </div>

        <div className="text-right">

          <p className="text-sm text-slate-500">
            Weekly Average
          </p>

          <h3 className="text-3xl font-bold text-emerald-600">
            {average}%
          </h3>

        </div>

      </div>

      {/* Chart */}

      <div className="h-[340px] px-4 py-6">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>

              <linearGradient
                id="attendanceFill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="#2563eb"
                  stopOpacity={0.35}
                />

                <stop
                  offset="100%"
                  stopColor="#2563eb"
                  stopOpacity={0.03}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#e5e7eb"
            />

            <XAxis
              dataKey="day"
              tick={{
                fontSize: 13,
              }}
            />

            <YAxis
              domain={[80, 100]}
              tick={{
                fontSize: 13,
              }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: 16,
                border: "none",
                boxShadow:
                  "0 8px 30px rgba(0,0,0,.12)",
              }}
            />

            <Area
              type="monotone"
              dataKey="attendance"
              stroke="#2563eb"
              strokeWidth={3}
              fill="url(#attendanceFill)"
            />

            <Line
              type="monotone"
              dataKey="attendance"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{
                r: 5,
              }}
              activeDot={{
                r: 8,
              }}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

      {/* Footer */}

      <div className="border-t px-8 py-5 grid grid-cols-3 gap-6">

        <Metric
          label="Highest"
          value={`${Math.max(
            ...chartData.map(
              (d) => d.attendance
            )
          )}%`}
          color="text-green-600"
        />

        <Metric
          label="Lowest"
          value={`${Math.min(
            ...chartData.map(
              (d) => d.attendance
            )
          )}%`}
          color="text-red-600"
        />

        <Metric
          label="Target"
          value="95%"
          color="text-blue-600"
        />

      </div>

    </div>
  );
}

function Metric({
  label,
  value,
  color,
}) {
  return (
    <div className="text-center">

      <p className="text-sm text-slate-500">
        {label}
      </p>

      <h4
        className={`text-2xl font-bold mt-1 ${color}`}
      >
        {value}
      </h4>

    </div>
  );
}