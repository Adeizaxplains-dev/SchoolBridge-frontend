import {
  Search,
  RotateCw,
  Filter,
} from "lucide-react";

export default function FeeStructureToolbar({
  search = "",
  onSearchChange,
  onRefresh,

  session = "",
  onSessionChange,

  term = "",
  onTermChange,

  className = "",
  onClassChange,
}) {
  return (
    <div
      className="
      rounded-2xl
      border
      border-gray-200
      bg-white
      p-5
      shadow-sm

      dark:border-gray-800
      dark:bg-gray-900
    "
    >
      <div
        className="
        flex
        flex-col
        gap-4

        xl:flex-row
        xl:items-center
        xl:justify-between
      "
      >
        {/* =====================================
            SEARCH
        ===================================== */}

        <div className="relative flex-1 max-w-xl">
          <Search
            className="
            absolute
            left-4
            top-1/2
            h-5
            w-5
            -translate-y-1/2
            text-gray-400
          "
          />

          <input
            type="text"
            value={search}
            placeholder="
            Search by class,
            session or term...
            "
            onChange={(e) =>
              onSearchChange?.(
                e.target.value
              )
            }
            className="
            w-full
            rounded-xl
            border
            border-gray-300
            bg-white
            py-3
            pl-12
            pr-4
            outline-none
            transition

            focus:border-primary

            dark:border-gray-700
            dark:bg-gray-950
          "
          />
        </div>

        {/* =====================================
            FILTERS
        ===================================== */}

        <div
          className="
          flex
          flex-wrap
          items-center
          gap-3
        "
        >
          <div
            className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-gray-200
            px-3
            py-2

            dark:border-gray-700
          "
          >
            <Filter className="h-4 w-4" />

            <span
              className="
              text-sm
              font-medium
            "
            >
              Filters
            </span>
          </div>

          {/* Session */}

          <input
            type="text"
            value={session}
            placeholder="Session"
            onChange={(e) =>
              onSessionChange?.(
                e.target.value
              )
            }
            className="
            w-36
            rounded-xl
            border
            border-gray-300
            px-3
            py-2

            focus:border-primary
            focus:outline-none

            dark:border-gray-700
            dark:bg-gray-950
            "
          />

          {/* Term */}

          <select
            value={term}
            onChange={(e) =>
              onTermChange?.(
                e.target.value
              )
            }
            className="
            rounded-xl
            border
            border-gray-300
            px-3
            py-2

            focus:border-primary
            focus:outline-none

            dark:border-gray-700
            dark:bg-gray-950
            "
          >
            <option value="">
              All Terms
            </option>

            <option value="first">
              First
            </option>

            <option value="second">
              Second
            </option>

            <option value="third">
              Third
            </option>
          </select>

          {/* Class */}

          <input
            type="text"
            value={className}
            placeholder="Class"
            onChange={(e) =>
              onClassChange?.(
                e.target.value
              )
            }
            className="
            w-32
            rounded-xl
            border
            border-gray-300
            px-3
            py-2

            focus:border-primary
            focus:outline-none

            dark:border-gray-700
            dark:bg-gray-950
          "
          />

          {/* Refresh */}

          <button
            onClick={onRefresh}
            className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-gray-300
            px-4
            py-2
            transition

            hover:bg-gray-100

            dark:border-gray-700
            dark:hover:bg-gray-800
          "
          >
            <RotateCw className="h-4 w-4" />

            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}