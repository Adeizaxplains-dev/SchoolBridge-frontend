import {
  Users,
  Search,
  UserPlus,
  Phone,
  Mail,
  Link2,
  UserCheck,
} from "lucide-react";


import SectionHeader from "../../common/forms/SectionHeader";
import FormGrid from "../../common/forms/FormGrid";
import SelectField from "../../common/forms/SelectField";
import TextField from "../../common/forms/TextField";



export default function StudentParentForm({

  form,

  updateField,

  errors = {},

  loading = false,


  parents = [],

  selectedParent = null,


  onSearch,

  onCreateParent,

  onClearParent,


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

        icon={Users}

        title="Parent / Guardian"

        description="
        Link the student to an existing parent or create a new parent record.
        "

      />






      <div
        className="
        space-y-8
        p-8
        "
      >






        {/* Parent Search */}


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

            <Search size={18}/>

            Find Parent

          </h3>





          <div
            className="
            grid
            gap-6
            lg:grid-cols-[1fr_auto]
            "
          >



            <TextField

              label="Search Parent"

              name="parentSearch"

              placeholder="
              Search by name, email or phone...
              "

              icon={Search}

              disabled={
                loading
              }

              onChange={(value)=>

                onSearch?.(
                  value
                )

              }

            />






            <div
              className="
              flex
              items-end
              "
            >


              <button

                type="button"

                disabled={
                  loading
                }

                onClick={
                  onCreateParent
                }

                className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-blue-600
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-blue-700
                disabled:opacity-50
                "

              >

                <UserPlus size={18}/>

                New Parent


              </button>


            </div>



          </div>



        </div>









        {/* Select Parent */}


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

            <UserCheck size={18}/>

            Parent Selection

          </h3>






          <SelectField

            label="Existing Parent"

            name="parentId"

            options={
              parents.map(parent => ({

                value:
                  parent._id,

                label:
                  parent.fullName

              }))
            }

            value={
              form.parentId
            }

            error={
              errors.parentId
            }

            disabled={
              loading
            }

            onChange={(value)=>

              updateField(
                "parentId",
                value
              )

            }

          />



        </div>









        {/* Selected Parent Preview */}


        {selectedParent && (


          <div
            className="
            rounded-3xl
            border
            border-slate-200
            bg-slate-50
            p-6
            "
          >



            <div
              className="
              flex
              flex-col
              gap-4
              md:flex-row
              md:items-center
              md:justify-between
              "
            >



              <div>


                <h3
                  className="
                  text-xl
                  font-bold
                  text-slate-900
                  "
                >

                  {selectedParent.fullName}


                </h3>


                <p
                  className="
                  mt-1
                  text-sm
                  text-slate-500
                  "
                >

                  Currently linked parent/guardian

                </p>


              </div>






              <button

                type="button"

                onClick={
                  onClearParent
                }

                disabled={
                  loading
                }

                className="
                rounded-xl
                border
                border-red-200
                bg-white
                px-4
                py-2
                text-sm
                font-semibold
                text-red-600
                hover:bg-red-50
                disabled:opacity-50
                "

              >

                Remove

              </button>



            </div>









            <div
              className="
              mt-6
              "
            >


              <FormGrid columns={3}>


                <InfoCard

                  icon={Phone}

                  label="Phone"

                  value={
                    selectedParent.phone
                  }

                />



                <InfoCard

                  icon={Mail}

                  label="Email"

                  value={
                    selectedParent.email
                  }

                />



                <InfoCard

                  icon={Link2}

                  label="Children"

                  value={
                    selectedParent.children?.length || 0
                  }

                />



              </FormGrid>



            </div>



          </div>


        )}





      </div>



    </section>

  );

}







function InfoCard({

  icon: Icon,

  label,

  value,

}) {


  return (

    <div
      className="
      rounded-2xl
      border
      border-slate-200
      bg-white
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
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          bg-blue-100
          text-blue-600
          "
        >

          <Icon size={18}/>

        </div>




        <div>

          <p
            className="
            text-xs
            text-slate-500
            "
          >

            {label}

          </p>



          <p
            className="
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