import {
  Loader2,
  Save,
  RotateCcw,
  Plus,
  FileText,
  X,
  AlertCircle,
} from "lucide-react";



export default function StudentFormActions({

  loading = false,

  dirty = false,

  mode = "create",


  onSubmit,

  onSaveDraft,

  onSaveAndAdd,

  onReset,

  onCancel,


}) {


  const isEdit =
    mode === "edit";



  return (

    <section

      className="
      sticky
      bottom-4
      z-30
      rounded-3xl
      border
      border-slate-200
      bg-white/95
      p-5
      shadow-xl
      backdrop-blur
      "

    >





      <div

        className="
        flex
        flex-col
        gap-5
        xl:flex-row
        xl:items-center
        xl:justify-between
        "

      >





        {/* Status */}



        <div
          className="
          flex
          items-start
          gap-4
          "
        >



          <div

            className={`
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl

            ${
              dirty
              ?
              "bg-amber-100 text-amber-600"
              :
              "bg-emerald-100 text-emerald-600"
            }
            `}

          >

            {
              dirty
              ?
              <AlertCircle size={22}/>
              :
              <Save size={22}/>
            }


          </div>






          <div>


            <h3

              className="
              font-semibold
              text-slate-900
              "

            >

              {
                isEdit
                ?
                "Update Student Record"
                :
                "Create Student Record"
              }


            </h3>




            <p

              className="
              mt-1
              text-sm
              text-slate-500
              "

            >

              {

                dirty

                ?

                "You have unsaved changes."

                :

                "All information is ready for submission."

              }


            </p>



          </div>




        </div>








        {/* Actions */}



        <div

          className="
          flex
          flex-wrap
          justify-end
          gap-3
          "

        >




          <ActionButton

            variant="secondary"

            icon={RotateCcw}

            disabled={loading}

            onClick={onReset}

          >

            Reset

          </ActionButton>







          <ActionButton

            variant="danger"

            icon={X}

            disabled={loading}

            onClick={onCancel}

          >

            Cancel

          </ActionButton>








          <ActionButton

            variant="draft"

            icon={FileText}

            disabled={loading}

            onClick={onSaveDraft}

          >

            Save Draft

          </ActionButton>








          {
            !isEdit && (

              <ActionButton

                variant="success"

                icon={Plus}

                loading={loading}

                disabled={loading}

                onClick={onSaveAndAdd}

              >

                Save & Add Another


              </ActionButton>

            )
          }









          <ActionButton

            variant="primary"

            icon={Save}

            loading={loading}

            disabled={loading}

            onClick={onSubmit}

          >

            {
              isEdit
              ?
              "Update Student"
              :
              "Save Student"
            }


          </ActionButton>





        </div>




      </div>



    </section>

  );

}









function ActionButton({

  children,

  icon: Icon,

  variant="secondary",

  loading=false,

  ...props


}) {



  const styles = {


    primary:
    `
    bg-blue-600
    text-white
    hover:bg-blue-700
    `,


    success:
    `
    bg-emerald-600
    text-white
    hover:bg-emerald-700
    `,


    danger:
    `
    border
    border-red-200
    text-red-600
    hover:bg-red-50
    `,


    draft:
    `
    border
    border-blue-200
    bg-blue-50
    text-blue-700
    hover:bg-blue-100
    `,


    secondary:
    `
    border
    border-slate-300
    text-slate-700
    hover:bg-slate-50
    `,

  };



  return (

    <button

      type="button"

      className={`
      inline-flex
      items-center
      justify-center
      gap-2
      rounded-xl
      px-5
      py-3
      text-sm
      font-semibold
      transition
      disabled:cursor-not-allowed
      disabled:opacity-60

      ${styles[variant]}

      `}

      {...props}

    >



      {
        loading

        ?

        <Loader2
          size={18}
          className="animate-spin"
        />

        :

        Icon && (
          <Icon size={18}/>
        )

      }


      {children}

    </button>

  );

}