import {
  Users,
  Mail,
  Phone,
  GraduationCap,
} from "lucide-react";


import ParentActionMenu from "./ParentActionMenu";





export default function ParentTable({

  parents = [],

  loading = false,

  onDelete,

  onSuspend,

  onActivate,

}) {





  if(loading){

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

        Loading parents...


      </div>

    );

  }








  if(!parents.length){

    return (

      <div
      className="
      rounded-3xl
      border
      bg-white
      p-12
      text-center
      "
      >


        <Users

        size={48}

        className="
        mx-auto
        text-slate-300
        "

        />


        <h3
        className="
        mt-4
        text-lg
        font-bold
        text-slate-800
        "
        >

          No parents found

        </h3>



        <p
        className="
        mt-2
        text-sm
        text-slate-500
        "
        >

          Add parents to start managing student relationships.

        </p>



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






      {/* Desktop Table */}


      <div
      className="
      hidden
      overflow-x-auto
      md:block
      "
      >


        <table
        className="
        w-full
        "
        >



          <thead
          className="
          bg-slate-50
          "
          >

            <tr>


              <Header>
                Parent
              </Header>


              <Header>
                Contact
              </Header>


              <Header>
                Students
              </Header>


              <Header>
                Status
              </Header>


              <Header>
                Joined
              </Header>


              <Header>
                Action
              </Header>


            </tr>


          </thead>







          <tbody
          className="
          divide-y
          divide-slate-100
          "
          >


          {
            parents.map(
              parent=>(


              <tr

              key={
                parent._id
              }

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
                  gap-3
                  "
                  >



                    <Avatar
                    name={
                      parent.name
                    }
                    />



                    <div>


                      <p
                      className="
                      font-semibold
                      text-slate-900
                      "
                      >

                        {
                          parent.name ||
                          "Unnamed Parent"
                        }

                      </p>


                      <p
                      className="
                      text-sm
                      text-slate-500
                      "
                      >

                        {
                          parent.relationship ||
                          "Parent"
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


                  <div
                  className="
                  space-y-2
                  text-sm
                  "
                  >


                    {
                      parent.email &&

                      <p
                      className="
                      flex
                      items-center
                      gap-2
                      text-slate-600
                      "
                      >

                        <Mail size={15}/>

                        {
                          parent.email
                        }

                      </p>

                    }




                    {
                      parent.phone &&

                      <p
                      className="
                      flex
                      items-center
                      gap-2
                      text-slate-600
                      "
                      >

                        <Phone size={15}/>

                        {
                          parent.phone
                        }

                      </p>

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
                  "
                  >


                    <GraduationCap
                    size={18}
                    className="
                    text-blue-600
                    "
                    />


                    <span
                    className="
                    font-semibold
                    "
                    >

                      {
                        parent.children?.length || 0
                      }


                    </span>


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
                    parent.status
                  }

                  />


                </td>









                <td
                className="
                px-6
                py-5
                text-sm
                text-slate-500
                "
                >

                  {
                    formatDate(
                      parent.createdAt
                    )
                  }


                </td>









                <td
                className="
                px-6
                py-5
                "
                >

                  <ParentActionMenu


                  parent={
                    parent
                  }


                  onDelete={
                    onDelete
                  }


                  onSuspend={
                    onSuspend
                  }


                  onActivate={
                    onActivate
                  }


                  />


                </td>




              </tr>


              )

            )
          }



          </tbody>


        </table>


      </div>









      {/* Mobile Cards */}


      <div
      className="
      space-y-4
      p-4
      md:hidden
      "
      >


      {
        parents.map(parent=>(


          <div

          key={
            parent._id
          }

          className="
          rounded-2xl
          border
          p-5
          "

          >



            <div
            className="
            flex
            justify-between
            "
            >


              <div>

                <h3
                className="
                font-bold
                "
                >

                  {parent.name}

                </h3>


                <p
                className="
                text-sm
                text-slate-500
                "
                >

                  {parent.email}

                </p>


              </div>


              <ParentActionMenu

              parent={parent}

              onDelete={onDelete}

              onSuspend={onSuspend}

              onActivate={onActivate}

              />


            </div>





            <div
            className="
            mt-4
            "
            >

              <StatusBadge

              status={
                parent.status
              }

              />


            </div>



          </div>


        ))

      }


      </div>







    </div>

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
text-left
text-xs
font-semibold
uppercase
tracking-wide
text-slate-500
"

>

{children}

</th>

);

}









function Avatar({
  name=""
}){


return (

<div
className="
flex
h-11
w-11
items-center
justify-center
rounded-full
bg-blue-100
font-bold
text-blue-700
"
>

{
name
?.charAt(0)
?.toUpperCase()
}


</div>

);

}









function StatusBadge({
  status
}){


const styles =

status === "Active"

?

"bg-emerald-100 text-emerald-700"


:

status === "Suspended"

?

"bg-red-100 text-red-700"


:

"bg-slate-100 text-slate-600";




return (

<span

className={`
rounded-full
px-3
py-1
text-xs
font-semibold
${styles}
`}

>

{
status || "Unknown"
}


</span>

);


}









function formatDate(date){


if(!date)
return "-";


return new Date(date)
.toLocaleDateString();


}