import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Search,
  Users,
  GraduationCap,
  TrendingUp,
  Clock,
  ArrowRight,
  Plus,
} from "lucide-react";

export default function MySubjects() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    // Replace with API later

    setTimeout(() => {
      setSubjects([
        {
          id: 1,
          subject: "Mathematics",
          code: "MTH101",
          className: "SS2 Gold",
          students: 42,
          lessons: 18,
          completed: 14,
          average: 78,
        },
        {
          id: 2,
          subject: "Further Mathematics",
          code: "FM201",
          className: "SS3 Science",
          students: 31,
          lessons: 16,
          completed: 11,
          average: 81,
        },
        {
          id: 3,
          subject: "Statistics",
          code: "STA110",
          className: "SS1 Blue",
          students: 36,
          lessons: 20,
          completed: 17,
          average: 74,
        },
        {
          id: 4,
          subject: "Computer Science",
          code: "CSC101",
          className: "JSS3",
          students: 48,
          lessons: 15,
          completed: 10,
          average: 84,
        },
      ]);

      setLoading(false);
    }, 700);
  }, []);

  const filteredSubjects = useMemo(() => {
    return subjects.filter(
      (s) =>
        s.subject.toLowerCase().includes(search.toLowerCase()) ||
        s.className.toLowerCase().includes(search.toLowerCase())
    );
  }, [subjects, search]);

  const totalStudents = subjects.reduce(
    (a, b) => a + b.students,
    0
  );

  return (
    <div className="space-y-8">

      {/* Hero */}

      <div className="rounded-3xl bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-700 p-8 text-white shadow-xl">

        <div className="flex flex-col lg:flex-row justify-between gap-8">

          <div>

            <p className="uppercase tracking-widest text-blue-200 text-sm">
              Teacher Workspace
            </p>

            <h1 className="text-4xl font-bold mt-2">
              My Subjects
            </h1>

            <p className="text-blue-100 mt-4 max-w-2xl">
              View all assigned subjects, monitor class
              performance, lesson progress and student
              engagement from one dashboard.
            </p>

          </div>

          <button className="self-start flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl shadow hover:scale-105 transition">

            <Plus size={18} />

            New Lesson

          </button>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-4 gap-6">

        <StatCard
          title="Subjects"
          value={subjects.length}
          icon={<BookOpen className="w-7 h-7 text-blue-600" />}
        />

        <StatCard
          title="Students"
          value={totalStudents}
          icon={<Users className="w-7 h-7 text-green-600" />}
        />

        <StatCard
          title="Classes"
          value={new Set(subjects.map((s) => s.className)).size}
          icon={<GraduationCap className="w-7 h-7 text-purple-600" />}
        />

        <StatCard
          title="Average Score"
          value={
            subjects.length
              ? `${Math.round(
                  subjects.reduce(
                    (a, b) => a + b.average,
                    0
                  ) / subjects.length
                )}%`
              : "0%"
          }
          icon={<TrendingUp className="w-7 h-7 text-orange-600" />}
        />

      </div>

      {/* Search */}

      <div className="bg-white rounded-2xl shadow border p-5">

        <div className="relative">

          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />

          <input
            className="w-full border rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Search subject or class..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>

      {/* Cards */}

      {loading ? (
        <div className="grid lg:grid-cols-2 gap-6">

          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-56 rounded-3xl bg-gray-200 animate-pulse"
            />
          ))}

        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">

          {filteredSubjects.map((subject) => {
            const progress =
              (subject.completed /
                subject.lessons) *
              100;

            return (
              <div
                key={subject.id}
                className="bg-white rounded-3xl border shadow-sm hover:shadow-xl transition overflow-hidden"
              >

                <div className="p-7 space-y-6">

                  <div className="flex justify-between items-start">

                    <div>

                      <h2 className="text-2xl font-bold">

                        {subject.subject}

                      </h2>

                      <p className="text-gray-500 mt-1">

                        {subject.code}

                      </p>

                    </div>

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">

                      {subject.className}

                    </span>

                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">

                    <MiniStat
                      value={subject.students}
                      label="Students"
                    />

                    <MiniStat
                      value={subject.lessons}
                      label="Lessons"
                    />

                    <MiniStat
                      value={`${subject.average}%`}
                      label="Average"
                    />

                  </div>

                  <div>

                    <div className="flex justify-between mb-2 text-sm">

                      <span>

                        Lesson Progress

                      </span>

                      <span>

                        {subject.completed}/
                        {subject.lessons}

                      </span>

                    </div>

                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">

                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                        style={{
                          width: `${progress}%`,
                        }}
                      />

                    </div>

                  </div>

                  <div className="flex justify-between items-center pt-2">

                    <div className="flex items-center gap-2 text-gray-500 text-sm">

                      <Clock size={16} />

                      Last updated today

                    </div>

                    <button className="flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700">

                      Open Subject

                      <ArrowRight size={17} />

                    </button>

                  </div>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

/* ========================= */

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow border p-6 flex justify-between items-center">

      <div>

        <p className="text-gray-500 text-sm">

          {title}

        </p>

        <h2 className="text-3xl font-bold mt-2">

          {value}

        </h2>

      </div>

      <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center">

        {icon}

      </div>

    </div>
  );
}

function MiniStat({ value, label }) {
  return (
    <div className="bg-slate-50 rounded-xl py-4">

      <div className="text-xl font-bold">

        {value}

      </div>

      <div className="text-gray-500 text-sm">

        {label}

      </div>

    </div>
  );
}