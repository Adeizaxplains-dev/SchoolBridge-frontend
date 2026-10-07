import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  UserCog,
  Upload,
} from "lucide-react";

import {
  getTeacherById,
  updateTeacher,
} from "../../../services/teacherService";


const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "",
  dateOfBirth: "",

  employeeId: "",
  department: "",
  qualification: "",
  experience: "",

  address: "",

  status: "Active",
};



export default function EditTeacher() {

  const navigate = useNavigate();

  const { id } = useParams();


  const [formData,setFormData] =
    useState(initialForm);


  const [photo,setPhoto] =
    useState(null);


  const [loading,setLoading] =
    useState(true);


  const [saving,setSaving] =
    useState(false);


  const [error,setError] =
    useState("");




  useEffect(()=>{

    loadTeacher();

  },[id]);





  const loadTeacher = async()=>{

    try{

      setLoading(true);

      const response =
        await getTeacherById(id);


      setFormData({
        ...initialForm,
        ...response.data,
      });


    }catch(err){

      setError(
        err.response?.data?.message ||
        "Unable to load teacher"
      );

    }finally{

      setLoading(false);

    }

  };





  const handleChange=(e)=>{

    const {
      name,
      value
    } = e.target;


    setFormData(prev=>({
      ...prev,
      [name]:value,
    }));

  };






  const handleSubmit=async(e)=>{

    e.preventDefault();


    try{

      setSaving(true);

      setError("");



      const payload =
        new FormData();


      Object.entries(formData)
      .forEach(([key,value])=>{

        payload.append(
          key,
          value
        );

      });



      if(photo){

        payload.append(
          "photo",
          photo
        );

      }



      await updateTeacher(
        id,
        payload
      );



      navigate(
        `/admin/teachers/${id}`
      );



    }catch(err){

      setError(
        err.response?.data?.message ||
        "Failed to update teacher"
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

        Loading teacher information...

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

        onClick={()=>
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

          <UserCog
          className="text-blue-600"
          />

          Edit Teacher

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







      <form

      onSubmit={handleSubmit}

      className="
      space-y-8
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-8
      shadow-sm
      "

      >





        {/* Photo */}

        <section>

          <h2 className="
          mb-4
          text-xl
          font-bold
          ">

            Profile Photo

          </h2>


          <label className="
          flex
          w-fit
          cursor-pointer
          items-center
          gap-3
          rounded-xl
          border
          px-5
          py-3
          hover:bg-slate-50
          ">


            <Upload size={18}/>

            Change Photo


            <input

            hidden

            type="file"

            accept="image/*"

            onChange={(e)=>
              setPhoto(
                e.target.files[0]
              )
            }

            />


          </label>


        </section>







        <FormSection title="Personal Information">


          <Input
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          />


          <Input
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          />


          <Input
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          />


          <Input
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          />


        </FormSection>








        <FormSection title="Employment">


          <Input
          label="Employee ID"
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          />



          <Input
          label="Department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          />



          <Input
          label="Qualification"
          name="qualification"
          value={formData.qualification}
          onChange={handleChange}
          />



          <Input
          label="Experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          />


        </FormSection>








        <FormSection title="Account Status">


          <select

          name="status"

          value={formData.status}

          onChange={handleChange}

          className="
          rounded-xl
          border
          p-3
          "

          >

            <option value="Active">
              Active
            </option>

            <option value="On Leave">
              On Leave
            </option>

            <option value="Suspended">
              Suspended
            </option>


          </select>


        </FormSection>








        <button

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
            ? "Updating..."
            : "Save Changes"
          }


        </button>




      </form>



    </div>

  );

}









function FormSection({
title,
children
}){

return (

<section>

<h2 className="
mb-5
text-xl
font-bold
text-slate-900
">

{title}

</h2>


<div className="
grid
gap-5
md:grid-cols-2
">

{children}

</div>


</section>

);

}








function Input({
label,
...props
}){

return (

<div>

<label className="
mb-2
block
text-sm
font-medium
text-slate-600
">

{label}

</label>


<input

{...props}

className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
outline-none
focus:border-blue-500
focus:ring-2
focus:ring-blue-100
"

/>


</div>

);

}