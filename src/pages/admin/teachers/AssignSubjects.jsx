import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  BookOpen,
  Save,
  CheckCircle,
} from "lucide-react";

import {
  getTeacherById,
  assignSubjects,
} from "../../../services/teacherService";



export default function AssignSubjects() {

  const navigate = useNavigate();

  const { id } = useParams();


  const [teacher,setTeacher] = useState(null);

  const [subjects,setSubjects] = useState([]);

  const [selectedSubjects,setSelectedSubjects] =
    useState([]);


  const [loading,setLoading] = useState(true);

  const [saving,setSaving] = useState(false);

  const [error,setError] = useState("");





  useEffect(()=>{

    loadData();

  },[id]);





  const loadData = async()=>{

    try{

      setLoading(true);


      const response =
        await getTeacherById(id);


      setTeacher(response.data);



      /*
        Later replace with:

        subjectService.getSubjects()

        Data example:

        [
          {
            _id,
            name,
            department
          }
        ]

      */


      setSubjects([]);



      setSelectedSubjects(
        response.data?.subjects || []
      );


    }catch(err){

      setError(
        err.response?.data?.message ||
        "Unable to load subjects"
      );


    }finally{

      setLoading(false);

    }

  };






  const toggleSubject=(subjectId)=>{


    setSelectedSubjects((prev)=>{


      if(prev.includes(subjectId)){


        return prev.filter(
          item =>
          item !== subjectId
        );


      }


      return [
        ...prev,
        subjectId
      ];


    });


  };







  const handleSave=async()=>{


    try{


      setSaving(true);


      await assignSubjects(
        id,
        selectedSubjects
      );


      navigate(
        `/admin/teachers/${id}`
      );


    }catch(err){


      setError(
        err.response?.data?.message ||
        "Failed to assign subjects"
      );


    }finally{


      setSaving(false);


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

        Loading subjects...

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

          <BookOpen
          className="text-blue-600"
          />

          Assign Subjects

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









      {/* Subject Selection */}


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


        <h2
        className="
        mb-6
        text-xl
        font-bold
        "
        >

          Available Subjects

        </h2>





        {
          subjects.length === 0 ?


          (

            <div
            className="
            rounded-xl
            bg-slate-50
            p-8
            text-center
            text-slate-500
            "
            >

              No subjects available.

              <br/>

              Connect this page to Subject Management.

            </div>


          )


          :


          (

          <div
          className="
          grid
          gap-4
          md:grid-cols-3
          "
          >

          {
            subjects.map((subject)=>(


              <button

              key={subject._id}

              onClick={() =>
                toggleSubject(
                  subject._id
                )
              }


              className={`

              flex
              items-center
              justify-between
              rounded-2xl
              border
              p-5
              transition


              ${
                selectedSubjects.includes(
                  subject._id
                )

                ?

                "border-blue-600 bg-blue-50"

                :

                "border-slate-200 hover:bg-slate-50"

              }

              `}


              >



                <div
                className="text-left"
                >

                  <p
                  className="
                  font-semibold
                  "
                  >

                    {
                      subject.name
                    }

                  </p>


                  <p
                  className="
                  text-sm
                  text-slate-500
                  "
                  >

                    {
                      subject.department
                    }

                  </p>


                </div>




                {
                  selectedSubjects.includes(
                    subject._id
                  )

                  &&

                  <CheckCircle
                  size={22}
                  className="
                  text-blue-600
                  "
                  />

                }



              </button>


            ))
          }

          </div>

          )

        }



      </div>









      {/* Save */}


      <div
      className="
      flex
      justify-end
      "
      >

        <button

        onClick={handleSave}

        disabled={saving}

        className="
        flex
        items-center
        gap-2
        rounded-xl
        bg-blue-600
        px-6
        py-3
        font-semibold
        text-white
        hover:bg-blue-700
        disabled:opacity-50
        "

        >

          <Save size={18}/>


          {
            saving
            ?
            "Saving..."
            :
            "Save Assignment"
          }


        </button>


      </div>





    </div>

  );

}