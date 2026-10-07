import {
  Users,
  Phone,
  Mail,
  UserRound,
  MessageCircle,
  Link2,
} from "lucide-react";



export default function StudentParentCard({

  student,

}) {


  const parent =
    student?.parent;



  return (

    <section

      className="
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-6
      shadow-sm
      "

    >



      {/* Header */}


      <div

        className="
        mb-6
        flex
        items-center
        gap-3
        "

      >


        <div

          className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-2xl
          bg-amber-100
          text-amber-600
          "

        >

          <Users size={22}/>

        </div>




        <div>


          <h2

            className="
            text-xl
            font-bold
            text-slate-900
            "

          >

            Parent / Guardian

          </h2>



          <p

            className="
            text-sm
            text-slate-500
            "

          >

            Linked parent information.

          </p>



        </div>



      </div>










      {
        parent

        ?

        (

        <div className="space-y-5">





          {/* Parent Profile */}


          <div

            className="
            rounded-2xl
            bg-slate-50
            p-5
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
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-white
                text-amber-600
                shadow-sm
                "

              >

                <UserRound size={28}/>

              </div>




              <div>


                <h3

                  className="
                  font-bold
                  text-slate-900
                  "

                >

                  {parent.name || "Parent Name"}

                </h3>



                <p

                  className="
                  text-sm
                  text-slate-500
                  "

                >

                  Parent / Guardian

                </p>


              </div>



            </div>


          </div>









          {/* Contact */}



          <ParentInfo

            icon={Phone}

            label="Phone"

            value={
              parent.phone
            }

          />





          <ParentInfo

            icon={Mail}

            label="Email"

            value={
              parent.email
            }

          />





          <ParentInfo

            icon={Link2}

            label="Relationship"

            value={
              parent.relationship
              ||
              "Guardian"
            }

          />










          {/* Children */}



          <div

            className="
            rounded-2xl
            border
            border-slate-100
            bg-slate-50
            p-4
            "

          >


            <div

              className="
              flex
              items-center
              gap-3
              "

            >


              <div

                className="
                rounded-xl
                bg-white
                p-2
                text-blue-600
                "

              >

                <Users size={18}/>

              </div>



              <div>


                <p

                  className="
                  text-xs
                  uppercase
                  text-slate-400
                  "

                >

                  Other Children

                </p>



                <p

                  className="
                  font-semibold
                  text-slate-900
                  "

                >

                  {
                    parent.children?.length
                    ||
                    0
                  }

                  {" "}
                  linked students

                </p>


              </div>


            </div>


          </div>









          {/* Communication */}



          <button

            type="button"

            className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-green-600
            px-4
            py-3
            font-semibold
            text-white
            hover:bg-green-700
            "

          >

            <MessageCircle size={18}/>

            Contact Parent


          </button>







        </div>

        )

        :


        (

        <div

          className="
          rounded-2xl
          bg-slate-50
          p-6
          text-center
          "

        >

          <Users

            size={35}

            className="
            mx-auto
            text-slate-400
            "

          />


          <p

            className="
            mt-3
            font-medium
            text-slate-600
            "

          >

            No parent linked

          </p>



        </div>


        )

      }







    </section>

  );

}









function ParentInfo({

icon:Icon,

label,

value,

}){


return (

<div

className="
flex
items-center
gap-3
rounded-xl
border
border-slate-100
bg-white
p-4
"

>


<div

className="
rounded-lg
bg-amber-50
p-2
text-amber-600
"

>

<Icon size={18}/>

</div>




<div>


<p

className="
text-xs
uppercase
tracking-wide
text-slate-400
"

>

{label}

</p>



<p

className="
mt-1
font-semibold
text-slate-900
"

>

{value || "-"}

</p>



</div>



</div>

);


}