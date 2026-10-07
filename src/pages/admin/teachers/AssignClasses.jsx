import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  School,
  Save,
  CheckCircle,
} from "lucide-react";

import {
  getTeacherById,
  assignClasses,
} from "../../../services/teacherService";


export default function AssignClasses() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [teacher, setTeacher] = useState(null);

  const [classes, setClasses] = useState([]);

  const [selectedClasses, setSelectedClasses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");



  useEffect(() => {
    loadData();
  }, [id]);



  const loadData = async () => {
    try {
      setLoading(true);

      const response =
        await getTeacherById(id);


      setTeacher(response.data);


      /*
        Replace this later with:
        getClasses()
        from classService.js

        No classes are hardcoded.
      */

      setClasses([]);


      setSelectedClasses(
        response.data?.classes || []
      );


    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Unable to load teacher"
      );

    } finally {

      setLoading(false);

    }
  };





  const toggleClass = (classId) => {

    setSelectedClasses((prev)=>{

      if(prev.includes(classId)){

        return prev.filter(
          item => item !== classId
        );

      }


      return [
        ...prev,
        classId
      ];

    });

  };





  const handleSave = async()=>{

    try{

      setSaving(true);

      await assignClasses(
        id,
        selectedClasses
      );


      navigate(
        `/admin/teachers/${id}`
      );


    }catch(err){

      setError(
        err.response?.data?.message ||
        "Failed to assign classes"
      );


    }finally{

      setSaving(false);

    }

  };





  if(loading){

    return (

      <div className="
      rounded-3xl
      bg-white
      p-10
      text-center
      shadow-sm
      ">

        Loading classes...

      </div>

    );

  }





  return (

    <div className="space-y-8">



      {/* Header */}

      <div className="
      flex
      items-center
      justify-between
      ">


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




        <h1 className="
        flex
        items-center
        gap-3
        text-3xl
        font-bold
        text-slate-900
        ">

          <School
          className="text-blue-600"
          />

          Assign Classes

        </h1>



      </div>







      {error && (

        <div className="
        rounded-xl
        bg-red-50
        p-4
        text-red-600
        ">

          {error}

        </div>

      )}







      {/* Teacher */}

      <div className="
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-6
      shadow-sm
      ">


        <p className="
        text-sm
        text-slate-500
        ">

          Teacher

        </p>


        <h2 className="
        mt-1
        text-xl
        font-bold
        text-slate-900
        ">

          {
            teacher?.name ||
            "Teacher"
          }

        </h2>


      </div>







      {/* Classes */}

      <div className="
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-6
      shadow-sm
      ">


        <h2 className="
        mb-6
        text-xl
        font-bold
        ">

          Available Classes

        </h2>




        {
          classes.length === 0 ? (

            <div className="
            rounded-xl
            bg-slate-50
            p-8
            text-center
            text-slate-500
            ">

              No classes available.

              <br/>

              Connect this page to your Class Management module.

            </div>


          ) : (


            <div className="
            grid
            gap-4
            md:grid-cols-3
            ">


            {
              classes.map((item)=>(

                <button

                key={item._id}

                onClick={() =>
                  toggleClass(item._id)
                }

                className={`
                flex
                items-center
                justify-between
                rounded-2xl
                border
                p-5
                text-left
                transition

                ${
                  selectedClasses.includes(item._id)

                  ?
                  "border-blue-600 bg-blue-50"

                  :
                  "border-slate-200 hover:bg-slate-50"

                }
                `}

                >


                  <div>

                    <p className="
                    font-semibold
                    ">

                      {item.name}

                    </p>


                    <p className="
                    text-sm
                    text-slate-500
                    ">

                      {item.level}

                    </p>


                  </div>



                  {
                    selectedClasses.includes(item._id)
                    &&
                    <CheckCircle
                    className="text-blue-600"
                    size={22}
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

      <div className="flex justify-end">


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