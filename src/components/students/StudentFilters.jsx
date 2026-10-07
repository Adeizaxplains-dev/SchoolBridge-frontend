// src/components/students/StudentFilters.jsx

import {
  Search,
  Filter,
  RotateCw,
  Download,
  UserPlus,
} from "lucide-react";

export default function StudentFilters({
  filters = {},
  classes = [],
  statuses = [],
  loading = false,

  onFilterChange,
  onRefresh,
  onExport,
  onAddStudent,
}) {
  const handleChange = (key, value) => {
    onFilterChange?.({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-100 p-6">

        <div className="flex items-center gap-2">

          <Filter
            size={20}
            className="text-blue-600"
          />

          <h2 className="text-lg font-semibold text-slate-900">
            Filter Students
          </h2>

        </div>

      </div>

      <div className="space-y-6 p-6">

        {/* Filters */}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

          {/* Search */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Search
            </label>

            <div className="relative">

              <Search
                size={18}
                className="absolute left-3 top-3.5 text-slate-400"
              />

              <input
                type="text"
                placeholder="Name, admission no..."
                value={filters.search || ""}
                onChange={(e) =>
                  handleChange(
                    "search",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500"
              />

            </div>

          </div>

          {/* Class */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Class
            </label>

            <select
              value={filters.class || ""}
              onChange={(e) =>
                handleChange(
                  "class",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="">
                All Classes
              </option>

              {classes.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}

            </select>

          </div>

          {/* Status */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Status
            </label>

            <select
              value={filters.status || ""}
              onChange={(e) =>
                handleChange(
                  "status",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="">
                All Status
              </option>

              {statuses.map((status) => (
                <option
                  key={status.value}
                  value={status.value}
                >
                  {status.label}
                </option>
              ))}

            </select>

          </div>

          {/* Gender */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Gender
            </label>

            <select
              value={filters.gender || ""}
              onChange={(e) =>
                handleChange(
                  "gender",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="">
                All Genders
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

            </select>

          </div>

        </div>

        {/* Actions */}

        <div className="flex flex-wrap justify-end gap-3">

          <button
            onClick={onRefresh}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            <RotateCw
              size={18}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh

          </button>

          <button
            onClick={onExport}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Download size={18} />

            Export

          </button>

          <button
            onClick={onAddStudent}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <UserPlus size={18} />

            Add Student

          </button>

        </div>

      </div>

    </div>
  );
}