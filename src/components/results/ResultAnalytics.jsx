import { useEffect, useState } from "react";
import API from "../../services/api";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

import {
  Users,
  GraduationCap,
  TrendingUp,
  TrendingDown,
  Award,
  Brain,
  BarChart3,
  Sparkles,
} from "lucide-react";

const COLORS = [
  "#2563EB",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
];

export default function ResultAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);

      const res = await API.get("/results/analytics");

      setAnalytics(res.data.analytics);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ===========================================
     LOADING STATE
  =========================================== */

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">

        <div className="animate-pulse space-y-8">

          <div className="space-y-3">

            <div className="h-8 w-72 rounded bg-slate-200" />

            <div className="h-4 w-96 rounded bg-slate-100" />

          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {[1, 2, 3, 4].map((item) => (

              <div
                key={item}
                className="h-36 rounded-3xl bg-white shadow-sm border border-slate-200"
              />

            ))}

          </div>

          <div className="grid gap-6 xl:grid-cols-2">

            <div className="h-[420px] rounded-3xl bg-white border border-slate-200" />

            <div className="h-[420px] rounded-3xl bg-white border border-slate-200" />

          </div>

        </div>

      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex h-screen items-center justify-center">

        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">

          <TrendingDown
            className="mx-auto mb-3 text-red-500"
            size={42}
          />

          <h2 className="text-xl font-bold text-red-600">

            Unable to load analytics

          </h2>

          <p className="mt-2 text-slate-500">

            Please refresh the page.

          </p>

        </div>

      </div>
    );
  }

  /* ===========================================
      KPI CARDS
  =========================================== */

  const stats = [
    {
      title: "Total Students",
      value: analytics.totalStudents,
      icon: Users,
      color: "blue",
      trend: "+8.2%",
      positive: true,
    },

    {
      title: "Average Score",
      value: `${analytics.averageScore}%`,
      icon: Award,
      color: "emerald",
      trend: "+3.1%",
      positive: true,
    },

    {
      title: "Pass Rate",
      value: `${analytics.passRate}%`,
      icon: TrendingUp,
      color: "green",
      trend: "+5.6%",
      positive: true,
    },

    {
      title: "Fail Rate",
      value: `${analytics.failRate}%`,
      icon: GraduationCap,
      color: "red",
      trend: "-2.3%",
      positive: false,
    },
  ];

  const colorStyles = {
    blue: {
      bg: "bg-blue-50",
      icon: "text-blue-600",
      ring: "ring-blue-100",
    },

    emerald: {
      bg: "bg-emerald-50",
      icon: "text-emerald-600",
      ring: "ring-emerald-100",
    },

    green: {
      bg: "bg-green-50",
      icon: "text-green-600",
      ring: "ring-green-100",
    },

    red: {
      bg: "bg-red-50",
      icon: "text-red-600",
      ring: "ring-red-100",
    },
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero Header */}

      <div className="border-b border-slate-200 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700">

        <div className="mx-auto max-w-7xl px-8 py-10">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm text-white backdrop-blur">

                <Brain size={16} />

                AI Powered Analytics

              </div>

              <h1 className="mt-5 text-4xl font-bold text-white">

                Academic Analytics Dashboard

              </h1>

              <p className="mt-3 max-w-2xl text-blue-100 text-lg">

                Monitor student performance, identify trends,
                evaluate subject outcomes and make informed
                academic decisions across your school.

              </p>

            </div>

            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">

              <BarChart3
                size={70}
                className="text-white"
              />

            </div>

          </div>

        </div>

      </div>

      <div className="mx-auto max-w-7xl space-y-8 px-8 py-8">

        {/* KPI SECTION */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {stats.map((card) => {

            const Icon = card.icon;

            return (

              <div
                key={card.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-sm font-medium text-slate-500">

                      {card.title}

                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-slate-900">

                      {card.value}

                    </h2>

                    <div
                      className={`mt-5 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${
                        card.positive
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >

                      {card.positive ? (
                        <TrendingUp size={15} />
                      ) : (
                        <TrendingDown size={15} />
                      )}

                      {card.trend}

                    </div>

                  </div>

                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ring-8 ${
                      colorStyles[card.color].bg
                    } ${
                      colorStyles[card.color].ring
                    }`}
                  >

                    <Icon
                      size={30}
                      className={
                        colorStyles[card.color].icon
                      }
                    />

                  </div>

                </div>

              </div>

            );

          })}
        </div>

        {/* PART 2 STARTS HERE */}
                {/* ===========================================
            CHARTS SECTION
        =========================================== */}

        <div className="grid gap-8 xl:grid-cols-2">

          {/* SUBJECT PERFORMANCE */}

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-100 px-7 py-6">

              <div>

                <h2 className="text-xl font-bold text-slate-900">

                  Subject Performance

                </h2>

                <p className="mt-1 text-sm text-slate-500">

                  Average performance across all subjects

                </p>

              </div>

              <div className="rounded-2xl bg-blue-50 p-3">

                <BarChart3
                  className="text-blue-600"
                  size={24}
                />

              </div>

            </div>

            <div className="h-[380px] px-5 py-4">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart
                  data={analytics.subjectPerformance}
                  margin={{
                    top: 10,
                    right: 20,
                    left: 0,
                    bottom: 30,
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E2E8F0"
                  />

                  <XAxis
                    dataKey="subject"
                    tick={{
                      fontSize: 12,
                    }}
                  />

                  <YAxis />

                  <Tooltip
                    cursor={{
                      fill: "#EFF6FF",
                    }}
                  />

                  <Legend />

                  <Bar
                    dataKey="average"
                    radius={[8, 8, 0, 0]}
                    fill="#2563EB"
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* GRADE DISTRIBUTION */}

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-100 px-7 py-6">

              <div>

                <h2 className="text-xl font-bold text-slate-900">

                  Grade Distribution

                </h2>

                <p className="mt-1 text-sm text-slate-500">

                  Overall grade spread across students

                </p>

              </div>

              <div className="rounded-2xl bg-purple-50 p-3">

                <Award
                  className="text-purple-600"
                  size={24}
                />

              </div>

            </div>

            <div className="h-[380px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={analytics.gradeDistribution}
                    dataKey="count"
                    nameKey="grade"
                    outerRadius={120}
                    innerRadius={70}
                    paddingAngle={4}
                    label
                  >

                    {analytics.gradeDistribution.map(
                      (_, index) => (

                        <Cell
                          key={index}
                          fill={
                            COLORS[
                              index %
                                COLORS.length
                            ]
                          }
                        />

                      )
                    )}

                  </Pie>

                  <Tooltip />

                  <Legend
                    verticalAlign="bottom"
                  />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

        {/* ===========================================
            CLASS PERFORMANCE
        =========================================== */}

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-slate-100 px-7 py-6">

            <div>

              <h2 className="text-xl font-bold text-slate-900">

                Class Performance Ranking

              </h2>

              <p className="mt-1 text-sm text-slate-500">

                Average academic performance by class

              </p>

            </div>

            <div className="rounded-2xl bg-emerald-50 p-3">

              <TrendingUp
                className="text-emerald-600"
                size={24}
              />

            </div>

          </div>

          <div className="h-[430px] px-5 py-5">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={analytics.classPerformance}
                margin={{
                  top: 10,
                  right: 20,
                  left: 0,
                  bottom: 30,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E2E8F0"
                />

                <XAxis
                  dataKey="class"
                  tick={{
                    fontSize: 12,
                  }}
                />

                <YAxis />

                <Tooltip
                  cursor={{
                    fill: "#ECFDF5",
                  }}
                />

                <Bar
                  dataKey="average"
                  fill="#10B981"
                  radius={[8, 8, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* PART 3 STARTS HERE */}
                {/* ===========================================
            STUDENT LEADERBOARDS
        =========================================== */}

        <div className="grid gap-8 xl:grid-cols-2">

          {/* TOP STUDENTS */}

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-100 px-7 py-6">

              <div>

                <h2 className="text-xl font-bold text-slate-900">
                  Top Performing Students
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Highest academic performers
                </p>

              </div>

              <div className="rounded-2xl bg-yellow-50 p-3">

                <Award
                  size={24}
                  className="text-yellow-600"
                />

              </div>

            </div>

            <div className="divide-y divide-slate-100">

              {analytics.topStudents?.map((student, index) => (

                <div
                  key={student._id}
                  className="flex items-center justify-between px-7 py-5 hover:bg-slate-50 transition"
                >

                  <div className="flex items-center gap-4">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">

                      {index + 1}

                    </div>

                    <div>

                      <h3 className="font-semibold text-slate-900">
                        {student.name}
                      </h3>

                      <p className="text-sm text-slate-500">
                        Outstanding Performer
                      </p>

                    </div>

                  </div>

                  <div className="rounded-xl bg-emerald-50 px-4 py-2 font-bold text-emerald-700">

                    {student.average}%

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* NEEDS SUPPORT */}

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-100 px-7 py-6">

              <div>

                <h2 className="text-xl font-bold text-slate-900">
                  Students Needing Support
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Students requiring intervention
                </p>

              </div>

              <div className="rounded-2xl bg-red-50 p-3">

                <Users
                  size={24}
                  className="text-red-600"
                />

              </div>

            </div>

            <div className="divide-y divide-slate-100">

              {analytics.bottomStudents?.map((student, index) => (

                <div
                  key={student._id}
                  className="flex items-center justify-between px-7 py-5 hover:bg-slate-50 transition"
                >

                  <div className="flex items-center gap-4">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 font-bold text-white">

                      {index + 1}

                    </div>

                    <div>

                      <h3 className="font-semibold text-slate-900">
                        {student.name}
                      </h3>

                      <p className="text-sm text-slate-500">
                        Academic Attention Required
                      </p>

                    </div>

                  </div>

                  <div className="rounded-xl bg-red-50 px-4 py-2 font-bold text-red-600">

                    {student.average}%

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* ===========================================
            AI INSIGHTS
        =========================================== */}

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-slate-100 px-7 py-6">

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                AI Academic Insights
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Automatically generated performance recommendations
              </p>

            </div>

            <div className="rounded-2xl bg-indigo-50 p-3">

              <Brain
                size={24}
                className="text-indigo-600"
              />

            </div>

          </div>

          <div className="grid gap-5 p-7 md:grid-cols-2">

            {analytics.insights?.map((insight, index) => (

              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-200 hover:bg-blue-50"
              >

                <div className="flex items-start gap-4">

                  <div className="mt-1 rounded-xl bg-blue-100 p-2">

                    <Sparkles
                      size={18}
                      className="text-blue-600"
                    />

                  </div>

                  <p className="leading-7 text-slate-700">

                    {insight}

                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}