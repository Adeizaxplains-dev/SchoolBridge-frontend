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
  Search,
  GraduationCap,
  Check,
  Save,
  UserRound,
  AlertCircle,
} from "lucide-react";


import {
  getParentById,
  assignStudents,
} from "../../../services/parentService";


import {
  getStudents,
} from "../../../services/studentService";









export default function AssignStudents(){


  const {
    id
  } = useParams();


  const navigate =
    useNavigate();




  const [parent,setParent] =
    useState(null);



  const [students,setStudents] =
    useState([]);



  const [selected,setSelected] =
    useState([]);



  const [search,setSearch] =
    useState("");



  const [loading,setLoading] =
    useState(true);



  const [saving,setSaving] =
    useState(false);



  const [error,setError] =
    useState("");









  useEffect(()=>{


    loadData();


  },[id]);









  const loadData=async()=>{


    try{


      setLoading(true);



      const [
        parentResponse,
        studentResponse
      ] = await Promise.all([


        getParentById(id),


        getStudents()

      ]);




      const parentData =
        parentResponse.data.parent ||
        parentResponse.data;



      const studentData =
        studentResponse.data.students ||
        studentResponse.data ||
        [];




      setParent(parentData);


      setStudents(studentData);




      setSelected(

        parentData.children?.map(

          student =>
          student._id

        ) || []

      );



    }
    catch(err){


      setError(
        "Unable to load students"
      );


    }
    finally{


      setLoading(false);


    }


  };









  const toggleStudent=(studentId)=>{


    setSelected(previous=>{


      if(previous.includes(studentId)){


        return previous.filter(
          id =>
          id !== studentId
        );


      }


      return [
        ...previous,
        studentId
      ];


    });


  };









  const handleSave=async()=>{


    try{


      setSaving(true);


      await assignStudents(
        id,
        {
          students:selected
        }
      );



      navigate(
        `/admin/parents/${id}`
      );


    }
    catch(err){


      setError(
        "Unable to assign students"
      );


    }
    finally{


      setSaving(false);


    }


  };









  const filteredStudents =

    students.filter(student=>{


      const value =
        `${student.name} ${student.className}`
        .toLowerCase();



      return value.includes(
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

        Loading students...

      </div>

    );


  }








  return (

    <div
    className="
    space-y-8
    "
    >








      {/* Header */}


      <div
      className="
      flex
      items-center
      justify-between
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





        <button

        onClick={handleSave}

        disabled={saving}

        className="
        flex
        items-center
        gap-2
        rounded-xl
        bg-blue-600
        px-5
        py-3
        font-semibold
        text-white
        disabled:opacity-50
        "

        >

          <Save size={18}/>


          {
            saving
            ?
            "Saving..."
            :
            "Save Changes"
          }


        </button>



      </div>









      <div>


        <h1
        className="
        text-3xl
        font-bold
        text-slate-900
        "
        >

          Assign Students

        </h1>



        <p
        className="
        mt-2
        text-slate-500
        "
        >

          Link students to {parent?.name}

        </p>


      </div>









      {
        error && (

          <div
          className="
          flex
          gap-3
          rounded-xl
          border
          border-red-200
          bg-red-50
          p-4
          text-red-700
          "
          >

            <AlertCircle size={20}/>

            {error}

          </div>

        )
      }









      {/* Search */}



      <div
      className="
      relative
      "
      >

        <Search

        className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-slate-400
        "

        size={18}

        />



        <input


        value={search}


        onChange={(e)=>
          setSearch(
            e.target.value
          )
        }


        placeholder="
        Search students...
        "


        className="
        w-full
        rounded-xl
        border
        px-12
        py-3
        outline-none
        focus:border-blue-500
        "

        />


      </div>









      {/* Students */}



      <div
      className="
      grid
      gap-5
      md:grid-cols-2
      xl:grid-cols-3
      "
      >


      {
        filteredStudents.map(student=>(


          <button

          key={
            student._id
          }


          onClick={()=>


            toggleStudent(
              student._id
            )

          }


          className={`

          rounded-2xl

          border

          p-5

          text-left

          transition

          ${
            selected.includes(student._id)

            ?

            "border-blue-500 bg-blue-50"

            :

            "border-slate-200 bg-white hover:shadow-md"

          }

          `}

          >




            <div
            className="
            flex
            justify-between
            "
            >


              <div
              className="
              flex
              gap-3
              "
              >


                <div
                className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-blue-100
                text-blue-700
                "
                >

                  <GraduationCap/>

                </div>



                <div>


                  <h3
                  className="
                  font-bold
                  "
                  >

                    {student.name}

                  </h3>


                  <p
                  className="
                  text-sm
                  text-slate-500
                  "
                  >

                    {student.className}

                  </p>


                </div>


              </div>





              {
                selected.includes(student._id) &&

                <Check
                className="text-blue-600"
                />

              }


            </div>





          </button>


        ))

      }


      </div>







    </div>

  );

}