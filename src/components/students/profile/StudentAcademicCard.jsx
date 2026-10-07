import {
  GraduationCap,
  Hash,
  CalendarDays,
  School,
  Layers,
  Flag,
  BadgeCheck,
} from "lucide-react";



export default function StudentAcademicCard({

  student,

}) {



  return (

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




      {/* Header */}


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
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-2xl
          bg-indigo-100
          text-indigo-600
          "

        >

          <GraduationCap size={22}/>

        </div>





        <div>


          <h2

            className="
            text-xl
            font-bold
            text-slate-900
            "

          >

            Academic Information

          </h2>



          <p

            className="
            text-sm
            text-slate-500
            "

          >

            Admission and class placement details.

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





        <AcademicItem

          icon={Hash}

          label="Admission Number"

          value={
            student?.admissionNumber
          }

        />





        <AcademicItem

          icon={CalendarDays}

          label="Admission Date"

          value={
            formatDate(
              student?.admissionDate
            )
          }

        />





        <AcademicItem

          icon={School}

          label="Current Class"

          value={
            student?.className
          }

        />





        <AcademicItem

          icon={Layers}

          label="Section / Arm"

          value={
            student?.section
          }

        />





        <AcademicItem

          icon={CalendarDays}

          label="Academic Session"

          value={
            student?.session
          }

        />





        <AcademicItem

          icon={Flag}

          label="House"

          value={
            student?.house
          }

        />






        <AcademicItem

          icon={BadgeCheck}

          label="Enrollment Status"

          value={
            student?.status
          }

          badge

        />





      </div>







      {/* Academic Timeline */}



      <div

        className="
        mt-8
        rounded-2xl
        bg-slate-50
        p-5
        "

      >



        <h3

          className="
          mb-4
          font-semibold
          text-slate-900
          "

        >

          Academic Timeline

        </h3>





        <div

          className="
          space-y-4
          "

        >



          <TimelineItem

            title="Admission"

            value={
              formatDate(
                student?.admissionDate
              )
            }

          />



          <TimelineItem

            title="Current Level"

            value={
              student?.className
              ||
              "-"
            }

          />



          <TimelineItem

            title="Status"

            value={
              student?.status
              ||
              "-"
            }

          />




        </div>




      </div>







    </section>

  );

}









function AcademicItem({

  icon:Icon,

  label,

  value,

  badge=false,

}) {



return (

<div

className="
rounded-2xl
border
border-slate-100
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
rounded-xl
bg-white
p-2
text-indigo-600
shadow-sm
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




{
badge

?

<span

className="
mt-1
inline-flex
rounded-full
bg-emerald-100
px-3
py-1
text-sm
font-semibold
text-emerald-700
"

>

{value || "-"}

</span>


:

<p

className="
mt-1
font-semibold
text-slate-900
"

>

{value || "-"}

</p>

}





</div>



</div>


</div>

);


}









function TimelineItem({

title,

value,

}){


return (

<div

className="
flex
items-center
justify-between
border-b
border-slate-200
pb-3
last:border-0
"

>


<span

className="
text-sm
text-slate-500
"

>

{title}

</span>



<span

className="
font-medium
text-slate-900
"

>

{value}

</span>


</div>

);


}









function formatDate(date){


if(!date)
return "-";



return new Date(date)
.toLocaleDateString(
"en-US",
{

year:"numeric",

month:"short",

day:"numeric",

}

);


}