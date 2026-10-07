import {
  GraduationCap,
  Users,
  UserCheck,
  UserPlus,
  Search,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function StudentOverview({
  analytics = {},
  students = [],
}) {

  const [search, setSearch] = useState("");

  /*
  ==========================================
  FILTER STUDENTS
  ==========================================
  */

  const filteredStudents = useMemo(() => {

    return students
      .filter((student) => {

        const keyword = `${student.name || ""} ${student.admissionNumber || ""}`;

        return keyword
          .toLowerCase()
          .includes(search.toLowerCase());

      })
      .slice(0, 8);

  }, [students, search]);

  /*
  ==========================================
  ANALYTICS
  ==========================================
  */

  const totalStudents =
    analytics?.totalStudents ??
    students.length ??
    0;

  const activeStudents =
    analytics?.activeStudents ??
    totalStudents;

  const newAdmissions =
    analytics?.newAdmissions ??
    0;

  const graduatedStudents =
    analytics?.graduatedStudents ??
    0;

  const growth =
    analytics?.studentGrowth ??
    analytics?.growth ??
    0;

  return (

    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* =====================================
          HEADER
      ====================================== */}

      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,white,transparent_60%)] opacity-10" />

        <div className="relative p-8">

          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">

            <div className="flex items-center gap-5">

              <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/20 bg-white/10 backdrop-blur">

                <GraduationCap
                  size={38}
                  className="text-white"
                />

              </div>

              <div>

                <h2 className="text-3xl font-bold text-white">

                  Student Overview

                </h2>

                <p className="mt-2 max-w-xl text-blue-100 leading-7">

                  Monitor student enrollment,
                  admissions, graduation,
                  and recent learners from
                  one unified dashboard.

                </p>

              </div>

            </div>

            <Link
              to="/students"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:shadow-xl"
            >

              View Students

              <ArrowUpRight size={18} />

            </Link>

          </div>

        </div>

      </div>

      {/* =====================================
          CONTENT
      ====================================== */}

      <div className="space-y-8 p-8">

        {/* KPI */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Total Students"
            value={totalStudents}
            subtitle="Registered learners"
            icon={Users}
            color="blue"
          />

          <StatCard
            title="Active Students"
            value={activeStudents}
            subtitle="Currently enrolled"
            icon={UserCheck}
            color="emerald"
          />

          <StatCard
            title="New Admissions"
            value={newAdmissions}
            subtitle="This session"
            icon={UserPlus}
            color="amber"
          />

          <StatCard
            title="Graduated"
            value={graduatedStudents}
            subtitle="Completed students"
            icon={GraduationCap}
            color="purple"
          />

        </div>

        {/* Analytics Banner */}

        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50 p-6">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h3 className="text-xl font-bold text-slate-800">

                Enrollment Analytics

              </h3>

              <p className="mt-2 text-slate-500 leading-7">

                Search students instantly,
                monitor admissions and keep
                track of enrollment trends
                across your institution.

              </p>

            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-emerald-100 px-5 py-4">

              <TrendingUp
                size={28}
                className="text-emerald-600"
              />

              <div>

                <p className="text-2xl font-bold text-emerald-700">

                  {growth}%

                </p>

                <p className="text-sm text-emerald-700">

                  Enrollment Growth

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Search */}

        <div className="relative">

          <Search
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search by student name or admission number..."
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 py-4 pl-14 pr-5 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* =====================================
            STUDENT TABLE
            CONTINUES IN PART 2
        ====================================== */}
                {/* ================================
            STUDENT TABLE
        ================================= */}

        <div className="overflow-hidden rounded-3xl border border-slate-200">

          {/* Table Header */}

          <div className="hidden grid-cols-12 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-600 md:grid">

            <div className="col-span-5">
              Student
            </div>

            <div className="col-span-2">
              Class
            </div>

            <div className="col-span-2">
              Admission No.
            </div>

            <div className="col-span-2">
              Status
            </div>

            <div className="col-span-1 text-right">
              Action
            </div>

          </div>

          {/* Table Body */}

          <div>

            {filteredStudents.length > 0 ? (

              filteredStudents.map((student) => (

                <StudentRow
                  key={student._id}
                  student={student}
                />

              ))

            ) : (

              <EmptyState />

            )}

          </div>

        </div>

        {/* ================================
            MOBILE CARDS
        ================================= */}

        <div className="space-y-4 md:hidden">

          {filteredStudents.length > 0 ? (

            filteredStudents.map((student) => (

              <div
                key={student._id}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">

                    {(student.name || "?")
                      .charAt(0)
                      .toUpperCase()}

                  </div>

                  <div className="min-w-0 flex-1">

                    <h4 className="truncate font-semibold text-slate-800">

                      {student.name}

                    </h4>

                    <p className="text-sm text-slate-500">

                      {student.class || "Not Assigned"}

                    </p>

                  </div>

                </div>

                <div className="mt-5 grid grid-cols-2 gap-4 text-sm">

                  <div>

                    <p className="text-slate-400">
                      Admission No.
                    </p>

                    <p className="mt-1 font-medium">

                      {student.admissionNumber || "--"}

                    </p>

                  </div>

                  <div>

                    <p className="text-slate-400">

                      Status

                    </p>

                    <StatusBadge
                      status={
                        student.status ||
                        "Active"
                      }
                    />

                  </div>

                </div>

                <Link
                  to={`/students/${student._id}`}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 font-semibold text-blue-700 transition hover:bg-blue-600 hover:text-white"
                >

                  View Profile

                </Link>

              </div>

            ))

          ) : (

            <EmptyState />

          )}

        </div>

      </div>

    </section>
);

/* ===========================================
   HELPER COMPONENTS
   CONTINUE IN PART 3
=========================================== */
function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
}) {

  const colors = {

    blue:
      "bg-blue-100 text-blue-600",

    emerald:
      "bg-emerald-100 text-emerald-600",

    amber:
      "bg-amber-100 text-amber-600",

    purple:
      "bg-purple-100 text-purple-600",

  };

  return (

    <div className="rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">

            {title}

          </p>

          <h3 className="mt-4 text-4xl font-bold text-slate-800">

            {value}

          </h3>

          <p className="mt-3 text-sm text-slate-400">

            {subtitle}

          </p>

        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl ${colors[color]}`}
        >

          <Icon size={30} />

        </div>

      </div>

    </div>

  );

}

/* ========================================= */

function StudentRow({

  student,

}) {

  const initials =

    (student?.name || "?")
      .charAt(0)
      .toUpperCase();

  return (

    <div className="hidden grid-cols-12 items-center border-t border-slate-100 px-6 py-5 transition hover:bg-slate-50 md:grid">

      <div className="col-span-5 flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">

          {initials}

        </div>

        <div>

          <h4 className="font-semibold text-slate-800">

            {student.name || "Unnamed Student"}

          </h4>

          <p className="text-sm text-slate-500">

            {student.phone || "No Phone"}

          </p>

        </div>

      </div>

      <div className="col-span-2">

        <span className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700">

          {student.class || "-"}

        </span>

      </div>

      <div className="col-span-2 text-slate-600">

        {student.admissionNumber || "--"}

      </div>

      <div className="col-span-2">

        <StatusBadge

          status={
            student.status ||
            "Active"
          }

        />

      </div>

      <div className="col-span-1 text-right">

        <Link
          to={`/students/${student._id}`}
          className="inline-flex items-center rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
        >

          View

        </Link>

      </div>

    </div>

  );

}

/* ========================================= */

function StatusBadge({

  status,

}) {

  const value =
    (status || "Active")
      .toLowerCase();

  let classes =
    "bg-slate-100 text-slate-700";

  if (value === "active") {

    classes =
      "bg-emerald-100 text-emerald-700";

  }

  if (value === "inactive") {

    classes =
      "bg-red-100 text-red-700";

  }

  if (value === "graduated") {

    classes =
      "bg-purple-100 text-purple-700";

  }

  if (value === "pending") {

    classes =
      "bg-amber-100 text-amber-700";

  }

  return (

    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${classes}`}
    >

      {status || "Active"}

    </span>

  );

}

/* ========================================= */

function EmptyState() {

  return (

    <div className="flex flex-col items-center justify-center px-8 py-20">

      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-100">

        <Users
          size={42}
          className="text-slate-400"
        />

      </div>

      <h3 className="mt-8 text-2xl font-bold text-slate-700">

        No Students Found

      </h3>

      <p className="mt-3 max-w-md text-center leading-7 text-slate-500">

        There are currently no students
        matching your search. Once
        students are added to your
        school, they will appear here.

      </p>

      <Link
        to="/students/create"
        className="mt-8 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >

        Register Student

      </Link>

    </div>

  );

};}