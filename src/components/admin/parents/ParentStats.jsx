import {
  Users,
  UserCheck,
  UserX,
  GraduationCap,
  UserPlus,
  Link,
  TrendingUp,
  TrendingDown,
} from "lucide-react";





export default function ParentStats({
  stats = {},
  loading = false,
}) {



  const cards = [


    {
      title:"Total Parents",

      value:
        stats.totalParents || 0,

      icon:Users,

      color:"bg-blue-600",

      change:
        stats.parentGrowth || "+0%",

      positive:true,

      description:
        "Registered parent accounts",

    },




    {
      title:"Active Parents",

      value:
        stats.activeParents || 0,

      icon:UserCheck,

      color:"bg-emerald-600",

      change:
        stats.activeGrowth || "+0%",

      positive:true,

      description:
        "Active school accounts",

    },





    {
      title:"Students Linked",

      value:
        stats.totalStudents || 0,

      icon:GraduationCap,

      color:"bg-purple-600",

      change:
        stats.studentGrowth || "+0%",

      positive:true,

      description:
        "Connected students",

    },





    {
      title:"Unassigned Parents",

      value:
        stats.unassignedParents || 0,

      icon:Link,

      color:"bg-orange-600",

      change:
        stats.unassignedChange || "0%",

      positive:false,

      description:
        "No students assigned",

    },






    {
      title:"New Parents",

      value:
        stats.newParents || 0,

      icon:UserPlus,

      color:"bg-cyan-600",

      change:
        stats.newGrowth || "+0%",

      positive:true,

      description:
        "Added this term",

    },






    {
      title:"Suspended",

      value:
        stats.suspended || 0,

      icon:UserX,

      color:"bg-rose-600",

      change:
        stats.suspendedChange || "-0%",

      positive:false,

      description:
        "Restricted accounts",

    },


  ];







  return (

    <section
    className="
    space-y-6
    "
    >




      <div>


        <h2
        className="
        text-2xl
        font-bold
        text-slate-900
        "
        >

          Parent Overview

        </h2>



        <p
        className="
        mt-1
        text-slate-500
        "
        >

          Monitor parent accounts and student connections.

        </p>


      </div>









      <div
      className="
      grid
      gap-6
      sm:grid-cols-2
      xl:grid-cols-3
      "
      >


      {
        cards.map(card=>(


          <StatCard

          key={card.title}

          {...card}

          loading={loading}

          />


        ))
      }


      </div>





    </section>

  );

}









function StatCard({

  title,

  value,

  icon:Icon,

  color,

  change,

  positive,

  description,

  loading,

}){


return (

<div
className="
relative
overflow-hidden
rounded-3xl
border
border-slate-200
bg-white
p-7
shadow-sm
transition
hover:shadow-xl
"
>


<div
className={`
absolute
right-0
top-0
h-24
w-24
rounded-full
opacity-10
${color}
`}
/>






<div
className="
flex
items-start
justify-between
"
>


<div>


<p
className="
text-sm
font-medium
text-slate-500
"
>

{title}

</p>





<h3
className="
mt-3
text-4xl
font-bold
text-slate-900
"
>

{
loading
?
"..."
:
value
}

</h3>




<p
className="
mt-2
text-sm
text-slate-500
"
>

{description}

</p>



</div>







<div
className={`
flex
h-16
w-16
items-center
justify-center
rounded-2xl
text-white
shadow-lg
${color}
`}
>

<Icon size={30}/>


</div>




</div>









<div
className="
mt-7
flex
items-center
justify-between
"
>


<div
className={`

flex
items-center
gap-2
rounded-full
px-3
py-1
text-sm
font-semibold


${
positive

?

"bg-emerald-100 text-emerald-700"

:

"bg-rose-100 text-rose-700"

}

`}
>


{
positive

?

<TrendingUp size={16}/>

:

<TrendingDown size={16}/>

}



{change}


</div>






<span
className="
text-xs
text-slate-400
"
>

Since last period

</span>



</div>





</div>

);

}