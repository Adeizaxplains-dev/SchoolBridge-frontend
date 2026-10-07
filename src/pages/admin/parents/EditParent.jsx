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
  Save,
  UserPen,
  AlertCircle,
  CheckCircle,
} from "lucide-react";


import {
  getParentById,
  updateParent,
} from "../../../services/parentService";





const emptyForm = {

  firstName:"",
  lastName:"",
  email:"",
  phone:"",
  relationship:"",
  address:"",

};








export default function EditParent(){


  const {
    id
  } = useParams();


  const navigate =
    useNavigate();




  const [form,setForm] =
    useState(emptyForm);



  const [loading,setLoading] =
    useState(true);



  const [saving,setSaving] =
    useState(false);



  const [error,setError] =
    useState("");



  const [success,setSuccess] =
    useState("");









  useEffect(()=>{


    loadParent();


  },[id]);









  const loadParent=async()=>{


    try{


      setLoading(true);


      const response =
        await getParentById(id);



      const parent =
        response.data.parent ||
        response.data;



      setForm({

        firstName:
          parent.firstName || "",


        lastName:
          parent.lastName || "",


        email:
          parent.email || "",


        phone:
          parent.phone || "",


        relationship:
          parent.relationship || "",


        address:
          parent.address || "",

      });



    }
    catch(err){


      setError(

        err.response?.data?.message ||

        "Unable to load parent"

      );


    }
    finally{


      setLoading(false);


    }


  };









  const handleChange=(e)=>{


    const {
      name,
      value
    }=e.target;



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


      setSaving(true);

      setError("");



      await updateParent(
        id,
        form
      );



      setSuccess(
        "Parent updated successfully"
      );



      setTimeout(()=>{


        navigate(
          `/admin/parents/${id}`
        );


      },1000);



    }
    catch(err){


      setError(

        err.response?.data?.message ||

        "Unable to update parent"

      );


    }
    finally{


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
      text-slate-500
      "
      >

        Loading parent information...

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

          <UserPen
          className="text-blue-600"
          />

          <h1
          className="
          text-3xl
          font-bold
          text-slate-900
          "
          >

            Edit Parent

          </h1>


        </div>




      </div>









      {
        error && (

          <AlertBox
          type="error"
          >
            {error}
          </AlertBox>

        )
      }







      {
        success && (

          <AlertBox
          type="success"
          >
            {success}
          </AlertBox>

        )
      }









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
          value={form.firstName}
          onChange={handleChange}
          required
          />




          <Input
          label="Last Name"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          required
          />




          <Input
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          />




          <Input
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          />




          <Input
          label="Relationship"
          name="relationship"
          value={form.relationship}
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

          value={form.address}

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

          disabled={saving}

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
              saving
              ?
              "Saving..."
              :
              "Update Parent"
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









function AlertBox({

  children,

  type,

}){


const success =
type==="success";



return (

<div
className={`
flex
items-center
gap-3
rounded-xl
p-4
${
success
?
"bg-emerald-50 text-emerald-700 border border-emerald-200"
:
"bg-red-50 text-red-700 border border-red-200"
}
`}
>

{
success
?
<CheckCircle size={20}/>
:
<AlertCircle size={20}/>
}


{children}


</div>

);


}