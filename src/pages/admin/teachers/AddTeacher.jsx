import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  UserPlus,
  Upload,
  Save,
} from "lucide-react";

import { createTeacher } from "../../../services/teacherService";


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


export default function AddTeacher() {

  const navigate = useNavigate();


  const [formData, setFormData] = useState(initialForm);

  const [photo, setPhoto] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");



  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    setFormData((prev)=>({
      ...prev,
      [name]: value,
    }));

  };




  const handleSubmit = async(e)=>{

    e.preventDefault();

    try{

      setLoading(true);
      setError("");

      const payload = new FormData();


      Object.entries(formData)
      .forEach(([key,value])=>{
        payload.append(key,value);
      });


      if(photo){
        payload.append(
          "photo",
          photo
        );
      }


      await createTeacher(payload);


      navigate(
        "/teachers"
      );


    }catch(err){

      setError(
        err.response?.data?.message ||
        "Failed to create teacher"
      );

    }finally{

      setLoading(false);

    }

  };



  return (

    <div className="space-y-8">


      {/* Header */}

      <div className="flex items-center justify-between">


        <button
          onClick={() =>
            navigate("/teachers")
          }
          className="
          flex items-center gap-2
          text-slate-600
          hover:text-slate-900
          "
        >

          <ArrowLeft size={18}/>

          Back

        </button>



        <h1 className="
        flex items-center gap-3
        text-3xl font-bold text-slate-900
        ">

          <UserPlus
            className="text-blue-600"
          />

          Add Teacher

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




        {/* Profile Image */}

        <section>

          <h2 className="mb-5 text-xl font-bold">

            Profile Photo

          </h2>


          <label
            className="
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
            "
          >

            <Upload size={18}/>

            Upload Photo


            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e)=>
                setPhoto(
                  e.target.files[0]
                )
              }
            />


          </label>


        </section>







        {/* Personal Information */}

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
            type="email"
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






        {/* Employment */}

        <FormSection title="Employment Information">


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








        {/* Address */}

        <FormSection title="Address">


          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="
            col-span-full
            rounded-xl
            border
            p-3
            "
            rows="4"
          />

        </FormSection>







        {/* Submit */}

        <div className="flex justify-end">


          <button
            disabled={loading}
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
              loading
              ? "Saving..."
              : "Create Teacher"
            }


          </button>


        </div>


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