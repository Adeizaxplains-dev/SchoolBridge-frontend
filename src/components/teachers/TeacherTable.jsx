import {
  Eye,
  Edit,
  Users,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  BarChart3,
  Trash2,
} from "lucide-react";

import TeacherActionMenu from "./TeacherActionMenu";



export default function TeacherTable({
  teachers = [],
  loading = false,
  onDelete,
  onSuspend,
  onActivate,
}) {



  if (loading) {

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

        Loading teachers...

      </div>

    );

  }







  if (!teachers.length) {

    return (

      <div
      className="
      rounded-3xl
      border
      bg-white
      p-10
      text-center
      text-slate-500
      "
      >

        No teachers found.

      </div>

    );

  }









  return (

    <div
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
      overflow-x-auto
      "
      >


        <table
        className="
        w-full
        text-left
        "
        >



          <thead
          className="
          border-b
          bg-slate-50
          "
          >

            <tr>


              <Header>
                Teacher
              </Header>


              <Header>
                Department
              </Header>


              <Header>
                Classes
              </Header>


              <Header>
                Subjects
              </Header>


              <Header>
                Status
              </Header>


              <Header>
                Actions
              </Header>



            </tr>

          </thead>








          <tbody
          className="
          divide-y
          "
          >


          {
            teachers.map(
              teacher=>(


              <TeacherRow

              key={teacher._id}

              teacher={teacher}

              onDelete={onDelete}

              onSuspend={onSuspend}

              onActivate={onActivate}

              />


            ))

          }


          </tbody>



        </table>



      </div>



    </div>

  );

}









function TeacherRow({
  teacher,
  onDelete,
  onSuspend,
  onActivate,
}) {


return (

<tr
className="
hover:bg-slate-50
transition
"
>




<td
className="
px-6
py-5
"
>


<div
className="
flex
items-center
gap-4
"
>


<div
className="
h-12
w-12
rounded-full
bg-blue-100
flex
items-center
justify-center
font-bold
text-blue-700
"
>


{
teacher.firstName?.charAt(0)
||
"T"
}


</div>




<div>

<p
className="
font-semibold
text-slate-900
"
>

{
teacher.firstName
}

{" "}

{
teacher.lastName
}

</p>


<p
className="
text-sm
text-slate-500
"
>

{
teacher.email
}

</p>


</div>


</div>


</td>








<td
className="
px-6
py-5
"
>


<span
className="
text-sm
text-slate-700
"
>

{
teacher.department
||
"—"
}

</span>


</td>








<td
className="
px-6
py-5
"
>


<div
className="
flex
items-center
gap-2
text-sm
"
>

<Users
size={16}
/>


{
teacher.classes?.length
||
0
}


</div>


</td>








<td
className="
px-6
py-5
"
>


<div
className="
flex
items-center
gap-2
text-sm
"
>

<BookOpen
size={16}
/>


{
teacher.subjects?.length
||
0
}


</div>


</td>








<td
className="
px-6
py-5
"
>


<StatusBadge

status={
teacher.status
}

 />


</td>








<td
className="
px-6
py-5
"
>


<TeacherActionMenu

teacher={teacher}

onDelete={onDelete}

onSuspend={onSuspend}

onActivate={onActivate}

/>


</td>







</tr>

);

}









function Header({
children
}){

return (

<th
className="
px-6
py-4
text-sm
font-semibold
text-slate-600
"
>

{children}

</th>

);

}









function StatusBadge({
status
}){


const styles = {

Active:
"bg-emerald-100 text-emerald-700",

Suspended:
"bg-red-100 text-red-700",

"On Leave":
"bg-orange-100 text-orange-700",

};



return (

<span
className={`
rounded-full
px-3
py-1
text-xs
font-semibold

${styles[status] ||
"bg-slate-100 text-slate-600"}

`}
>

{
status ||
"Unknown"
}

</span>

);

}