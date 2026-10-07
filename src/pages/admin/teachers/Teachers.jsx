import { useNavigate } from "react-router-dom";

import {
  Users,
  AlertCircle,
  RefreshCcw,
} from "lucide-react";


import useTeachers from "../../../hooks/useTeachers";
import TeacherStats 
from "../../../components/teachers/TeacherStats";
import TeacherFilters from "../../../components/teachers/TeacherFilters";

import TeacherTable from "../../../components/teachers/TeacherTable";



export default function Teachers() {


  const navigate = useNavigate();



  const {

    teachers,

    loading,

    error,


    filters,

    updateFilters,


    refresh,


    removeTeacher,

    suspend,

    activate,


  } = useTeachers();









  /*
    Temporary frontend stats.

    Later replace with:
    GET /teachers/stats

  */

  const stats = {


    totalTeachers:
      teachers.length,



    activeTeachers:
      teachers.filter(
        teacher =>
        teacher.status === "Active"
      ).length,



    onLeave:
      teachers.filter(
        teacher =>
        teacher.status === "On Leave"
      ).length,



    suspended:
      teachers.filter(
        teacher =>
        teacher.status === "Suspended"
      ).length,



    unassignedTeachers:
      teachers.filter(
        teacher =>
        !teacher.classes ||
        teacher.classes.length === 0
      ).length,


  };









  /*
    Dynamic filters

    Later these come from:
    /departments
    /subjects

  */


  const departments = [
    ...new Set(
      teachers
      .map(
        teacher =>
        teacher.department
      )
      .filter(Boolean)
    ),
  ];



  const subjects = [
    ...new Set(

      teachers
      .flatMap(
        teacher =>
        teacher.subjects || []
      )
      .map(
        subject =>
        subject.name || subject
      )

    ),
  ];





  const statuses = [

    {
      value:"Active",
      label:"Active",
    },


    {
      value:"On Leave",
      label:"On Leave",
    },


    {
      value:"Suspended",
      label:"Suspended",
    },

  ];









  const handleExport = ()=>{


    /*
      Connect later:

      teacherService.exportTeachers()

    */


    console.log(
      "Export teachers"
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


          <div
          className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          bg-blue-600
          text-white
          shadow-lg
          "
          >

            <Users size={26}/>


          </div>





          <div>


            <h1
            className="
            text-3xl
            font-bold
            text-slate-900
            "
            >

              Teachers Management

            </h1>



            <p
            className="
            mt-1
            text-slate-500
            "
            >

              Manage teachers, assignments, schedules and performance.

            </p>


          </div>



        </div>








        <button

        onClick={refresh}

        disabled={loading}

        className="
        inline-flex
        items-center
        justify-center
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
        shadow-sm
        transition
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









      {/* Stats */}

      <TeacherStats

      stats={stats}

      loading={loading}

      />









      {/* Error */}

      {
        error && (

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

        )

      }









      {/* Filters */}

      <TeacherFilters


      filters={filters}


      departments={departments}


      subjects={subjects}


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


      onAddTeacher={()=>


        navigate(
          "/admin/teachers/add"
        )


      }


      />









      {/* Table */}


      <TeacherTable


      teachers={teachers}


      loading={loading}


      onDelete={
        removeTeacher
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