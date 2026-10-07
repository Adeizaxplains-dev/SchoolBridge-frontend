import {
  User,
  GraduationCap,
  CalendarCheck,
  FileBarChart,
  Wallet,
  ClipboardList,
  FileText,
  HeartPulse,
  ShieldAlert,
} from "lucide-react";



const TABS = [

  {
    id:"overview",
    label:"Overview",
    icon:User,
  },


  {
    id:"academic",
    label:"Academic",
    icon:GraduationCap,
  },


  {
    id:"attendance",
    label:"Attendance",
    icon:CalendarCheck,
  },


  {
    id:"results",
    label:"Results",
    icon:FileBarChart,
  },


  {
    id:"fees",
    label:"Fees",
    icon:Wallet,
  },


  {
    id:"assignments",
    label:"Assignments",
    icon:ClipboardList,
  },


  {
    id:"documents",
    label:"Documents",
    icon:FileText,
  },


  {
    id:"medical",
    label:"Medical",
    icon:HeartPulse,
  },


  {
    id:"discipline",
    label:"Discipline",
    icon:ShieldAlert,
  },


];







export default function StudentProfileTabs({

  activeTab,

  onChange,

}) {



return (

<div

className="
rounded-2xl
border
border-slate-200
bg-white
p-2
shadow-sm
"

>


<div

className="
flex
gap-2
overflow-x-auto
"

>



{

TABS.map((tab)=>{


const Icon =
tab.icon;


const active =
activeTab === tab.id;



return (

<button

key={
tab.id
}

type="button"

onClick={()=>


onChange(
tab.id
)


}

className={`

flex
shrink-0
items-center
gap-2
rounded-xl
px-4
py-3
text-sm
font-medium
transition


${
active

?

"bg-blue-600 text-white shadow-sm"

:

"text-slate-600 hover:bg-slate-100"

}

`}

>


<Icon size={17}/>


{tab.label}



</button>


);


})


}



</div>


</div>


);


}