// src/components/school-setup/SetupSummaryGrid.jsx

import PropTypes from "prop-types";

import {
  CalendarDays,
  GraduationCap,
  BookOpen,
  Users,
  Home,
  Wallet,
  ClipboardCheck,
  Building2,
} from "lucide-react";

import SetupCard from "./SetupCard";


/*
=========================================================
SUMMARY CONFIGURATION

Presentation only.

No API data.
No calculations.

=========================================================
*/

const SUMMARY_ITEMS = [
  {
    key: "profile",
    title: "School Profile",
    description: "School information configured",
    icon: Building2,
    route: "/admin/school-setup/profile",
  },

  {
    key: "sessions",
    title: "Academic Sessions",
    description: "Configured sessions",
    icon: CalendarDays,
    route: "/admin/school-setup/academic-sessions",
  },

  {
    key: "classes",
    title: "Classes",
    description: "Configured classes",
    icon: GraduationCap,
    route: "/admin/school-setup/classes",
  },

  {
    key: "subjects",
    title: "Subjects",
    description: "Configured subjects",
    icon: BookOpen,
    route: "/admin/school-setup/subjects",
  },

  {
    key: "departments",
    title: "Departments",
    description: "Academic departments",
    icon: Users,
    route: "/admin/school-setup/departments",
  },

  {
    key: "houses",
    title: "Houses",
    description: "School houses",
    icon: Home,
    route: "/admin/school-setup/houses",
  },

  {
    key: "fees",
    title: "Fee Structure",
    description: "Fee configurations",
    icon: Wallet,
    route: "/admin/school-setup/fee-structure",
  },

  {
    key: "terms",
    title: "Terms",
    description: "Academic terms",
    icon: ClipboardCheck,
    route: "/admin/school-setup/terms",
  },
];



export default function SetupSummaryGrid({
  summary = {},
  onNavigate,
  loading = false,
  className = "",
}) {


  return (

    <section className={className}>


      {/* HEADER */}

      <div className="mb-6">

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">

          Setup Overview

        </h2>


        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">

          Monitor the configuration status of your
          school's master data.

        </p>

      </div>



      {/* GRID */}

      <div
        className="
        grid
        gap-6
        sm:grid-cols-2
        xl:grid-cols-4
        "
      >


        {SUMMARY_ITEMS.map((item)=>(

          <SetupCard

            key={item.key}


            title={item.title}


            description={item.description}


            icon={item.icon}


            value={
              loading
              ? null
              : summary[item.key] ?? 0
            }


            loading={loading}


            onClick={() =>
              onNavigate?.(
                item.route
              )
            }

          />

        ))}


      </div>


    </section>

  );

}



SetupSummaryGrid.propTypes = {

  summary: PropTypes.object,


  loading: PropTypes.bool,


  onNavigate: PropTypes.func,


  className: PropTypes.string,

};