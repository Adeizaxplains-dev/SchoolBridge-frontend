import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  CalendarCheck,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
} from "lucide-react";

import {
  getTeacherById,
  getTeacherAttendance,
} from "../../../services/teacherService";



export default function TeacherAttendance() {

  const navigate = useNavigate();

  const { id } = useParams();


  const [teacher, setTeacher] = useState(null);

  const [attendance, setAttendance] = useState([]);

  const [filter, setFilter] = useState("month");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");




  useEffect(() => {

    loadAttendance();

  }, [id, filter]);






  const loadAttendance = async () => {

    try {

      setLoading(true);


      const teacherResponse =
        await getTeacherById(id);


      setTeacher(
        teacherResponse.data
      );



      const attendanceResponse =
        await getTeacherAttendance(
          id,
          filter
        );


      setAttendance(
        attendanceResponse.data || []
      );



    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Unable to load attendance"
      );


    } finally {

      setLoading(false);

    }

  };







  const summary = {

    present:
      attendance.filter(
        item =>
        item.status === "Present"
      ).length,


    absent:
      attendance.filter(
        item =>
        item.status === "Absent"
      ).length,


    late:
      attendance.filter(
        item =>
        item.status === "Late"
      ).length,

  };



  const total =
    attendance.length || 1;



  const percentage =
    Math.round(
      (summary.present / total) * 100
    );









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

        Loading attendance...

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
        "
        >

          <CalendarCheck
          className="text-blue-600"
          />

          Teacher Attendance

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









      {/* Teacher Card */}

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









      {/* Filter */}

      <div
      className="
      flex
      justify-end
      "
      >

        <select

        value={filter}

        onChange={(e)=>
          setFilter(
            e.target.value
          )
        }

        className="
        rounded-xl
        border
        border-slate-300
        px-4
        py-3
        "

        >

          <option value="week">
            This Week
          </option>


          <option value="month">
            This Month
          </option>


          <option value="term">
            This Term
          </option>


        </select>


      </div>









      {/* Summary Cards */}

      <div
      className="
      grid
      gap-6
      md:grid-cols-4
      "
      >


        <SummaryCard

        title="Attendance Rate"

        value={`${percentage}%`}

        icon={TrendingUp}

        />


        <SummaryCard

        title="Present"

        value={summary.present}

        icon={CheckCircle}

        />


        <SummaryCard

        title="Absent"

        value={summary.absent}

        icon={XCircle}

        />


        <SummaryCard

        title="Late"

        value={summary.late}

        icon={Clock}

        />


      </div>









      {/* Attendance Table */}

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
        border-b
        p-6
        "
        >

          <h2
          className="
          text-xl
          font-bold
          "
          >

            Attendance History

          </h2>

        </div>





        {
          attendance.length === 0 ?


          (

          <div
          className="
          p-10
          text-center
          text-slate-500
          "
          >

            No attendance records available.

          </div>

          )


          :

          (

          <div className="divide-y">

            {
              attendance.map((item)=>(


                <div

                key={item._id}

                className="
                flex
                items-center
                justify-between
                p-5
                "

                >

                  <div>

                    <p className="font-semibold">

                      {
                        item.date
                      }

                    </p>


                    <p
                    className="
                    text-sm
                    text-slate-500
                    "
                    >

                      {
                        item.time ||
                        "No time"
                      }

                    </p>

                  </div>





                  <span
                  className={`

                  rounded-full
                  px-4
                  py-2
                  text-sm
                  font-semibold


                  ${
                    item.status === "Present"

                    ?

                    "bg-emerald-100 text-emerald-700"

                    :

                    item.status === "Late"

                    ?

                    "bg-orange-100 text-orange-700"

                    :

                    "bg-red-100 text-red-700"

                  }

                  `}
                  >

                    {
                      item.status
                    }

                  </span>



                </div>


              ))
            }

          </div>

          )

        }


      </div>





    </div>

  );

}







function SummaryCard({
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
className="text-blue-600"
size={25}
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