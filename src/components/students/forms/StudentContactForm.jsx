import {
  Phone,
  Mail,
  MapPin,
  Home,
  Globe,
} from "lucide-react";


import SectionHeader from "../../common/forms/SectionHeader";
import FormGrid from "../../common/forms/FormGrid";
import TextField from "../../common/forms/TextField";
import SelectField from "../../common/forms/SelectField";



export default function StudentContactForm({

  form,

  updateField,

  errors = {},

  loading = false,


  countries = [],

  states = [],


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

        icon={Phone}

        title="Contact Information"

        description="
        Student residential and communication details.
        "

      />





      <div
        className="
        space-y-8
        p-8
        "
      >




        {/* Communication */}


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

            <Mail size={18}/>

            Communication Details

          </h3>





          <FormGrid columns={3}>



            <TextField

              label="Email Address"

              name="email"

              type="email"

              value={
                form.email
              }

              error={
                errors.email
              }

              disabled={
                loading
              }

              icon={Mail}

              onChange={(value)=>
                updateField(
                  "email",
                  value
                )
              }

            />





            <TextField

              label="Phone Number"

              name="phone"

              type="tel"

              value={
                form.phone
              }

              error={
                errors.phone
              }

              disabled={
                loading
              }

              icon={Phone}

              onChange={(value)=>
                updateField(
                  "phone",
                  value
                )
              }

            />





            <TextField

              label="Alternative Phone"

              name="alternatePhone"

              type="tel"

              value={
                form.alternatePhone
              }

              error={
                errors.alternatePhone
              }

              disabled={
                loading
              }

              icon={Phone}

              onChange={(value)=>
                updateField(
                  "alternatePhone",
                  value
                )
              }

            />



          </FormGrid>


        </div>







        {/* Address */}


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


            <Home size={18}/>


            Residential Address


          </h3>





          <FormGrid columns={3}>


            <TextField

              label="Residential Address"

              name="address"

              value={
                form.address
              }

              error={
                errors.address
              }

              disabled={
                loading
              }

              icon={Home}

              onChange={(value)=>
                updateField(
                  "address",
                  value
                )
              }

            />





            <TextField

              label="City / Town"

              name="city"

              value={
                form.city
              }

              error={
                errors.city
              }

              disabled={
                loading
              }

              icon={MapPin}

              onChange={(value)=>
                updateField(
                  "city",
                  value
                )
              }

            />





            <TextField

              label="Nearest Landmark"

              name="landmark"

              value={
                form.landmark
              }

              error={
                errors.landmark
              }

              disabled={
                loading
              }

              icon={MapPin}

              onChange={(value)=>
                updateField(
                  "landmark",
                  value
                )
              }

            />



          </FormGrid>





          <div className="mt-6">


            <FormGrid columns={4}>


              <SelectField

                label="State"

                name="state"

                value={
                  form.state
                }

                error={
                  errors.state
                }

                disabled={
                  loading
                }

                options={
                  states
                }

                onChange={(value)=>
                  updateField(
                    "state",
                    value
                  )
                }

              />





              <SelectField

                label="Country"

                name="country"

                value={
                  form.country
                }

                error={
                  errors.country
                }

                disabled={
                  loading
                }

                options={
                  countries
                }

                icon={Globe}

                onChange={(value)=>
                  updateField(
                    "country",
                    value
                  )
                }

              />





              <TextField

                label="Postal Code"

                name="postalCode"

                value={
                  form.postalCode
                }

                error={
                  errors.postalCode
                }

                disabled={
                  loading
                }

                onChange={(value)=>
                  updateField(
                    "postalCode",
                    value
                  )
                }

              />



            </FormGrid>


          </div>



        </div>





      </div>



    </section>

  );

}