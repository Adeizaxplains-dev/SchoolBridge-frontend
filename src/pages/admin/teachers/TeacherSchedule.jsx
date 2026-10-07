import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  CalendarDays,
  Clock,
  School,
  BookOpen,
  Plus,
} from "lucide-react";

import {
  getTeacherById,
  getTeacherSchedule,
} from "../../../services/teacherService";



const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];



export default function TeacherSchedule() {

  const navigate = useNavigate();

  const { id } = useParams();


  const [teacher,setTeacher] =
    useState(null);

  const [schedule,setSchedule] =
    useState([]);


  const [loading,setLoading] =
    useState(true);


  const [error,setError] =
    useState("");





  useEffect(()=>{

    loadSchedule();

  },[id]);





  const loadSchedule = async()=>{

    try{

      setLoading(true);


      const teacherResponse =
        await getTeacherById(id);


      setTeacher(
        teacherResponse.data
      );



      const scheduleResponse =
        await getTeacherSchedule(id);



      setSchedule(
        scheduleResponse.data || []
      );



    }catch(err){


      setError(
        err.response?.data?.message ||
        "Unable to load schedule"
      );


    }finally{


      setLoading(false);


    }

  };







  if(loading){

    return (

      <div
      className="
      rounded-3xl
      bg-white
      p-10
      text-center
      shadow-sm
      "
      >

        Loading schedule...

      </div>

    );

  }







  return (

    <div className="space-y-8">





      {/* Header */}

      <div
      className="
      flex
      items-center
      justify-between
      "
      >

        <button

        onClick={() =>
          navigate(-1)
        }

        className="
        flex
        items-center
        gap-2
        text-slate-600
        hover:text-slate-900
        "
        >

          <ArrowLeft size={18}/>

          Back

        </button>





        <h1
        className="
        flex
        items-center
        gap-3
        text-3xl
        font-bold
        text-slate-900
        "
        >

          <CalendarDays
          className="text-blue-600"
          />

          Teacher Schedule

        </h1>



      </div>







      {error && (

        <div
        className="
        rounded-xl
        bg-red-50
        p-4
        text-red-600
        "
        >

          {error}

        </div>

      )}









      {/* Teacher Info */}

      <div
      className="
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-6
      shadow-sm
      "
      >

        <p
        className="
        text-sm
        text-slate-500
        "
        >

          Teacher

        </p>


        <h2
        className="
        mt-1
        text-xl
        font-bold
        "
        >

          {
            teacher?.name ||
            "Teacher"
          }

        </h2>


      </div>









      {/* Schedule Grid */}

      <div
      className="
      overflow-hidden
      rounded-3xl
      border
      border-slate-200
      bg-white
      shadow-sm
      "
      >


        <div
        className="
        flex
        items-center
        justify-between
        border-b
        p-6
        "
        >

          <div>

            <h2
            className="
            text-xl
            font-bold
            "
            >

              Weekly Timetable

            </h2>


            <p
            className="
            text-sm
            text-slate-500
            "
            >

              Manage teaching periods and classes.

            </p>


          </div>



          <button
          className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-blue-600
          px-4
          py-2
          text-sm
          font-semibold
          text-white
          hover:bg-blue-700
          "
          >

            <Plus size={17}/>

            Add Period

          </button>


        </div>







        <div
        className="
        grid
        divide-y
        "
        >


          {
            days.map((day)=>(


              <div
              key={day}
              className="
              grid
              gap-4
              p-5
              md:grid-cols-6
              "
              >



                <div
                className="
                font-bold
                text-slate-800
                "
                >

                  {day}

                </div>





                <div
                className="
                md:col-span-5
                "
                >

                  {
                    schedule.filter(
                      item =>
                      item.day === day
                    ).length === 0 ?


                    (

                    <div
                    className="
                    rounded-xl
                    bg-slate-50
                    p-4
                    text-sm
                    text-slate-400
                    "
                    >

                      No classes assigned

                    </div>

                    )


                    :

                    (

                    <div
                    className="
                    grid
                    gap-3
                    md:grid-cols-3
                    "
                    >

                    {
                      schedule
                      .filter(
                        item =>
                        item.day === day
                      )
                      .map((item)=>(


                        <ScheduleCard
                        key={item._id}
                        item={item}
                        />


                      ))
                    }

                    </div>

                    )

                  }


                </div>


              </div>


            ))
          }


        </div>


      </div>



    </div>

  );

}







function ScheduleCard({
  item
}){


return (

<div
className="
rounded-2xl
border
border-slate-200
bg-slate-50
p-4
"
>


<div
className="
flex
items-center
gap-2
font-semibold
"
>

<BookOpen size={16}/>

{
item.subject ||
"Subject"
}

</div>



<div
className="
mt-3
space-y-2
text-sm
text-slate-500
"
>

<p className="
flex
items-center
gap-2
">

<School size={15}/>

{
item.className ||
"Class"
}

</p>



<p className="
flex
items-center
gap-2
">

<Clock size={15}/>

{
item.time ||
"Period"
}

</p>


</div>



</div>

);

}