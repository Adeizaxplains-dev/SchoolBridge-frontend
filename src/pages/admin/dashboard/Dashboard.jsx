// ============================================================
// src/pages/admin/dashboard/Dashboard.jsx
// SchoolBridge Enterprise Admin Dashboard
// ============================================================


import {
  useEffect,
  useState
} from "react";



import {
  getDashboardAnalytics,
  getFinancialReport,
} from "../../../services/analyticsService";



import {
  getRecentStudents,
} from "../../../services/studentService";



import {
  getSchoolProfile
} from "../../../services/schoolService";



import {
  getDashboardSummary
} from "../../../services/onboardingService";



import AdminHero from "../../../components/admin/dashboard/AdminHero";

import AdminStats from "../../../components/admin/dashboard/AdminStats";

import RevenueOverview from "../../../components/admin/dashboard/RevenueOverview";

import AttendanceOverview from "../../../components/admin/dashboard/AttendanceOverview";

import StudentOverview from "../../../components/admin/dashboard/StudentOverview";

import FinancialOverview from "../../../components/admin/dashboard/FinancialOverview";

import SchoolPerformance from "../../../components/admin/dashboard/SchoolPerformance";

import RecentActivities from "../../../components/admin/dashboard/RecentActivities";

import UpcomingEvents from "../../../components/admin/dashboard/UpcomingEvents";

import SystemHealth from "../../../components/admin/dashboard/SystemHealth";

import ActionCenter from "./ActionCenter";






export default function Dashboard(){



const [school,setSchool] =
useState({});



const [setup,setSetup] =
useState({});



const [analytics,setAnalytics] =
useState({});



const [financial,setFinancial] =
useState({});



const [students,setStudents] =
useState([]);



const [loading,setLoading] =
useState(true);










useEffect(()=>{


loadDashboard();


},[]);








async function loadDashboard(){


setLoading(true);



try{



const [

schoolResult,

setupResult,

analyticsResult,

financialResult,

studentsResult


] = await Promise.allSettled([



getSchoolProfile(),


getDashboardSummary(),


getDashboardAnalytics(),


getFinancialReport(),


getRecentStudents(8)



]);








/*
====================================================
SCHOOL PROFILE
====================================================
*/


if(
schoolResult.status === "fulfilled"
){


const schoolData =

schoolResult.value.data ||

schoolResult.value ||

{};



setSchool(
schoolData
);



}









/*
====================================================
ONBOARDING
====================================================
*/


if(
setupResult.status === "fulfilled"
){


setSetup(

setupResult.value.data ||

setupResult.value ||

{}

);


}










/*
====================================================
ANALYTICS
====================================================
*/


if(
analyticsResult.status === "fulfilled"
){


setAnalytics(

analyticsResult.value.analytics ||

analyticsResult.value.data ||

analyticsResult.value ||

{}

);


}










/*
====================================================
FINANCE
====================================================
*/


if(
financialResult.status === "fulfilled"
){


setFinancial(

financialResult.value.data ||

financialResult.value ||

{}

);


}










/*
====================================================
STUDENTS
====================================================
*/


if(
studentsResult.status === "fulfilled"
){


setStudents(

studentsResult.value.students ||

studentsResult.value.data ||

studentsResult.value ||

[]

);


}




}
catch(error){


console.error(

"Dashboard loading error:",

error

);



}
finally{


setLoading(false);


}



}









if(loading){


return (

<div className="
space-y-8
animate-pulse
">


<div className="
h-56
rounded-3xl
bg-slate-200
"/>



<div className="
grid
lg:grid-cols-4
gap-6
">


{
[1,2,3,4].map(i=>(

<div

key={i}

className="
h-36
rounded-3xl
bg-slate-200
"

/>

))

}


</div>



<div className="
h-[500px]
rounded-3xl
bg-slate-200
"/>


</div>

);


}









return (

<div className="
space-y-8
">







{/* =====================================================
 HERO
===================================================== */}


<AdminHero

school={school}

setup={setup}

analytics={analytics}

financial={financial}

/>









{/* =====================================================
 KPI
===================================================== */}


<AdminStats

school={school}

analytics={analytics}

financial={financial}

/>










{/* =====================================================
 SETUP ACTIONS
===================================================== */}


<ActionCenter

setup={setup}

/>










<RevenueOverview

financial={financial}

/>










<AttendanceOverview

analytics={analytics}

/>










<StudentOverview

analytics={analytics}

students={students}

/>










<SchoolPerformance

analytics={analytics}

/>










<FinancialOverview

financial={financial}

/>










<RecentActivities

analytics={analytics}

/>









<div className="
grid
grid-cols-1
xl:grid-cols-2
gap-8
">


<UpcomingEvents />


<SystemHealth />


</div>







</div>

);


}