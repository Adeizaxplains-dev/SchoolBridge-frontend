import {
  useNavigate,
} from "react-router-dom";


import {
  Users,
  AlertCircle,
  RefreshCcw,
  UserPlus,
  Upload,
} from "lucide-react";



import useParents from "../../../hooks/useParents";



import ParentStats from "../../../components/admin/parents/ParentStats";
import ParentFilters from "../../../components/admin/parents/ParentFilters";
import ParentTable from "../../../components/admin/parents/ParentTable";






export default function Parents(){


  const navigate =
    useNavigate();




  const {

    parents = [],

    loading,

    error,


    filters,

    updateFilters,


    refresh,


    removeParent,

    suspend,

    activate,


  } = useParents();









  /*
    Temporary fallback stats.

    Later replace with:

    GET /api/parents/dashboard/stats

  */


  const stats = {


    totalParents:
      parents.length,



    activeParents:

      parents.filter(
        parent =>
        parent.status === "Active"
      ).length,



    suspendedParents:

      parents.filter(
        parent =>
        parent.status === "Suspended"
      ).length,



    totalStudents:

      parents.reduce(

        (sum,parent)=>

        sum +
        (
          parent.children?.length || 0
        ),

        0

      ),



    unassignedParents:

      parents.filter(

        parent =>

        !parent.children ||
        parent.children.length === 0

      ).length,


  };











  /*
    Dynamic filter options.

    Later replace with:

    GET /classes

  */


  const classes = [

    ...new Set(

      parents.flatMap(

        parent =>

        parent.children?.map(

          child =>
          child.className

        ) || []

      )

    ),

  ];








  const statuses = [

    {
      value:"Active",
      label:"Active",
    },


    {
      value:"Suspended",
      label:"Suspended",
    },


    {
      value:"Inactive",
      label:"Inactive",
    },

  ];









  const handleExport = async()=>{


    /*
      Future:

      await parentService.exportParents()

    */


    console.log(
      "Export parents"
    );


  };









  return (

    <div
    className="
    space-y-8
    "
    >







      {/* Header */}



      <div
      className="
      flex
      flex-col
      gap-5
      md:flex-row
      md:items-center
      md:justify-between
      "
      >



        <div
        className="
        flex
        items-center
        gap-4
        "
        >


          <div
          className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-blue-600
          text-white
          shadow-lg
          "
          >

            <Users size={28}/>


          </div>





          <div>


            <h1
            className="
            text-3xl
            font-bold
            text-slate-900
            "
            >

              Parents Management

            </h1>



            <p
            className="
            mt-1
            text-slate-500
            "
            >

              Manage parents, student relationships,
              communication and payments.

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





          <button

          onClick={()=>

            navigate(
              "/admin/parents/import"
            )

          }


          className="
          inline-flex
          items-center
          gap-2
          rounded-xl
          border
          border-slate-200
          bg-white
          px-5
          py-3
          text-sm
          font-semibold
          text-slate-700
          hover:bg-slate-50
          "

          >

            <Upload size={18}/>

            Import


          </button>









          <button

          onClick={()=>


            navigate(
              "/admin/parents/add"
            )


          }


          className="
          inline-flex
          items-center
          gap-2
          rounded-xl
          bg-blue-600
          px-5
          py-3
          text-sm
          font-semibold
          text-white
          shadow-sm
          hover:bg-blue-700
          "

          >

            <UserPlus size={18}/>

            Add Parent


          </button>









          <button

          onClick={refresh}


          disabled={loading}


          className="
          inline-flex
          items-center
          gap-2
          rounded-xl
          border
          border-slate-200
          bg-white
          px-5
          py-3
          text-sm
          font-semibold
          text-slate-700
          hover:bg-slate-50
          disabled:opacity-50
          "

          >

            <RefreshCcw

            size={18}

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




        </div>



      </div>









      {/* Statistics */}



      <ParentStats

      stats={stats}

      loading={loading}

      />









      {/* Error */}



      {
        error &&

        <div
        className="
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-red-200
        bg-red-50
        p-5
        text-red-700
        "
        >

          <AlertCircle size={22}/>


          <p>

            {error}

          </p>


        </div>

      }

      {/* Filters */}

      <ParentFilters

      filters={filters}

      classes={classes}

      statuses={statuses}

      loading={loading}

      onFilterChange={
        updateFilters
      }


      onRefresh={
        refresh
      }


      onExport={
        handleExport
      }

      />

      {/* Table */}

      <ParentTable


      parents={parents}


      loading={loading}


      onView={(parent)=>

        navigate(
          `/admin/parents/${parent._id}`
        )

      }


      onEdit={(parent)=>

        navigate(
          `/admin/parents/${parent._id}/edit`
        )

      }


      onDelete={
        removeParent
      }


      onSuspend={
        suspend
      }

      onActivate={
        activate
      }

      />
    </div>

  );

}