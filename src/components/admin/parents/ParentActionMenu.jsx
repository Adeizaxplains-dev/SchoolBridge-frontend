import {
  useEffect,
  useRef,
  useState,
} from "react";


import {
  useNavigate,
} from "react-router-dom";



import {
  MoreVertical,
  Eye,
  Pencil,
  GraduationCap,
  ClipboardCheck,
  FileText,
  MessageSquare,
  WalletCards,
  UserX,
  UserCheck,
  Trash2,
  Link,
} from "lucide-react";








export default function ParentActionMenu({

  parent,

  loading = false,


  onSuspend,

  onActivate,

  onDelete,

}) {



  const navigate =
    useNavigate();



  const [open,setOpen] =
    useState(false);



  const menuRef =
    useRef(null);








  useEffect(()=>{


    const handleClickOutside=(event)=>{


      if(

        menuRef.current &&

        !menuRef.current.contains(
          event.target
        )

      ){

        setOpen(false);

      }


    };



    document.addEventListener(
      "mousedown",
      handleClickOutside
    );



    return ()=>{


      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );


    };


  },[]);









  const closeMenu=()=>{

    setOpen(false);

  };






  const goTo=(path)=>{


    closeMenu();


    navigate(path);


  };







  const parentId =
    parent?._id;





  const isSuspended =
    parent?.status === "Suspended";







  return (

    <div

    ref={menuRef}

    className="
    relative
    inline-block
    text-left
    "

    >





      <button


      type="button"


      disabled={loading}


      onClick={()=>


        setOpen(
          previous =>
          !previous
        )


      }


      className="
      rounded-lg
      p-2
      transition
      hover:bg-slate-100
      disabled:opacity-50
      "

      >


        <MoreVertical
        size={18}
        />


      </button>









      {
        open && (


        <div

        className="
        absolute
        right-0
        z-50
        mt-2
        w-72
        overflow-hidden
        rounded-xl
        border
        border-slate-200
        bg-white
        shadow-xl
        "

        >






          <MenuItem

          icon={Eye}

          label="View Profile"


          onClick={()=>


            goTo(
              `/admin/parents/${parentId}`
            )


          }


          />








          <MenuItem

          icon={Pencil}

          label="Edit Parent"


          onClick={()=>


            goTo(
              `/admin/parents/${parentId}/edit`
            )


          }


          />








          <MenuItem

          icon={Link}

          label="Assign Students"


          onClick={()=>


            goTo(
              `/admin/parents/${parentId}/students`
            )


          }


          />








          <MenuItem

          icon={ClipboardCheck}

          label="Attendance History"


          onClick={()=>


            goTo(
              `/admin/parents/${parentId}/attendance`
            )


          }


          />








          <MenuItem

          icon={FileText}

          label="Student Results"


          onClick={()=>


            goTo(
              `/admin/parents/${parentId}/results`
            )


          }


          />








          <MenuItem

          icon={MessageSquare}

          label="Messages"


          onClick={()=>


            goTo(
              `/admin/parents/${parentId}/messages`
            )


          }


          />








          <MenuItem

          icon={WalletCards}

          label="Payments"


          onClick={()=>


            goTo(
              `/admin/parents/${parentId}/payments`
            )


          }


          />









          <div
          className="
          my-1
          border-t
          "
          />









          {

            isSuspended ?


            (

              <MenuItem

              icon={UserCheck}

              label="Activate Parent"


              className="
              text-emerald-600
              "


              onClick={()=>{


                closeMenu();


                onActivate?.(
                  parent
                );


              }}


              />


            )

            :


            (

              <MenuItem

              icon={UserX}

              label="Suspend Parent"


              className="
              text-amber-600
              "


              onClick={()=>{


                closeMenu();


                onSuspend?.(
                  parent
                );


              }}


              />


            )

          }









          <MenuItem

          icon={Trash2}

          label="Delete Parent"


          className="
          text-red-600
          "


          onClick={()=>{


            closeMenu();


            onDelete?.(
              parent
            );


          }}


          />







        </div>


        )

      }







    </div>

  );

}









function MenuItem({

  icon:Icon,

  label,

  onClick,

  className="",

}){


return (

<button

type="button"

onClick={onClick}


className={`

flex

w-full

items-center

gap-3

px-4

py-3

text-sm

transition

hover:bg-slate-100

${className}

`}

>


<Icon size={18}/>


<span>

{label}

</span>


</button>


);


}