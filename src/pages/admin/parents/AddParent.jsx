import {
  useState,
} from "react";


import {
  useNavigate,
} from "react-router-dom";


import {
  ArrowLeft,
  Save,
  UserPlus,
  AlertCircle,
  CheckCircle,
} from "lucide-react";


import {
  createParent,
} from "../../../services/parentService";





const initialForm = {

  firstName:"",
  lastName:"",
  email:"",
  phone:"",
  relationship:"",
  address:"",
  password:"",

};







export default function AddParent(){


  const navigate =
    useNavigate();




  const [form,setForm] =
    useState(initialForm);



  const [loading,setLoading] =
    useState(false);



  const [error,setError] =
    useState("");



  const [success,setSuccess] =
    useState("");








  const handleChange=(e)=>{


    const {
      name,
      value
    } = e.target;



    setForm(
      previous=>({

        ...previous,

        [name]:value,

      })
    );


  };









  const handleSubmit=async(e)=>{


    e.preventDefault();



    try{


      setLoading(true);

      setError("");



      await createParent(form);



      setSuccess(
        "Parent created successfully"
      );



      setTimeout(()=>{


        navigate(
          "/admin/parents"
        );


      },1000);



    }
    catch(err){


      setError(

        err.response?.data?.message ||

        "Unable to create parent"

      );


    }
    finally{


      setLoading(false);


    }


  };









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






        <div
        className="
        flex
        items-center
        gap-3
        "
        >

          <UserPlus
          className="text-blue-600"
          />

          <h1
          className="
          text-3xl
          font-bold
          text-slate-900
          "
          >

            Add Parent

          </h1>


        </div>



      </div>









      {
        error && (

        <div
        className="
        flex
        items-center
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








      {
        success && (

        <div
        className="
        flex
        items-center
        gap-3
        rounded-xl
        border
        border-emerald-200
        bg-emerald-50
        p-4
        text-emerald-700
        "
        >

          <CheckCircle size={20}/>

          {success}


        </div>

        )

      }









      {/* Form */}



      <form

      onSubmit={handleSubmit}

      className="
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-8
      shadow-sm
      "

      >





        <div
        className="
        grid
        gap-6
        md:grid-cols-2
        "
        >








          <Input

          label="First Name"

          name="firstName"

          value={
            form.firstName
          }

          onChange={handleChange}

          required

          />








          <Input

          label="Last Name"

          name="lastName"

          value={
            form.lastName
          }

          onChange={handleChange}

          required

          />









          <Input

          label="Email Address"

          type="email"

          name="email"

          value={
            form.email
          }

          onChange={handleChange}

          required

          />








          <Input

          label="Phone Number"

          name="phone"

          value={
            form.phone
          }

          onChange={handleChange}

          />








          <Input

          label="Relationship"

          name="relationship"

          value={
            form.relationship
          }

          onChange={handleChange}

          placeholder="
          Father, Mother, Guardian
          "

          />








          <Input

          label="Account Password"

          type="password"

          name="password"

          value={
            form.password
          }

          onChange={handleChange}

          />







        </div>








        <div
        className="
        mt-6
        "
        >


          <label
          className="
          mb-2
          block
          text-sm
          font-semibold
          text-slate-700
          "
          >

            Address

          </label>




          <textarea


          name="address"


          value={
            form.address
          }


          onChange={handleChange}


          rows="4"


          className="
          w-full
          rounded-xl
          border
          border-slate-200
          p-4
          outline-none
          focus:border-blue-500
          "

          />



        </div>









        <div
        className="
        mt-8
        flex
        justify-end
        "
        >



          <button

          disabled={loading}

          className="
          inline-flex
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
              ?
              "Saving..."
              :
              "Create Parent"
            }


          </button>



        </div>








      </form>








    </div>

  );

}









function Input({

  label,

  name,

  value,

  onChange,

  type="text",

  required=false,

  placeholder="",

}){


return (

<div>


<label
className="
mb-2
block
text-sm
font-semibold
text-slate-700
"
>

{label}

</label>



<input

type={type}

name={name}

value={value}

onChange={onChange}

required={required}

placeholder={placeholder}

className="
w-full
rounded-xl
border
border-slate-200
px-4
py-3
outline-none
focus:border-blue-500
"

/>


</div>

);

}