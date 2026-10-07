import {
  useEffect,
  useState,
} from "react";


import {
  useNavigate,
  useParams,
} from "react-router-dom";


import {
  ArrowLeft,
  CalendarCheck,
  Users,
  Search,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";


import {
  getParentById,
} from "../../../services/parentService";


import {
  getStudentAttendance,
} from "../../../services/attendanceService";







export default function ParentAttendance(){


  const {
    id
  } = useParams();



  const navigate =
    useNavigate();





  const [parent,setParent] =
    useState(null);



  const [records,setRecords] =
    useState([]);



  const [students,setStudents] =
    useState([]);



  const [selectedStudent,setSelectedStudent] =
    useState("");



  const [search,setSearch] =
    useState("");



  const [loading,setLoading] =
    useState(true);









  useEffect(()=>{


    loadData();


  },[id]);









  const loadData=async()=>{


    try{


      setLoading(true);



      const response =
        await getParentById(id);



      const parentData =
        response.data.parent ||
        response.data;



      setParent(parentData);



      const children =
        parentData.children || [];



      setStudents(children);



      if(children.length){


        loadAttendance(
          children[0]._id
        );


      }



    }
    finally{


      setLoading(false);


    }


  };









  const loadAttendance=async(studentId)=>{


    try{


      const response =
        await getStudentAttendance(
          studentId
        );



      setRecords(

        response.data.records ||

        response.data ||

        []

      );



      setSelectedStudent(
        studentId
      );


    }
    catch(error){


      console.error(error);


    }


  };









  const filteredRecords =

    records.filter(record=>{


      const text =
      `${record.date} ${record.status}`
      .toLowerCase();



      return text.includes(
        search.toLowerCase()
      );


    });








  if(loading){


    return (

      <div
      className="
      rounded-3xl
      bg-white
      p-10
      text-center
      text-slate-500
      "
      >

        Loading attendance...

      </div>

    );


  }








  return (

    <div
    className="
    space-y-8
    "
    >





      <button

      onClick={()=>navigate(-1)}

      className="
      flex
      items-center
      gap-2
      text-slate-600
      "

      >

        <ArrowLeft size={18}/>

        Back

      </button>









      <div>

        <h1
        className="
        text-3xl
        font-bold
        text-slate-900
        "
        >

          Attendance Records

        </h1>



        <p
        className="
        mt-2
        text-slate-500
        "
        >

          View attendance for students linked to {parent?.name}

        </p>


      </div>









      {/* Student Selector */}



      <div
      className="
      rounded-3xl
      border
      bg-white
      p-6
      "
      >


        <div
        className="
        flex
        items-center
        gap-3
        mb-5
        "
        >

          <Users
          className="text-blue-600"
          />

          <h2
          className="
          font-bold
          "
          >

            Students

          </h2>

        </div>





        <div
        className="
        flex
        flex-wrap
        gap-3
        "
        >

        {
          students.map(student=>(


            <button

            key={student._id}

            onClick={()=>loadAttendance(student._id)}

            className={`

            rounded-xl

            px-4

            py-2

            text-sm

            font-semibold

            ${
              selectedStudent===student._id

              ?

              "bg-blue-600 text-white"

              :

              "bg-slate-100 text-slate-700"

            }

            `}

            >

              {student.name}

            </button>


          ))
        }

        </div>



      </div>









      {/* Search */}



      <div
      className="
      relative
      "
      >


        <Search

        size={18}

        className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-slate-400
        "

        />


        <input


        value={search}


        onChange={(e)=>
          setSearch(
            e.target.value
          )
        }


        placeholder="
        Search attendance...
        "


        className="
        w-full
        rounded-xl
        border
        px-12
        py-3
        "

        />


      </div>









      {/* Attendance Table */}



      <div
      className="
      overflow-hidden
      rounded-3xl
      border
      bg-white
      "
      >



        <table
        className="
        w-full
        "
        >

          <thead
          className="
          bg-slate-50
          "
          >

            <tr>

              <th className="p-4 text-left">
                Date
              </th>


              <th className="p-4 text-left">
                Status
              </th>


              <th className="p-4 text-left">
                Remark
              </th>


            </tr>

          </thead>





          <tbody
          className="
          divide-y
          "
          >

          {
            filteredRecords.map(record=>(


              <tr
              key={record._id}
              >

                <td className="p-4">

                  {record.date}

                </td>


                <td className="p-4">

                  <AttendanceBadge

                  status={
                    record.status
                  }

                  />

                </td>



                <td className="p-4 text-slate-500">

                  {record.remark || "-"}

                </td>


              </tr>


            ))
          }


          </tbody>


        </table>



      </div>









    </div>

  );

}









function AttendanceBadge({

status

}){


if(status==="Present"){


return (

<span
className="
inline-flex
items-center
gap-2
rounded-full
bg-emerald-100
px-3
py-1
text-sm
font-semibold
text-emerald-700
"
>

<CheckCircle size={15}/>

Present

</span>

);


}



if(status==="Absent"){


return (

<span
className="
inline-flex
items-center
gap-2
rounded-full
bg-red-100
px-3
py-1
text-sm
font-semibold
text-red-700
"
>

<XCircle size={15}/>

Absent

</span>

);


}



return (

<span
className="
inline-flex
items-center
gap-2
rounded-full
bg-orange-100
px-3
py-1
text-sm
font-semibold
text-orange-700
"
>

<Clock size={15}/>

{status || "Pending"}

</span>

);


}