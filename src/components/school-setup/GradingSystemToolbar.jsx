import {
  Search,
  RotateCw,
  Filter,
} from "lucide-react";


export default function GradingSystemToolbar({

  search = "",

  onSearchChange,

  onRefresh,

  status = "",

  onStatusChange,

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

        lg:flex-row
        lg:items-center
        lg:justify-between
        "
      >


        {/* =====================================
            SEARCH
        ===================================== */}


        <div
          className="
          relative
          w-full

          lg:max-w-xl
          "
        >

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

            onChange={(e)=>
              onSearchChange?.(
                e.target.value
              )
            }

            placeholder="
            Search grading systems...
            "

            className="
            w-full
            rounded-xl
            border
            border-gray-300
            py-3
            pl-12
            pr-4
            outline-none

            focus:border-primary

            dark:border-gray-700
            dark:bg-gray-950
            "

          />

        </div>





        {/* =====================================
            FILTER ACTIONS
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
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-gray-200
            px-4
            py-2

            dark:border-gray-700
            "

          >

            <Filter
              className="
              h-4
              w-4
              "
            />


            <span
              className="
              text-sm
              font-medium
              "
            >

              Filters

            </span>


          </div>






          {/* STATUS FILTER */}

          <select

            value={status}

            onChange={(e)=>
              onStatusChange?.(
                e.target.value
              )
            }

            className="
            rounded-xl
            border
            border-gray-300
            px-4
            py-2

            focus:border-primary
            focus:outline-none

            dark:border-gray-700
            dark:bg-gray-950
            "

          >

            <option value="">
              All Systems
            </option>


            <option value="active">
              Active
            </option>


            <option value="inactive">
              Inactive
            </option>


          </select>






          {/* REFRESH */}


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

            <RotateCw
              className="
              h-4
              w-4
              "
            />

            Refresh


          </button>



        </div>


      </div>


    </div>

  );

}