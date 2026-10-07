import { useState, useEffect } from "react";
import {
  Search,
  RotateCcw,
  RefreshCw,
  Download,
  Plus,
} from "lucide-react";

export default function TeacherFilters({
  filters = {},
  departments = [],
  subjects = [],
  statuses = [],
  loading = false,
  onFilterChange,
  onRefresh,
  onExport,
  onAddTeacher,
}) {
  const [localFilters, setLocalFilters] = useState({
    search: "",
    department: "",
    subject: "",
    status: "",
    ...filters,
  });

  useEffect(() => {
    setLocalFilters((prev) => ({
      ...prev,
      ...filters,
    }));
  }, [filters]);

  const updateField = (field, value) => {
    const updated = {
      ...localFilters,
      [field]: value,
    };

    setLocalFilters(updated);

    if (onFilterChange) {
      onFilterChange(updated);
    }
  };

  const handleReset = () => {
    const reset = {
      search: "",
      department: "",
      subject: "",
      status: "",
    };

    setLocalFilters(reset);

    onFilterChange?.(reset);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        {/* Filters */}
        <div className="grid flex-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search teachers..."
              value={localFilters.search}
              onChange={(e) =>
                updateField("search", e.target.value)
              }
              className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Department */}
          <select
            value={localFilters.department}
            onChange={(e) =>
              updateField("department", e.target.value)
            }
            className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All Departments</option>

            {departments.map((dept) => (
              <option
                key={dept.value}
                value={dept.value}
              >
                {dept.label}
              </option>
            ))}
          </select>

          {/* Subject */}
          <select
            value={localFilters.subject}
            onChange={(e) =>
              updateField("subject", e.target.value)
            }
            className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All Subjects</option>

            {subjects.map((subject) => (
              <option
                key={subject.value}
                value={subject.value}
              >
                {subject.label}
              </option>
            ))}
          </select>

          {/* Status */}
          <select
            value={localFilters.status}
            onChange={(e) =>
              updateField("status", e.target.value)
            }
            className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All Status</option>

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

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleReset}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RotateCcw size={18} />
            Reset
          </button>

          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={18}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>

          <button
            type="button"
            onClick={onExport}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Download size={18} />
            Export
          </button>

          <button
            type="button"
            onClick={onAddTeacher}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Plus size={18} />
            Add Teacher
          </button>
        </div>
      </div>
    </div>
  );
}