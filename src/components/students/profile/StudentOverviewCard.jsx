import {
  User,
  GraduationCap,
  Wallet,
  CalendarCheck,
  FileBarChart,
  ClipboardList,
  Users,
  Activity,
} from "lucide-react";



export default function StudentOverviewCard({

  student,

}) {



return (

<div className="space-y-8">





{/* Summary Cards */}


<div

className="
grid
gap-5
sm:grid-cols-2
xl:grid-cols-4
"

>



<SummaryCard

icon={GraduationCap}

title="Class"

value={
student?.className
}

color="blue"

/>





<SummaryCard

icon={CalendarCheck}

title="Attendance"

value={
student?.attendance
?
`${student.attendance}%`
:
"0%"
}

color="green"

/>





<SummaryCard

icon={Wallet}

title="Fees"

value={
student?.feeStatus
||
"Pending"
}

color="amber"

/>





<SummaryCard

icon={FileBarChart}

title="Average Result"

value={
student?.averageScore
?
`${student.averageScore}%`
:
"-"
}

color="purple"

/>



</div>









{/* Student Snapshot */}



<section

className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
"

>


<div

className="
mb-6
flex
items-center
gap-3
"

>


<div

className="
rounded-2xl
bg-blue-100
p-3
text-blue-600
"

>

<User size={22}/>

</div>




<div>

<h2

className="
text-xl
font-bold
text-slate-900
"

>

Student Snapshot

</h2>


<p

className="
text-sm
text-slate-500
"

>

Quick overview of student activities.

</p>


</div>


</div>







<div

className="
grid
gap-5
md:grid-cols-2
"

>




<InfoBox

icon={User}

label="Student Name"

value={
getFullName(student)
}

/>





<InfoBox

icon={Users}

label="Parent Linked"

value={

student?.parent?.name

||

"No parent assigned"

}

/>







<InfoBox

icon={ClipboardList}

label="Assignments"

value={

student?.assignmentCount

??

0

}

/>







<InfoBox

icon={Activity}

label="Account Status"

value={

student?.status

||

"Active"

}

/>





</div>


</section>









{/* Recent Activity */}



<section

className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
"

>


<h3

className="
mb-5
font-bold
text-slate-900
"

>

Recent Activity

</h3>




<div

className="
space-y-4
"

>



<ActivityItem

title="Student profile created"

date="Today"

/>



<ActivityItem

title="No recent activity"

date="-"

/>



</div>



</section>








</div>

);


}









function SummaryCard({

icon:Icon,

title,

value,

color,

}){



const colors={


blue:
"bg-blue-100 text-blue-600",


green:
"bg-emerald-100 text-emerald-600",


amber:
"bg-amber-100 text-amber-600",


purple:
"bg-purple-100 text-purple-600",


};



return (

<div

className="
rounded-2xl
border
border-slate-200
bg-white
p-5
shadow-sm
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

className={`
rounded-xl
p-3
${colors[color]}
`}

>

<Icon size={22}/>

</div>




<div>


<p

className="
text-sm
text-slate-500
"

>

{title}

</p>



<p

className="
mt-1
text-xl
font-bold
text-slate-900
"

>

{value || "-"}

</p>



</div>



</div>


</div>

);


}









function InfoBox({

icon:Icon,

label,

value,

}){


return (

<div

className="
rounded-2xl
bg-slate-50
p-4
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
rounded-lg
bg-white
p-2
text-blue-600
"

>

<Icon size={18}/>

</div>




<div>


<p

className="
text-xs
uppercase
tracking-wide
text-slate-400
"

>

{label}

</p>



<p

className="
font-semibold
text-slate-900
"

>

{value || "-"}

</p>


</div>



</div>


</div>

);


}









function ActivityItem({

title,

date,

}){


return (

<div

className="
flex
items-center
justify-between
rounded-xl
bg-slate-50
p-4
"

>


<p

className="
font-medium
text-slate-700
"

>

{title}

</p>



<span

className="
text-sm
text-slate-400
"

>

{date}

</span>


</div>

);


}









function getFullName(student){


return [

student?.firstName,

student?.middleName,

student?.lastName,

]

.filter(Boolean)

.join(" ")

|| "-";


}