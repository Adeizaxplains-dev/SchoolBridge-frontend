import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  Users,
  BookOpen,
  Award,
  CalendarCheck,
} from "lucide-react";

import {
  getTeacherById,
  getTeacherPerformance,
} from "../../../services/teacherService";



export default function Performance() {

  const navigate = useNavigate();

  const { id } = useParams();


  const [teacher, setTeacher] = useState(null);

  const [performance, setPerformance] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");




  useEffect(() => {

    loadPerformance();

  }, [id]);






  const loadPerformance = async () => {

    try {

      setLoading(true);


      const teacherResponse =
        await getTeacherById(id);


      setTeacher(
        teacherResponse.data
      );



      const performanceResponse =
        await getTeacherPerformance(id);



      setPerformance(
        performanceResponse.data
      );



    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Unable to load performance"
      );


    } finally {

      setLoading(false);

    }

  };








  if (loading) {

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

        Loading performance...

      </div>

    );

  }








  const metrics = {

    students:
      performance?.students || 0,


    subjects:
      performance?.subjects || 0,


    attendance:
      performance?.attendanceRate || "0%",


    rating:
      performance?.rating || "0",

  };







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

          <BarChart3
          className="text-blue-600"
          />

          Teacher Performance

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









      {/* Teacher */}

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









      {/* Metrics */}

      <div
      className="
      grid
      gap-6
      md:grid-cols-4
      "
      >


        <MetricCard

        title="Students"

        value={metrics.students}

        icon={Users}

        />



        <MetricCard

        title="Subjects"

        value={metrics.subjects}

        icon={BookOpen}

        />



        <MetricCard

        title="Attendance"

        value={metrics.attendance}

        icon={CalendarCheck}

        />



        <MetricCard

        title="Rating"

        value={`${metrics.rating}/5`}

        icon={Award}

        />


      </div>









      {/* Performance Sections */}

      <div
      className="
      grid
      gap-6
      lg:grid-cols-2
      "
      >





        <PerformanceCard

        title="Student Performance"

        description="
        Average student results for assigned subjects.
        "

        value={
          performance?.studentScore ||
          "0%"
        }

        />





        <PerformanceCard

        title="Assignment Completion"

        description="
        Assignment creation and grading activity.
        "

        value={
          performance?.assignmentCompletion ||
          "0%"
        }

        />







        <PerformanceCard

        title="Attendance Reliability"

        description="
        Teacher punctuality and attendance consistency.
        "

        value={
          performance?.attendanceScore ||
          "0%"
        }

        />






        <PerformanceCard

        title="Administrative Rating"

        description="
        Evaluation score from school management.
        "

        value={
          performance?.adminRating ||
          "0%"
        }

        />


      </div>









      {/* Growth */}

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

        <div
        className="
        flex
        items-center
        gap-3
        "
        >

          <TrendingUp
          className="text-emerald-600"
          />

          <h2
          className="
          text-xl
          font-bold
          "
          >

            Performance Trend

          </h2>


        </div>



        <div
        className="
        mt-5
        rounded-xl
        bg-slate-50
        p-8
        text-center
        text-slate-500
        "
        >

          Performance analytics chart will appear here.

        </div>


      </div>







    </div>

  );

}








function MetricCard({
title,
value,
icon:Icon
}){


return (

<div
className="
rounded-2xl
border
border-slate-200
bg-white
p-6
shadow-sm
"
>


<Icon
size={26}
className="text-blue-600"
/>


<p
className="
mt-4
text-sm
text-slate-500
"
>

{title}

</p>


<h3
className="
mt-1
text-3xl
font-bold
"
>

{value}

</h3>


</div>

);

}








function PerformanceCard({
title,
description,
value
}){


return (

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

<h3
className="
text-lg
font-bold
"
>

{title}

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


<div
className="
mt-6
text-4xl
font-bold
text-blue-600
"
>

{value}

</div>


</div>

);

}