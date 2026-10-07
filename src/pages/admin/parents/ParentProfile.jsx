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
  Pencil,
  Users,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  CalendarDays,
  UserCheck,
  UserX,
  ClipboardCheck,
  FileText,
  MessageSquare,
} from "lucide-react";


import {
  getParentById,
} from "../../../services/parentService";







export default function ParentProfile(){


  const {
    id
  } = useParams();


  const navigate =
    useNavigate();




  const [parent,setParent] =
    useState(null);



  const [loading,setLoading] =
    useState(true);



  const [error,setError] =
    useState("");









  useEffect(()=>{


    loadParent();


  },[id]);








  const loadParent=async()=>{


    try{


      setLoading(true);



      const response =
        await getParentById(id);



      setParent(

        response.data.parent ||

        response.data

      );



    }
    catch(err){


      setError(
        "Unable to load parent profile"
      );


    }
    finally{


      setLoading(false);


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

        Loading profile...


      </div>

    );

  }








  if(error){


    return (

      <div
      className="
      rounded-3xl
      bg-red-50
      p-6
      text-red-700
      "
      >

        {error}

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
      flex-col
      gap-4
      md:flex-row
      md:items-center
      md:justify-between
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







        <button

        onClick={()=>navigate(
          `/admin/parents/${id}/edit`
        )}

        className="
        flex
        items-center
        gap-2
        rounded-xl
        bg-blue-600
        px-5
        py-3
        text-sm
        font-semibold
        text-white
        hover:bg-blue-700
        "

        >

          <Pencil size={17}/>

          Edit Parent


        </button>



      </div>









      {/* Profile Card */}



      <div
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
        flex
        flex-col
        gap-6
        md:flex-row
        md:items-center
        "
        >




          <div
          className="
          flex
          h-24
          w-24
          items-center
          justify-center
          rounded-full
          bg-blue-100
          text-4xl
          font-bold
          text-blue-700
          "
          >

            {
              parent.name
              ?.charAt(0)
              ?.toUpperCase()
            }


          </div>






          <div
          className="
          flex-1
          "
          >



            <h1
            className="
            text-3xl
            font-bold
            text-slate-900
            "
            >

              {
                parent.name ||
                `${parent.firstName || ""} ${parent.lastName || ""}`
              }

            </h1>



            <p
            className="
            mt-2
            text-slate-500
            "
            >

              {
                parent.relationship ||
                "Parent"
              }

            </p>





            <StatusBadge
            status={parent.status}
            />



          </div>





        </div>






      </div>









      {/* Information Grid */}



      <div
      className="
      grid
      gap-6
      md:grid-cols-2
      xl:grid-cols-4
      "
      >



        <InfoCard

        icon={Mail}

        title="Email"

        value={
          parent.email
        }

        />




        <InfoCard

        icon={Phone}

        title="Phone"

        value={
          parent.phone
        }

        />





        <InfoCard

        icon={MapPin}

        title="Address"

        value={
          parent.address
        }

        />





        <InfoCard

        icon={CalendarDays}

        title="Joined"

        value={
          formatDate(
            parent.createdAt
          )
        }

        />



      </div>









      {/* Actions */}



      <div
      className="
      grid
      gap-5
      md:grid-cols-2
      xl:grid-cols-4
      "
      >



        <ActionCard

        icon={GraduationCap}

        title="Students"

        description="Manage linked children"

        onClick={()=>navigate(
          `/admin/parents/${id}/students`
        )}

        />





        <ActionCard

        icon={ClipboardCheck}

        title="Attendance"

        description="View student attendance"

        onClick={()=>navigate(
          `/admin/parents/${id}/attendance`
        )}

        />





        <ActionCard

        icon={FileText}

        title="Results"

        description="View academic results"

        onClick={()=>navigate(
          `/admin/parents/${id}/results`
        )}

        />





        <ActionCard

        icon={MessageSquare}

        title="Messages"

        description="Communication history"

        onClick={()=>navigate(
          `/admin/parents/${id}/messages`
        )}

        />




      </div>









      {/* Children */}



      <div
      className="
      rounded-3xl
      border
      bg-white
      p-6
      shadow-sm
      "
      >


        <div
        className="
        flex
        items-center
        gap-3
        "
        >

          <Users
          className="text-blue-600"
          />


          <h2
          className="
          text-xl
          font-bold
          "
          >

            Linked Students

          </h2>


        </div>







        <div
        className="
        mt-6
        grid
        gap-4
        md:grid-cols-2
        "
        >


        {
          parent.children?.length ?


          parent.children.map(child=>(


            <div

            key={
              child._id
            }

            className="
            rounded-2xl
            border
            p-5
            "

            >

              <h3
              className="
              font-bold
              "
              >

                {child.name}

              </h3>


              <p
              className="
              mt-1
              text-sm
              text-slate-500
              "
              >

                {child.className}

              </p>


            </div>


          ))


          :


          <p
          className="
          text-slate-500
          "
          >

            No students assigned.

          </p>


        }


        </div>






      </div>







    </div>

  );

}









function InfoCard({

  icon:Icon,

  title,

  value,

}){


return (

<div
className="
rounded-2xl
border
bg-white
p-5
"
>

<Icon
size={22}
className="text-blue-600"
/>


<p
className="
mt-3
text-sm
text-slate-500
"
>

{title}

</p>


<p
className="
mt-1
font-semibold
break-words
"
>

{value || "-"}

</p>


</div>

);


}









function ActionCard({

icon:Icon,

title,

description,

onClick,

}){


return (

<button

onClick={onClick}

className="
rounded-2xl
border
bg-white
p-5
text-left
transition
hover:shadow-lg
"

>


<Icon
className="text-blue-600"
/>


<h3
className="
mt-3
font-bold
"
>

{title}

</h3>


<p
className="
mt-1
text-sm
text-slate-500
"
>

{description}

</p>


</button>

);

}









function StatusBadge({

status

}){


const active =
status==="Active";



return (

<span

className={`

mt-4

inline-flex

items-center

gap-2

rounded-full

px-3

py-1

text-xs

font-semibold

${
active

?

"bg-emerald-100 text-emerald-700"

:

"bg-slate-100 text-slate-600"

}

`}

>

{
active
?
<UserCheck size={14}/>
:
<UserX size={14}/>
}


{status || "Unknown"}


</span>

);


}








function formatDate(date){


if(!date)
return "-";


return new Date(date)
.toLocaleDateString();


}