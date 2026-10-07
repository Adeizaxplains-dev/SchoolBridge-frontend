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
  GraduationCap,
  FileText,
  Search,
  Award,
} from "lucide-react";


import {
  getParentById,
} from "../../../services/parentService";


import {
  getStudentResults,
} from "../../../services/resultService";







export default function ParentResults(){


  const {
    id
  } = useParams();


  const navigate =
    useNavigate();




  const [parent,setParent] =
    useState(null);



  const [students,setStudents] =
    useState([]);



  const [selectedStudent,setSelectedStudent] =
    useState("");



  const [results,setResults] =
    useState([]);



  const [session,setSession] =
    useState("");



  const [term,setTerm] =
    useState("");



  const [search,setSearch] =
    useState("");



  const [loading,setLoading] =
    useState(true);









  useEffect(()=>{


    loadParent();


  },[id]);









  const loadParent=async()=>{


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


        loadResults(
          children[0]._id
        );


      }


    }
    finally{


      setLoading(false);


    }


  };









  const loadResults=async(studentId)=>{


    const response =
      await getStudentResults(
        studentId,
        {
          session,
          term
        }
      );



    setSelectedStudent(
      studentId
    );



    setResults(

      response.data.results ||

      response.data ||

      []

    );


  };









  const filteredResults =

    results.filter(result=>{


      return (

        result.subject
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )

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

        Loading results...

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

          Academic Results

        </h1>


        <p
        className="
        mt-2
        text-slate-500
        "
        >

          View results of students linked to {parent?.name}

        </p>


      </div>









      {/* Student selector */}



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

          <GraduationCap
          className="text-blue-600"
          />

          <h2
          className="
          font-bold
          "
          >

            Select Student

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

            onClick={()=>
              loadResults(
                student._id
              )
            }

            className={`

            rounded-xl

            px-4

            py-2

            font-semibold

            ${
              selectedStudent===student._id

              ?

              "bg-blue-600 text-white"

              :

              "bg-slate-100"

            }

            `}

            >

              {student.name}

            </button>


          ))
        }

        </div>


      </div>









      {/* Filters */}



      <div
      className="
      grid
      gap-4
      md:grid-cols-3
      "
      >


        <input

        value={session}

        onChange={(e)=>
          setSession(
            e.target.value
          )
        }

        placeholder="Session"

        className="
        rounded-xl
        border
        px-4
        py-3
        "

        />




        <input

        value={term}

        onChange={(e)=>
          setTerm(
            e.target.value
          )
        }

        placeholder="Term"

        className="
        rounded-xl
        border
        px-4
        py-3
        "

        />






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
          Search subject
          "


          className="
          w-full
          rounded-xl
          border
          py-3
          pl-12
          "

          />


        </div>


      </div>









      {/* Results */}



      <div
      className="
      rounded-3xl
      border
      bg-white
      overflow-hidden
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
                Subject
              </th>


              <th className="p-4 text-left">
                Score
              </th>


              <th className="p-4 text-left">
                Grade
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
            filteredResults.map(result=>(


              <tr
              key={result._id}
              >


                <td className="p-4 font-semibold">

                  {result.subject}

                </td>


                <td className="p-4">

                  {result.score}

                </td>



                <td className="p-4">

                  <GradeBadge

                  grade={
                    result.grade
                  }

                  />

                </td>



                <td className="p-4 text-slate-500">

                  {
                    result.remark ||
                    "-"
                  }

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









function GradeBadge({

grade

}){


return (

<span
className="
inline-flex
items-center
gap-2
rounded-full
bg-blue-100
px-3
py-1
text-sm
font-semibold
text-blue-700
"
>

<Award size={15}/>

{grade || "N/A"}

</span>

);

}