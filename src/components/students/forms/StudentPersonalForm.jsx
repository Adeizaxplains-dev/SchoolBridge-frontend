import {
  User,
  CalendarDays,
  Droplets,
  Globe,
  Languages,
} from "lucide-react";

import SectionHeader from "../../common/forms/SectionHeader";
import FormGrid from "../../common/forms/FormGrid";
import TextField from "../../common/forms/TextField";
import SelectField from "../../common/forms/SelectField";
import DateField from "../../common/forms/DateField";
import PhotoUploader from "../../common/forms/PhotoUploader";


export default function StudentPersonalForm({

  form,

  updateField,

  errors = {},

  loading = false,


  genders = [],

  bloodGroups = [],

  genotypes = [],

  countries = [],

  states = [],

  religions = [],

  languages = [],


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

        icon={User}

        title="Personal Information"

        description="
        Basic student identity and demographic information.
        "

      />



      <div
        className="
        space-y-10
        p-8
        "
      >



        {/* Passport */}

        <PhotoUploader

          value={
            form.passport
          }

          disabled={
            loading
          }

          label="
          Student Passport Photograph
          "

          onChange={(file,error)=>{

            updateField(
              "passport",
              file
            );

          }}

        />





        {/* Identity Details */}

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

            <User size={18}/>

            Identity Details

          </h3>



          <FormGrid columns={3}>


            <TextField

              label="First Name"

              name="firstName"

              required

              value={
                form.firstName
              }

              error={
                errors.firstName
              }

              disabled={
                loading
              }

              onChange={(value)=>
                updateField(
                  "firstName",
                  value
                )
              }

            />



            <TextField

              label="Middle Name"

              name="middleName"

              value={
                form.middleName
              }

              error={
                errors.middleName
              }

              disabled={
                loading
              }

              onChange={(value)=>
                updateField(
                  "middleName",
                  value
                )
              }

            />



            <TextField

              label="Last Name"

              name="lastName"

              required

              value={
                form.lastName
              }

              error={
                errors.lastName
              }

              disabled={
                loading
              }

              onChange={(value)=>
                updateField(
                  "lastName",
                  value
                )
              }

            />



            <SelectField

              label="Gender"

              name="gender"

              required

              options={
                genders
              }

              value={
                form.gender
              }

              error={
                errors.gender
              }

              disabled={
                loading
              }

              onChange={(value)=>
                updateField(
                  "gender",
                  value
                )
              }

            />



            <DateField

              label="Date of Birth"

              name="dateOfBirth"

              required

              value={
                form.dateOfBirth
              }

              error={
                errors.dateOfBirth
              }

              disabled={
                loading
              }

              max={
                new Date()
                .toISOString()
                .split("T")[0]
              }

              onChange={(value)=>
                updateField(
                  "dateOfBirth",
                  value
                )
              }

            />



            <TextField

              label="Place of Birth"

              name="placeOfBirth"

              value={
                form.placeOfBirth
              }

              error={
                errors.placeOfBirth
              }

              disabled={
                loading
              }

              onChange={(value)=>
                updateField(
                  "placeOfBirth",
                  value
                )
              }

            />


          </FormGrid>


        </div>





        {/* Demographic Details */}

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

            <Globe size={18}/>

            Demographic Details

          </h3>




          <FormGrid columns={3}>


            <SelectField

              label="Nationality"

              name="nationality"

              required

              options={
                countries
              }

              value={
                form.nationality
              }

              error={
                errors.nationality
              }

              disabled={
                loading
              }

              onChange={(value)=>
                updateField(
                  "nationality",
                  value
                )
              }

            />



            <SelectField

              label="State of Origin"

              name="stateOfOrigin"

              options={
                states
              }

              value={
                form.stateOfOrigin
              }

              error={
                errors.stateOfOrigin
              }

              disabled={
                loading
              }

              onChange={(value)=>
                updateField(
                  "stateOfOrigin",
                  value
                )
              }

            />



            <TextField

              label="Local Government Area"

              name="localGovernment"

              value={
                form.localGovernment
              }

              error={
                errors.localGovernment
              }

              disabled={
                loading
              }

              onChange={(value)=>
                updateField(
                  "localGovernment",
                  value
                )
              }

            />




            <SelectField

              label="Religion"

              name="religion"

              options={
                religions
              }

              value={
                form.religion
              }

              error={
                errors.religion
              }

              disabled={
                loading
              }

              onChange={(value)=>
                updateField(
                  "religion",
                  value
                )
              }

            />



            <SelectField

              label="Mother Tongue"

              name="motherTongue"

              options={
                languages
              }

              value={
                form.motherTongue
              }

              error={
                errors.motherTongue
              }

              disabled={
                loading
              }

              onChange={(value)=>
                updateField(
                  "motherTongue",
                  value
                )
              }

            />



            <SelectField

              label="Primary Language"

              name="primaryLanguage"

              options={
                languages
              }

              value={
                form.primaryLanguage
              }

              error={
                errors.primaryLanguage
              }

              disabled={
                loading
              }

              onChange={(value)=>
                updateField(
                  "primaryLanguage",
                  value
                )
              }

            />


          </FormGrid>


        </div>





        {/* Medical Snapshot */}

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

            <Droplets size={18}/>

            Medical Information

          </h3>



          <FormGrid columns={2}>


            <SelectField

              label="Blood Group"

              name="bloodGroup"

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



      </div>


    </section>

  );

}