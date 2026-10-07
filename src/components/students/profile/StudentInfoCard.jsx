import {
  User,
  Phone,
  Mail,
  MapPin,
  Globe,
  Calendar,
  Heart,
} from "lucide-react";



export default function StudentInfoCard({

  student,

}) {


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
          bg-blue-100
          text-blue-600
          "

        >

          <User size={22}/>

        </div>




        <div>


          <h2

            className="
            text-xl
            font-bold
            text-slate-900
            "

          >

            Personal Information

          </h2>



          <p

            className="
            text-sm
            text-slate-500
            "

          >

            Student identity and contact details.

          </p>



        </div>


      </div>








      <div

        className="
        grid
        gap-5
        md:grid-cols-2
        "

      >




        <InfoItem

          icon={User}

          label="Gender"

          value={
            student?.gender
          }

        />



        <InfoItem

          icon={Calendar}

          label="Date of Birth"

          value={
            formatDate(
              student?.dateOfBirth
            )
          }

        />



        <InfoItem

          icon={Globe}

          label="Nationality"

          value={
            student?.nationality
          }

        />



        <InfoItem

          icon={MapPin}

          label="State of Origin"

          value={
            student?.stateOfOrigin
          }

        />



        <InfoItem

          icon={Heart}

          label="Religion"

          value={
            student?.religion
          }

        />



        <InfoItem

          icon={Phone}

          label="Phone Number"

          value={
            student?.phone
          }

        />



        <InfoItem

          icon={Mail}

          label="Email Address"

          value={
            student?.email
          }

        />



        <InfoItem

          icon={MapPin}

          label="Residential Address"

          value={
            student?.address
          }

        />





      </div>




    </section>

  );

}









function InfoItem({

  icon:Icon,

  label,

  value,

}){


return (

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
items-start
gap-3
"

>



<div

className="
rounded-xl
bg-white
p-2
text-slate-600
shadow-sm
"

>

<Icon size={18}/>

</div>





<div>

<p

className="
text-xs
font-medium
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


</div>

);


}









function formatDate(date){


if(!date)
return "-";



return new Date(date)
.toLocaleDateString(
"en-US",
{
year:"numeric",
month:"long",
day:"numeric",
}
);


}