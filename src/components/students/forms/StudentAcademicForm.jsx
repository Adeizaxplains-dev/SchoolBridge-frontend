import {
  GraduationCap,
  Hash,
  CalendarDays,
  School,
  Layers,
  Flag,
  BadgeCheck,
  Users,
} from "lucide-react";


import SectionHeader from "../../common/forms/SectionHeader";
import FormGrid from "../../common/forms/FormGrid";
import TextField from "../../common/forms/TextField";
import SelectField from "../../common/forms/SelectField";
import DateField from "../../common/forms/DateField";



export default function StudentAcademicForm({

  form,

  updateField,

  errors = {},

  loading = false,


  classes = [],

  sections = [],

  sessions = [],

  houses = [],

  statuses = [],


}) {


  return (

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



      {/* Header */}

      <SectionHeader

        icon={GraduationCap}

        title="Academic Information"

        description="
        Admission, enrollment and class placement details.
        "

      />





      <div
        className="
        space-y-8
        p-8
        "
      >





        {/* Admission Details */}


        <div>


          <h3
            className="
            mb-5
            flex
            items-center
            gap-2
            text-lg
            font-semibold
            text-slate-800
            "
          >

            <Hash size={18}/>

            Admission Details

          </h3>





          <FormGrid columns={3}>



            <TextField

              label="Admission Number"

              name="admissionNumber"

              required

              icon={Hash}

              value={
                form.admissionNumber
              }

              error={
                errors.admissionNumber
              }

              disabled={
                loading
              }

              onChange={(value)=>

                updateField(
                  "admissionNumber",
                  value
                )

              }

            />





            <DateField

              label="Admission Date"

              name="admissionDate"

              required

              value={
                form.admissionDate
              }

              error={
                errors.admissionDate
              }

              disabled={
                loading
              }

              icon={CalendarDays}

              onChange={(value)=>

                updateField(
                  "admissionDate",
                  value
                )

              }

            />





            <SelectField

              label="Academic Session"

              name="sessionId"

              required

              icon={School}

              options={
                sessions
              }

              value={
                form.sessionId
              }

              error={
                errors.sessionId
              }

              disabled={
                loading
              }

              onChange={(value)=>

                updateField(
                  "sessionId",
                  value
                )

              }

            />



          </FormGrid>


        </div>







        {/* Class Placement */}


        <div>


          <h3
            className="
            mb-5
            flex
            items-center
            gap-2
            text-lg
            font-semibold
            text-slate-800
            "
          >


            <Users size={18}/>


            Class Placement


          </h3>





          <FormGrid columns={3}>




            <SelectField

              label="Class"

              name="classId"

              required

              icon={School}

              options={
                classes
              }

              value={
                form.classId
              }

              error={
                errors.classId
              }

              disabled={
                loading
              }

              onChange={(value)=>

                updateField(
                  "classId",
                  value
                )

              }

            />






            <SelectField

              label="Section / Arm"

              name="sectionId"

              icon={Layers}

              options={
                sections
              }

              value={
                form.sectionId
              }

              error={
                errors.sectionId
              }

              disabled={
                loading
              }

              onChange={(value)=>

                updateField(
                  "sectionId",
                  value
                )

              }

            />







            <SelectField

              label="House"

              name="houseId"

              icon={Flag}

              options={
                houses
              }

              value={
                form.houseId
              }

              error={
                errors.houseId
              }

              disabled={
                loading
              }

              onChange={(value)=>

                updateField(
                  "houseId",
                  value
                )

              }

            />



          </FormGrid>


        </div>








        {/* Enrollment Status */}


        <div>


          <h3
            className="
            mb-5
            flex
            items-center
            gap-2
            text-lg
            font-semibold
            text-slate-800
            "
          >


            <BadgeCheck size={18}/>


            Enrollment Status


          </h3>






          <FormGrid columns={2}>



            <SelectField

              label="Student Status"

              name="status"

              required

              icon={BadgeCheck}

              options={
                statuses
              }

              value={
                form.status
              }

              error={
                errors.status
              }

              disabled={
                loading
              }

              onChange={(value)=>

                updateField(
                  "status",
                  value
                )

              }

            />



          </FormGrid>



        </div>




      </div>



    </section>

  );

}