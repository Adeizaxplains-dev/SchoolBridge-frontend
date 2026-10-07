import {
  FileText,
  Upload,
  Trash2,
  Eye,
  FileCheck,
} from "lucide-react";


import SectionHeader from "../../common/forms/SectionHeader";



const DOCUMENTS = [

  {
    key: "birthCertificate",
    label: "Birth Certificate",
    required: true,
    description:
      "Official proof of student's birth.",
  },


  {
    key: "passport",
    label: "Passport Photograph",
    required: true,
    description:
      "Recent passport photograph.",
  },


  {
    key: "previousResult",
    label: "Previous School Result",
    description:
      "Academic records from previous school.",
  },


  {
    key: "transferLetter",
    label: "Transfer Letter",
    description:
      "Required for transferred students.",
  },


  {
    key: "medicalReport",
    label: "Medical Report",
    description:
      "Student medical documentation.",
  },


  {
    key: "immunizationCard",
    label: "Immunization Card",
    description:
      "Vaccination records.",
  },


  {
    key: "parentId",
    label: "Parent / Guardian ID",
    description:
      "Identification document of guardian.",
  },


  {
    key: "otherDocument",
    label: "Other Supporting Document",
    description:
      "Any additional admission document.",
  },

];





export default function StudentDocumentForm({

  form,

  updateField,

  loading = false,


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



      <SectionHeader

        icon={FileText}

        title="Student Documents"

        description="
        Upload admission documents and supporting files.
        "

      />






      <div
        className="
        grid
        gap-6
        p-8
        lg:grid-cols-2
        "
      >



        {DOCUMENTS.map((document)=>(


          <DocumentUploadCard


            key={
              document.key
            }


            document={
              document
            }


            file={
              form[document.key]
            }


            loading={
              loading
            }


            onUpload={(file)=>

              updateField(
                document.key,
                file
              )

            }


            onRemove={()=>

              updateField(
                document.key,
                null
              )

            }


          />


        ))}



      </div>



    </section>

  );

}









function DocumentUploadCard({

  document,

  file,

  loading,

  onUpload,

  onRemove,


}) {


  const previewFile = () => {

    if (!file) return;


    const url =
      URL.createObjectURL(file);


    window.open(
      url,
      "_blank"
    );

  };



  return (

    <div
      className="
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-5
      transition
      hover:shadow-md
      "
    >




      {/* Document Header */}


      <div
        className="
        flex
        items-start
        justify-between
        "
      >



        <div>


          <h3
            className="
            font-semibold
            text-slate-900
            "
          >

            {document.label}


            {document.required && (

              <span
                className="
                ml-2
                text-red-500
                "
              >

                *

              </span>

            )}


          </h3>




          <p
            className="
            mt-1
            text-sm
            text-slate-500
            "
          >

            {document.description}

          </p>



        </div>





        <FileCheck

          size={22}

          className="
          text-slate-400
          "

        />



      </div>








      {!file ? (



        <label

          className="
          mt-5
          flex
          cursor-pointer
          flex-col
          items-center
          justify-center
          rounded-2xl
          border-2
          border-dashed
          border-slate-300
          px-6
          py-8
          transition
          hover:border-blue-500
          hover:bg-blue-50
          "

        >



          <Upload

            size={32}

            className="
            text-slate-400
            "

          />



          <p
            className="
            mt-3
            text-sm
            font-medium
            text-slate-700
            "
          >

            Click to upload

          </p>




          <p
            className="
            mt-1
            text-xs
            text-slate-500
            "
          >

            PDF, JPG, PNG (Max 5MB)

          </p>





          <input

            type="file"

            hidden

            disabled={
              loading
            }

            accept="
            .pdf,
            .jpg,
            .jpeg,
            .png
            "

            onChange={(event)=>{


              const selected =
                event.target.files?.[0];


              if(selected){

                onUpload(
                  selected
                );

              }


            }}


          />



        </label>



      ) : (




        <div
          className="
          mt-5
          rounded-2xl
          border
          border-emerald-200
          bg-emerald-50
          p-4
          "
        >




          <div
            className="
            flex
            items-center
            justify-between
            gap-4
            "
          >




            <div
              className="
              min-w-0
              "
            >

              <p
                className="
                truncate
                font-medium
                text-slate-900
                "
              >

                {file.name}

              </p>



              <p
                className="
                text-xs
                text-slate-500
                "
              >

                {
                  (
                    file.size /
                    1024 /
                    1024
                  ).toFixed(2)
                }
                MB

              </p>


            </div>







            <div
              className="
              flex
              gap-2
              "
            >




              <button

                type="button"

                onClick={
                  previewFile
                }

                className="
                rounded-lg
                p-2
                hover:bg-white
                "

              >

                <Eye size={18}/>

              </button>






              <button

                type="button"

                onClick={
                  onRemove
                }

                className="
                rounded-lg
                p-2
                text-red-600
                hover:bg-white
                "

              >

                <Trash2 size={18}/>

              </button>





            </div>




          </div>




        </div>



      )}



    </div>

  );

}