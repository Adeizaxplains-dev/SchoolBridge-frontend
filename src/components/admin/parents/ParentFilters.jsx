import {
  Search,
  Filter,
  RefreshCcw,
  Download,
  UserPlus,
  X,
} from "lucide-react";





export default function ParentFilters({

  filters = {},

  classes = [],

  statuses = [],

  loading = false,

  onFilterChange,

  onRefresh,

  onExport,

  onAddParent,

}) {



  const clearFilters = ()=>{


    onFilterChange?.({

      search:"",
      className:"",
      status:"",

    });


  };







  const hasFilters =

    filters.search ||

    filters.className ||

    filters.status;







  return (

    <div
    className="
    rounded-3xl
    border
    border-slate-200
    bg-white
    p-6
    shadow-sm
    space-y-5
    "
    >







      {/* Header */}


      <div
      className="
      flex
      flex-col
      gap-4
      md:flex-row
      md:items-center
      md:justify-between
      "
      >



        <div
        className="
        flex
        items-center
        gap-3
        "
        >


          <Filter
          className="text-blue-600"
          size={22}
          />


          <div>


            <h2
            className="
            font-bold
            text-slate-900
            "
            >

              Parent Filters

            </h2>


            <p
            className="
            text-sm
            text-slate-500
            "
            >

              Search and organize parent accounts.

            </p>


          </div>


        </div>








        <div
        className="
        flex
        flex-wrap
        gap-3
        "
        >


          {
            hasFilters && (

              <button

              onClick={clearFilters}

              className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              px-4
              py-2
              text-sm
              font-semibold
              text-slate-600
              hover:bg-slate-50
              "

              >

                <X size={16}/>

                Clear

              </button>

            )
          }







          <button

          onClick={onRefresh}

          disabled={loading}

          className="
          inline-flex
          items-center
          gap-2
          rounded-xl
          border
          border-slate-200
          px-4
          py-2
          text-sm
          font-semibold
          text-slate-700
          hover:bg-slate-50
          disabled:opacity-50
          "

          >

            <RefreshCcw

            size={16}

            className={
              loading
              ?
              "animate-spin"
              :
              ""
            }

            />

            Refresh

          </button>







          <button

          onClick={onExport}

          className="
          inline-flex
          items-center
          gap-2
          rounded-xl
          border
          border-slate-200
          px-4
          py-2
          text-sm
          font-semibold
          text-slate-700
          hover:bg-slate-50
          "

          >

            <Download size={16}/>

            Export

          </button>







          <button

          onClick={onAddParent}

          className="
          inline-flex
          items-center
          gap-2
          rounded-xl
          bg-blue-600
          px-4
          py-2
          text-sm
          font-semibold
          text-white
          hover:bg-blue-700
          "

          >

            <UserPlus size={16}/>

            Add Parent

          </button>



        </div>


      </div>









      {/* Filters */}



      <div
      className="
      grid
      gap-4
      md:grid-cols-3
      "
      >








        {/* Search */}


        <div
        className="
        relative
        "
        >

          <Search

          size={18}

          className="
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          text-slate-400
          "

          />



          <input


          value={
            filters.search || ""
          }


          onChange={(e)=>

            onFilterChange?.({

              search:
              e.target.value

            })

          }


          placeholder="
          Search parent name, email or phone
          "


          className="
          w-full
          rounded-xl
          border
          border-slate-200
          py-3
          pl-10
          pr-4
          outline-none
          focus:border-blue-500
          "
          />


        </div>









        {/* Class Filter */}


        <select


        value={
          filters.className || ""
        }


        onChange={(e)=>

          onFilterChange?.({

            className:
            e.target.value

          })

        }


        className="
        rounded-xl
        border
        border-slate-200
        px-4
        py-3
        outline-none
        focus:border-blue-500
        "

        >


          <option value="">

            All Classes

          </option>


          {
            classes.map(
              item=>(

              <option

              key={item}

              value={item}

              >

                {item}

              </option>

              )
            )
          }


        </select>









        {/* Status Filter */}



        <select


        value={
          filters.status || ""
        }


        onChange={(e)=>

          onFilterChange?.({

            status:
            e.target.value

          })

        }


        className="
        rounded-xl
        border
        border-slate-200
        px-4
        py-3
        outline-none
        focus:border-blue-500
        "

        >



          <option value="">

            All Status

          </option>




          {
            statuses.map(
              status=>(

              <option

              key={
                status.value
              }

              value={
                status.value
              }

              >

                {
                  status.label
                }

              </option>

              )
            )
          }



        </select>







      </div>








    </div>

  );

}