import {
  HeartPulse,
  Shield,
  Pill,
  AlertTriangle,
  Phone,
  Hospital,
  FileText,
  Stethoscope,
} from "lucide-react";


import SectionHeader from "../../common/forms/SectionHeader";
import FormGrid from "../../common/forms/FormGrid";
import TextField from "../../common/forms/TextField";
import SelectField from "../../common/forms/SelectField";
import TextAreaField from "../../common/forms/TextAreaField";



export default function StudentMedicalForm({

  form,

  updateField,

  errors = {},

  loading = false,


  bloodGroups = [],

  genotypes = [],


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

        icon={HeartPulse}

        title="Medical Information"

        description="
        Health records, emergency details and special medical requirements.
        "

      />







      <div
        className="
        space-y-10
        p-8
        "
      >






        {/* Blood Information */}


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

            <Shield size={18}/>

            Blood & Genetic Information

          </h3>




          <FormGrid columns={2}>


            <SelectField

              label="Blood Group"

              name="bloodGroup"

              icon={HeartPulse}

              options={
                bloodGroups
              }

              value={
                form.bloodGroup
              }

              error={
                errors.bloodGroup
              }

              disabled={
                loading
              }

              onChange={(value)=>

                updateField(
                  "bloodGroup",
                  value
                )

              }

            />





            <SelectField

              label="Genotype"

              name="genotype"

              icon={Shield}

              options={
                genotypes
              }

              value={
                form.genotype
              }

              error={
                errors.genotype
              }

              disabled={
                loading
              }

              onChange={(value)=>

                updateField(
                  "genotype",
                  value
                )

              }

            />


          </FormGrid>


        </div>









        {/* Medical Conditions */}


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

            <AlertTriangle size={18}/>

            Health Conditions

          </h3>






          <FormGrid columns={3}>


            <TextField

              label="Known Allergies"

              name="allergies"

              icon={AlertTriangle}

              value={
                form.allergies
              }

              error={
                errors.allergies
              }

              disabled={
                loading
              }

              onChange={(value)=>

                updateField(
                  "allergies",
                  value
                )

              }

            />





            <TextField

              label="Medical Conditions"

              name="medicalConditions"

              icon={HeartPulse}

              value={
                form.medicalConditions
              }

              error={
                errors.medicalConditions
              }

              disabled={
                loading
              }

              onChange={(value)=>

                updateField(
                  "medicalConditions",
                  value
                )

              }

            />






            <TextField

              label="Current Medications"

              name="medications"

              icon={Pill}

              value={
                form.medications
              }

              error={
                errors.medications
              }

              disabled={
                loading
              }

              onChange={(value)=>

                updateField(
                  "medications",
                  value
                )

              }

            />





            <TextField

              label="Disability / Special Needs"

              name="specialNeeds"

              icon={Shield}

              value={
                form.specialNeeds
              }

              error={
                errors.specialNeeds
              }

              disabled={
                loading
              }

              onChange={(value)=>

                updateField(
                  "specialNeeds",
                  value
                )

              }

            />



          </FormGrid>


        </div>









        {/* Medical Provider */}


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

            <Stethoscope size={18}/>

            Medical Support

          </h3>






          <FormGrid columns={3}>


            <TextField

              label="Hospital / Clinic"

              name="hospital"

              icon={Hospital}

              value={
                form.hospital
              }

              error={
                errors.hospital
              }

              disabled={
                loading
              }

              onChange={(value)=>

                updateField(
                  "hospital",
                  value
                )

              }

            />





            <TextField

              label="Doctor"

              name="doctor"

              icon={Stethoscope}

              value={
                form.doctor
              }

              error={
                errors.doctor
              }

              disabled={
                loading
              }

              onChange={(value)=>

                updateField(
                  "doctor",
                  value
                )

              }

            />





            <TextField

              label="Health Insurance"

              name="healthInsurance"

              icon={Shield}

              value={
                form.healthInsurance
              }

              error={
                errors.healthInsurance
              }

              disabled={
                loading
              }

              onChange={(value)=>

                updateField(
                  "healthInsurance",
                  value
                )

              }

            />



          </FormGrid>



        </div>









        {/* Emergency */}


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

            <Phone size={18}/>

            Emergency Information

          </h3>






          <FormGrid columns={2}>


            <TextField

              label="Emergency Medical Contact"

              name="emergencyMedicalContact"

              icon={Phone}

              value={
                form.emergencyMedicalContact
              }

              error={
                errors.emergencyMedicalContact
              }

              disabled={
                loading
              }

              onChange={(value)=>

                updateField(
                  "emergencyMedicalContact",
                  value
                )

              }

            />


          </FormGrid>



        </div>









        {/* Notes */}


        <TextAreaField

          label="Additional Medical Notes"

          name="medicalNotes"

          icon={FileText}

          rows={5}

          value={
            form.medicalNotes
          }

          error={
            errors.medicalNotes
          }

          disabled={
            loading
          }

          onChange={(value)=>

            updateField(
              "medicalNotes",
              value
            )

          }

        />




      </div>



    </section>

  );

}