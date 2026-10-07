import {
  User,
  GraduationCap,
  BadgeCheck,
  CalendarDays,
} from "lucide-react";



export default function StudentProfileHeader({

  student,

}) {



  const fullName = [

    student?.firstName,

    student?.middleName,

    student?.lastName,

  ]

  .filter(Boolean)

  .join(" ");






  return (

    <section

      className="
      overflow-hidden
      rounded-3xl
      border
      border-slate-200
      bg-white
      shadow-sm
      "

    >



      {/* Cover */}


      <div

        className="
        h-32
        bg-gradient-to-r
        from-blue-600
        to-indigo-600
        "

      />






      <div

        className="
        relative
        px-8
        pb-8
        "

      >





        {/* Avatar */}


        <div

          className="
          -mt-16
          flex
          items-end
          justify-between
          "

        >



          <div

            className="
            flex
            h-32
            w-32
            items-center
            justify-center
            overflow-hidden
            rounded-3xl
            border-4
            border-white
            bg-slate-100
            shadow-lg
            "

          >


            {

              student?.passport

              ?

              <img

                src={student.passport}

                alt={fullName}

                className="
                h-full
                w-full
                object-cover
                "

              />

              :

              <User

                size={55}

                className="
                text-slate-400
                "

              />

            }



          </div>





          {/* Status */}


          <StatusBadge

            status={
              student?.status
            }

          />



        </div>









        {/* Information */}


        <div

          className="
          mt-6
          flex
          flex-col
          gap-6
          lg:flex-row
          lg:items-center
          lg:justify-between
          "

        >




          <div>



            <h1

              className="
              text-3xl
              font-bold
              text-slate-900
              "

            >

              {fullName || "Student Name"}

            </h1>




            <p

              className="
              mt-2
              text-slate-500
              "

            >

              Admission Number:

              <span
                className="
                ml-2
                font-semibold
                text-slate-700
                "
              >

                {student?.admissionNumber || "-"}

              </span>


            </p>



          </div>









          <div

            className="
            grid
            gap-4
            sm:grid-cols-3
            "

          >





            <QuickInfo

              icon={GraduationCap}

              label="Class"

              value={
                student?.className
              }

            />





            <QuickInfo

              icon={CalendarDays}

              label="Session"

              value={
                student?.session
              }

            />





            <QuickInfo

              icon={BadgeCheck}

              label="Status"

              value={
                student?.status
              }

            />




          </div>





        </div>




      </div>




    </section>

  );

}









function QuickInfo({

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
rounded-xl
bg-white
p-2
text-blue-600
shadow-sm
"

>

<Icon size={18}/>

</div>



<div>


<p

className="
text-xs
text-slate-500
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









function StatusBadge({

status

}){


const active =
status === "Active";



return (

<span

className={`
inline-flex
items-center
rounded-full
px-4
py-2
text-sm
font-semibold

${
active
?
"bg-emerald-100 text-emerald-700"
:
"bg-slate-100 text-slate-700"
}

`}

>

{status || "Unknown"}

</span>

);


}