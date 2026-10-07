// src/pages/admin/school-setup/Overview.jsx

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  Building2,
  CalendarDays,
  BookOpen,
  GraduationCap,
  Users,
  Home,
  Wallet,
  ClipboardCheck,
} from "lucide-react";


import useOnboarding from "../../../hooks/useOnboarding";

import SetupHeader from "../../../components/school-setup/SetupHeader";
import SetupProgress from "../../../components/school-setup/SetupProgress";
import SetupSummaryGrid from "../../../components/school-setup/SetupSummaryGrid";
import SetupModulesGrid from "../../../components/school-setup/SetupModulesGrid";
import SetupNextAction from "../../../components/school-setup/SetupNextAction";
import SetupSkeleton from "../../../components/school-setup/SetupSkeleton";
import SetupEmptyState from "../../../components/school-setup/SetupEmptyState";
import useSchoolSetup from "../../../hooks/useSchoolSetup";



/*
=========================================================
MODULE PRESENTATION CONFIG

UI configuration only.

No API data.
No statistics.
No database values.

=========================================================
*/

const MODULE_CONFIG = [

  {
    key: "profile",
    title: "School Profile",
    description:
      "Configure school identity, contact details and branding.",
    icon: Building2,
    route: "/admin/school-setup/profile",
  },


  {
    key: "sessions",
    title: "Academic Sessions",
    description:
      "Create and manage academic sessions.",
    icon: CalendarDays,
    route:
      "/admin/school-setup/academic-sessions",
  },


  {
    key: "terms",
    title: "Terms",
    description:
      "Configure academic terms.",
    icon: ClipboardCheck,
    route:
      "/admin/school-setup/terms",
  },


  {
    key: "classes",
    title: "Classes",
    description:
      "Manage school classes.",
    icon: GraduationCap,
    route:
      "/admin/school-setup/classes",
  },


  {
    key: "subjects",
    title: "Subjects",
    description:
      "Configure subjects used by teachers and results.",
    icon: BookOpen,
    route:
      "/admin/school-setup/subjects",
  },


  {
    key: "departments",
    title: "Departments",
    description:
      "Manage academic departments.",
    icon: Users,
    route:
      "/admin/school-setup/departments",
  },


  {
    key: "houses",
    title: "Houses",
    description:
      "Configure school houses.",
    icon: Home,
    route:
      "/admin/school-setup/houses",
  },


  {
    key: "fees",
    title: "Fee Structure",
    description:
      "Configure school fee structure.",
    icon: Wallet,
    route:
      "/admin/school-setup/fee-structure",
  },

];




export default function Overview() {


  const navigate = useNavigate();


  const {
    loading,
    error,
    getSchoolSetupOverview,
  } = useSchoolSetup();



  const [overview, setOverview] = useState(null);




  /*
  ========================================================
  LOAD SCHOOL SETUP DATA
  ========================================================
  */

  const loadOverview = useCallback(async () => {

    try {

      const data =
        await getSchoolSetupOverview();


      setOverview(data);


    } catch (err) {


      console.error(
        "School Setup Overview Error:",
        err
      );


    }


  }, [
    getSchoolSetupOverview,
  ]);






  /*
  ========================================================
  INITIAL LOAD
  ========================================================
  */

  useEffect(() => {

    loadOverview();

  }, [
    loadOverview,
  ]);






  /*
  ========================================================
  NAVIGATION
  ========================================================
  */

  const handleNavigate = useCallback(
    (route) => {

      if(route){

        navigate(route);

      }

    },
    [
      navigate,
    ]
  );







  /*
  ========================================================
  LOADING STATE
  ========================================================
  */

  if(loading){

    return (

      <SetupSkeleton />

    );

  }






  /*
  ========================================================
  ERROR STATE
  ========================================================
  */

  if(error){

    return (

      <SetupEmptyState

        title="Unable to load school setup"

        description={error}

        actionLabel="Retry"

        onAction={loadOverview}

      />

    );

  }






  /*
  ========================================================
  EMPTY STATE
  ========================================================
  */

  if(!overview){

    return (

      <SetupEmptyState

        title="No setup information available"

        description="
        School setup data is currently unavailable.
        Please try again.
        "

        actionLabel="Refresh"

        onAction={loadOverview}

      />

    );

  }







  /*
  ========================================================
  PREPARE MODULE DATA

  Merge frontend UI config
  with backend setup status.

  ========================================================
  */


  const modules =
    MODULE_CONFIG.map((module)=>{


      const status =
        overview.progress?.items?.find(
          item =>
            item.key === module.key
        );



      return {

        ...module,


        completed:
          status?.completed ?? false,


        badge:
          overview.summary?.[module.key]
            ? `${overview.summary[module.key]}`
            : undefined,

      };


    });







  /*
  ========================================================
  PAGE
  ========================================================
  */

  return (

    <div className="space-y-8">



      {/* HEADER */}

      <SetupHeader

        title="School Setup"

        description="
        Configure your school's master data.
        These settings power Students, Teachers,
        Attendance, Results, Assignments and Fees.
        "

      />






      {/* PROGRESS */}

      <SetupProgress

        progress={
          overview.progress
        }

      />







      {/* SUMMARY */}

      <SetupSummaryGrid

        summary={
          overview.summary ?? {}
        }

        onNavigate={
          handleNavigate
        }

      />







      {/* MODULES */}

      <SetupModulesGrid

        modules={modules}

        onNavigate={
          handleNavigate
        }

      />







      {/* NEXT ACTION */}

      <SetupNextAction

        action={
          overview.nextAction
        }

        onNavigate={
          handleNavigate
        }

      />



    </div>

  );

}
