import {
  HeartPulse,
  ShieldCheck,
  AlertTriangle,
  Pill,
  Hospital,
  Phone,
  Stethoscope,
  FileText,
} from "lucide-react";



export default function StudentMedicalCard({

  student,

}) {



  const medical =
    student?.medical || {};




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
          bg-red-100
          text-red-600
          "

        >

          <HeartPulse size={22}/>

        </div>



        <div>


          <h2

            className="
            text-xl
            font-bold
            text-slate-900
            "

          >

            Medical Information

          </h2>



          <p

            className="
            text-sm
            text-slate-500
            "

          >

            Health and emergency records.

          </p>



        </div>


      </div>










      <div

        className="
        space-y-5
        "

      >





        {/* Basic Health */}


        <div

          className="
          grid
          gap-4
          md:grid-cols-2
          "

        >


          <MedicalItem

            icon={HeartPulse}

            label="Blood Group"

            value={
              medical.bloodGroup
            }

          />



          <MedicalItem

            icon={ShieldCheck}

            label="Genotype"

            value={
              medical.genotype
            }

          />


        </div>









        <MedicalItem

          icon={AlertTriangle}

          label="Allergies"

          value={
            medical.allergies
          }

          alert

        />







        <MedicalItem

          icon={HeartPulse}

          label="Medical Conditions"

          value={
            medical.medicalConditions
          }

        />








        <MedicalItem

          icon={Pill}

          label="Current Medication"

          value={
            medical.medications
          }

        />









        <MedicalItem

          icon={ShieldCheck}

          label="Special Needs / Disability"

          value={
            medical.specialNeeds
          }

        />









        {/* Hospital */}


        <div

          className="
          grid
          gap-4
          md:grid-cols-2
          "

        >



          <MedicalItem

            icon={Hospital}

            label="Hospital / Clinic"

            value={
              medical.hospital
            }

          />





          <MedicalItem

            icon={Stethoscope}

            label="Doctor"

            value={
              medical.doctor
            }

          />



        </div>









        <MedicalItem

          icon={Phone}

          label="Emergency Contact"

          value={
            medical.emergencyMedicalContact
          }

        />









        <MedicalItem

          icon={FileText}

          label="Additional Notes"

          value={
            medical.medicalNotes
          }

        />








      </div>







    </section>

  );

}









function MedicalItem({

icon:Icon,

label,

value,

alert=false,

}) {



return (

<div

className={`
rounded-2xl
border
p-4

${
alert
?
"border-red-200 bg-red-50"
:
"border-slate-100 bg-slate-50"
}

`}

>



<div

className="
flex
items-start
gap-3
"

>



<div

className={`
rounded-xl
p-2

${
alert
?
"bg-white text-red-600"
:
"bg-white text-red-500"
}

`}

>

<Icon size={18}/>

</div>






<div className="flex-1">


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