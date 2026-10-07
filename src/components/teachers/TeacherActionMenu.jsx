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
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  BarChart3,
  UserX,
  UserCheck,
  Trash2,
} from "lucide-react";





export default function TeacherActionMenu({

  teacher,

  loading = false,

  onSuspend,

  onActivate,

  onDelete,

}) {


  const navigate = useNavigate();


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







  const teacherId =
    teacher?._id;





  const isSuspended =
    teacher?.status === "Suspended";








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

      onClick={() =>
        setOpen(
          previous => !previous
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
        w-64
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

          onClick={() =>
            goTo(
              `/admin/teachers/${teacherId}`
            )
          }

          />






          <MenuItem

          icon={Pencil}

          label="Edit Teacher"

          onClick={() =>
            goTo(
              `/admin/teachers/${teacherId}/edit`
            )
          }

          />







          <MenuItem

          icon={GraduationCap}

          label="Assign Classes"

          onClick={() =>
            goTo(
              `/admin/teachers/${teacherId}/classes`
            )
          }

          />







          <MenuItem

          icon={BookOpen}

          label="Assign Subjects"

          onClick={() =>
            goTo(
              `/admin/teachers/${teacherId}/subjects`
            )
          }

          />







          <MenuItem

          icon={CalendarDays}

          label="Teaching Schedule"

          onClick={() =>
            goTo(
              `/admin/teachers/${teacherId}/schedule`
            )
          }

          />







          <MenuItem

          icon={ClipboardCheck}

          label="Attendance"

          onClick={() =>
            goTo(
              `/admin/teachers/${teacherId}/attendance`
            )
          }

          />







          <MenuItem

          icon={BarChart3}

          label="Performance"

          onClick={() =>
            goTo(
              `/admin/teachers/${teacherId}/performance`
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

            label="Activate Teacher"

            className="
            text-emerald-600
            "

            onClick={()=>{

              closeMenu();

              onActivate?.(
                teacher
              );

            }}

            />

            )


            :


            (

            <MenuItem

            icon={UserX}

            label="Suspend Teacher"

            className="
            text-amber-600
            "

            onClick={()=>{

              closeMenu();

              onSuspend?.(
                teacher
              );

            }}

            />

            )

          }








          <MenuItem

          icon={Trash2}

          label="Delete Teacher"

          className="
          text-red-600
          "

          onClick={()=>{

            closeMenu();

            onDelete?.(
              teacher
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