// src/pages/admin/students/Students.jsx

import { useNavigate } from "react-router-dom";
import {
  Users,
  UserPlus,
  Upload,
  RefreshCcw,
  AlertCircle,
} from "lucide-react";

import useStudents from "../../../hooks/useStudents";

import StudentStats from "../../../components/students/StudentStats";
import StudentFilters from "../../../components/students/StudentFilters";
import StudentTable from "../../../components/students/StudentTable";

export default function Students() {
  const navigate = useNavigate();

  const {
    students = [],
    loading,
    error,

    filters,
    updateFilters,

    refresh,

    removeStudent,
    suspend,
    activate,
  } = useStudents();

  /*
    Temporary frontend stats.

    Replace later with:
    GET /students/dashboard/stats
  */

  const stats = {
    totalStudents: students.length,

    activeStudents: students.filter(
      (student) => student.status === "Active"
    ).length,

    suspendedStudents: students.filter(
      (student) => student.status === "Suspended"
    ).length,

    graduatedStudents: students.filter(
      (student) => student.status === "Graduated"
    ).length,

    pendingAdmission: students.filter(
      (student) => student.status === "Pending"
    ).length,

    maleStudents: students.filter(
      (student) => student.gender === "Male"
    ).length,

    femaleStudents: students.filter(
      (student) => student.gender === "Female"
    ).length,
  };

  /*
    Dynamic filters.

    Later fetch from API:
    /classes
    /sections
    /arms
  */

  const classes = [
    ...new Set(
      students
        .map((student) => student.className)
        .filter(Boolean)
    ),
  ];

  const statuses = [
    {
      value: "Active",
      label: "Active",
    },
    {
      value: "Pending",
      label: "Pending",
    },
    {
      value: "Suspended",
      label: "Suspended",
    },
    {
      value: "Graduated",
      label: "Graduated",
    },
  ];

  const handleExport = async () => {
    /*
      Future

      await studentService.exportStudents();
    */

    console.log("Export students");
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">

            <Users size={28} />

          </div>

          <div>

            <h1 className="text-3xl font-bold text-slate-900">
              Students Management
            </h1>

            <p className="mt-1 text-slate-500">
              Manage admissions, profiles, attendance,
              academics and student records.
            </p>

          </div>

        </div>

        <div className="flex flex-wrap gap-3">

          <button
            onClick={() =>
              navigate("/students/import")
            }
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Upload size={18} />
            Import
          </button>

          <button
            onClick={() =>
              navigate("/students/add")
            }
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            <UserPlus size={18} />
            Add Student
          </button>

          <button
            onClick={refresh}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCcw
              size={18}
              className={
                loading ? "animate-spin" : ""
              }
            />

            Refresh

          </button>

        </div>

      </div>

      {/* Statistics */}

      <StudentStats
        stats={stats}
        loading={loading}
      />

      {/* Error */}

      {error && (

        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">

          <AlertCircle size={22} />

          <p>{error}</p>

        </div>

      )}

      {/* Filters */}

      <StudentFilters
        filters={filters}
        classes={classes}
        statuses={statuses}
        loading={loading}
        onFilterChange={updateFilters}
        onRefresh={refresh}
        onExport={handleExport}
      />

      {/* Table */}

      <StudentTable
        students={students}
        loading={loading}
        onView={(student) =>
          navigate(
            `/students/${student._id}`
          )
        }
        onEdit={(student) =>
          navigate(
            `/students/edit/${student._id}/`
          )
        }
        onDelete={removeStudent}
        onSuspend={suspend}
        onActivate={activate}
      />

    </div>
  );
}