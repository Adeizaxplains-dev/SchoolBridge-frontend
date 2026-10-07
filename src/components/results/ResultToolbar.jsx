import {
  Search,
  Plus,
  RefreshCw,
  Filter,
} from "lucide-react";

export default function ResultToolbar({
  search,
  setSearch,
  term,
  setTerm,
  session,
  setSession,
  status,
  setStatus,
  onCreate,
  onRefresh,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>

          <h2 className="text-lg font-semibold text-gray-900">
            Saved Results
          </h2>

          <p className="text-sm text-gray-500">
            Search, filter and manage student results.
          </p>

        </div>

        <div className="flex gap-3">

          {onRefresh && (
            <button
              onClick={onRefresh}
              className="flex items-center gap-2 border border-gray-200 hover:bg-gray-100 px-4 py-2 rounded-xl transition"
            >
              <RefreshCw size={18} />
              Refresh
            </button>
          )}

          <button
            onClick={onCreate}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"
          >
            <Plus size={18} />
            Create Result
          </button>

        </div>

      </div>

      {/* Filters */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mt-6">

        {/* Search */}

        <div className="relative xl:col-span-2">

          <Search
            size={18}
            className="absolute left-4 top-3 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search student, admission number..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />

        </div>

        {/* Term */}

        <select
          value={term}
          onChange={(e) =>
            setTerm(e.target.value)
          }
          className="rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">
            All Terms
          </option>

          <option value="First Term">
            First Term
          </option>

          <option value="Second Term">
            Second Term
          </option>

          <option value="Third Term">
            Third Term
          </option>

        </select>

        {/* Session */}

        <select
          value={session}
          onChange={(e) =>
            setSession(e.target.value)
          }
          className="rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">
            All Sessions
          </option>

          <option value="2024/2025">
            2024/2025
          </option>

          <option value="2025/2026">
            2025/2026
          </option>

          <option value="2026/2027">
            2026/2027
          </option>

          <option value="2027/2028">
            2027/2028
          </option>

        </select>

        {/* Status */}

        <div className="relative">

          <Filter
            size={18}
            className="absolute left-4 top-3 text-gray-400"
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
          >
            <option value="">
              All Status
            </option>

            <option value="draft">
              Draft
            </option>

            <option value="approved">
              Approved
            </option>

            <option value="published">
              Published
            </option>

            <option value="sent">
              Sent
            </option>

          </select>

        </div>

      </div>

    </div>
  );
}