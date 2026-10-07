import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  BookOpen,
  School,
  CalendarDays,
  ClipboardCheck,
  BarChart3,
  Pencil,
  UserCheck,
  UserX,
} from "lucide-react";

export default function TeacherProfile() {
  const navigate = useNavigate();
  const { id } = useParams();


  // Replace with useTeacher(id) hook later
  const teacher = null;


  const loading = false;


  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">

        <div className="h-40 rounded-3xl bg-slate-200" />

        <div className="grid gap-6 md:grid-cols-3">

          <div className="h-32 rounded-2xl bg-slate-200" />
          <div className="h-32 rounded-2xl bg-slate-200" />
          <div className="h-32 rounded-2xl bg-slate-200" />

        </div>

      </div>
    );
  }


  return (
    <div className="space-y-8">


      {/* Header */}

      <div className="flex items-center justify-between">

        <button
          onClick={() =>
            navigate("/admin/teachers")
          }
          className="
          flex
          items-center
          gap-2
          rounded-xl
          px-4
          py-2
          text-sm
          font-medium
          text-slate-600
          hover:bg-slate-100
          "
        >

          <ArrowLeft size={18}/>

          Back to Teachers

        </button>


        <button
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

          <Pencil size={18}/>

          Edit Teacher

        </button>


      </div>





      {/* Profile Card */}

      <section
        className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        "
      >

        <div
          className="
          h-32
          bg-gradient-to-r
          from-blue-600
          to-indigo-600
          "
        />


        <div className="relative px-6 pb-8">


          <div
            className="
            -mt-16
            flex
            flex-col
            gap-5
            md:flex-row
            md:items-end
            md:justify-between
            "
          >

            <div className="flex items-end gap-5">


              <div
                className="
                flex
                h-32
                w-32
                items-center
                justify-center
                rounded-3xl
                border-4
                border-white
                bg-slate-200
                text-4xl
                font-bold
                text-slate-600
                shadow-lg
                "
              >

                {teacher?.name
                  ?.charAt(0)
                  ||
                  "T"
                }

              </div>



              <div className="mb-2">


                <h1 className="text-3xl font-bold text-slate-900">

                  {teacher?.name || "Teacher Name"}

                </h1>


                <p className="text-slate-500">

                  {teacher?.email || "teacher@email.com"}

                </p>


                <span
                  className="
                  mt-3
                  inline-flex
                  rounded-full
                  bg-emerald-100
                  px-3
                  py-1
                  text-sm
                  font-semibold
                  text-emerald-700
                  "
                >

                  {teacher?.status || "Active"}

                </span>


              </div>


            </div>


          </div>


        </div>


      </section>






      {/* Summary Cards */}

      <div
        className="
        grid
        gap-6
        md:grid-cols-2
        xl:grid-cols-4
        "
      >

        <InfoCard
          icon={School}
          title="Classes"
          value={
            teacher?.classes?.length || 0
          }
        />

        <InfoCard
          icon={BookOpen}
          title="Subjects"
          value={
            teacher?.subjects?.length || 0
          }
        />


        <InfoCard
          icon={CalendarDays}
          title="Attendance"
          value="0%"
        />


        <InfoCard
          icon={BarChart3}
          title="Performance"
          value="0%"
        />


      </div>






      {/* Details */}

      <div
        className="
        grid
        gap-6
        lg:grid-cols-3
        "
      >


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

          <h2 className="mb-5 text-lg font-bold text-slate-900">

            Contact Information

          </h2>


          <Detail
            icon={Mail}
            label="Email"
            value={
              teacher?.email || "-"
            }
          />


          <Detail
            icon={Phone}
            label="Phone"
            value={
              teacher?.phone || "-"
            }
          />

        </div>





        <div
          className="
          lg:col-span-2
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
          "
        >

          <h2 className="text-lg font-bold text-slate-900">

            Teacher Activity

          </h2>


          <div className="mt-5 text-sm text-slate-500">

            Activity history will appear here.

          </div>


        </div>


      </div>






      {/* Tabs */}

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

        <div
          className="
          grid
          gap-3
          sm:grid-cols-2
          lg:grid-cols-5
          "
        >

          <Tab icon={School} text="Classes"/>

          <Tab icon={BookOpen} text="Subjects"/>

          <Tab icon={CalendarDays} text="Schedule"/>

          <Tab icon={ClipboardCheck} text="Attendance"/>

          <Tab icon={BarChart3} text="Performance"/>

        </div>


      </div>


    </div>
  );
}





function InfoCard({
  icon: Icon,
  title,
  value,
}) {

  return (
    <div
      className="
      rounded-2xl
      border
      border-slate-200
      bg-white
      p-6
      shadow-sm
      "
    >

      <Icon
        className="text-blue-600"
        size={25}
      />

      <p className="mt-4 text-sm text-slate-500">

        {title}

      </p>

      <h3 className="mt-1 text-3xl font-bold">

        {value}

      </h3>


    </div>
  );
}





function Detail({
  icon: Icon,
  label,
  value,
}) {

  return (
    <div className="mb-4 flex items-center gap-3">

      <Icon
        size={18}
        className="text-slate-400"
      />

      <div>

        <p className="text-xs text-slate-400">

          {label}

        </p>


        <p className="text-sm font-medium text-slate-700">

          {value}

        </p>

      </div>

    </div>
  );
}





function Tab({
  icon: Icon,
  text,
}) {

  return (
    <button
      className="
      flex
      items-center
      justify-center
      gap-2
      rounded-xl
      border
      border-slate-200
      px-4
      py-3
      text-sm
      font-medium
      text-slate-600
      hover:bg-slate-50
      "
    >

      <Icon size={17}/>

      {text}

    </button>
  );
}