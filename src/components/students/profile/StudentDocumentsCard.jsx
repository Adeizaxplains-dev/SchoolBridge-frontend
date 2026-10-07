import {
  FileText,
  Eye,
  Download,
  AlertCircle,
  CheckCircle2,
  FileImage,
  FileBadge,
} from "lucide-react";



const DOCUMENT_LABELS = [

  {
    key:"birthCertificate",
    label:"Birth Certificate",
    required:true,
  },


  {
    key:"passport",
    label:"Passport Photograph",
    required:true,
  },


  {
    key:"previousResult",
    label:"Previous Result",
  },


  {
    key:"transferLetter",
    label:"Transfer Letter",
  },


  {
    key:"medicalReport",
    label:"Medical Report",
  },


  {
    key:"immunizationCard",
    label:"Immunization Card",
  },


  {
    key:"parentIdDocument",
    label:"Parent ID",
  },


  {
    key:"otherDocument",
    label:"Other Document",
  },

];







export default function StudentDocumentsCard({

  student,

}) {



  const documents =
    student?.documents || {};




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
          bg-violet-100
          text-violet-600
          "

        >

          <FileText size={22}/>

        </div>




        <div>


          <h2

            className="
            text-xl
            font-bold
            text-slate-900
            "

          >

            Student Documents

          </h2>



          <p

            className="
            text-sm
            text-slate-500
            "

          >

            Admission and supporting documents.

          </p>


        </div>



      </div>









      <div

        className="
        grid
        gap-4
        md:grid-cols-2
        "

      >


        {
          DOCUMENT_LABELS.map(
            
            document => (


              <DocumentItem

                key={
                  document.key
                }

                document={
                  document
                }

                file={
                  documents[
                    document.key
                  ]
                }

              />


            )

          )
        }



      </div>





    </section>

  );

}









function DocumentItem({

document,

file,

}) {



const uploaded =
Boolean(file);





return (

<div

className={`
rounded-2xl
border
p-4

${
uploaded
?
"border-emerald-200 bg-emerald-50"
:
"border-slate-200 bg-slate-50"
}

`}

>



<div

className="
flex
items-start
justify-between
gap-3
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

className={`
rounded-xl
p-3

${
uploaded
?
"bg-white text-emerald-600"
:
"bg-white text-slate-400"
}

`}

>

{

fileType(file)
?

<FileImage size={20}/>

:

<FileBadge size={20}/>

}


</div>





<div>


<div

className="
flex
items-center
gap-2
"

>

<p

className="
font-semibold
text-slate-900
"

>

{document.label}

</p>



{
document.required && (

<span

className="
text-xs
text-red-500
"

>

Required

</span>

)

}


</div>





<p

className="
mt-1
text-sm
text-slate-500
"

>


{
uploaded

?

file.name || "Uploaded document"

:

"No document uploaded"

}


</p>



</div>





</div>









<div>


{

uploaded

?

<CheckCircle2

size={22}

className="
text-emerald-600
"

/>

:

<AlertCircle

size={22}

className="
text-slate-400
"

/>

}



</div>



</div>








{

uploaded && (

<div

className="
mt-4
flex
gap-2
"

>


<button

type="button"

className="
inline-flex
items-center
gap-2
rounded-lg
bg-white
px-3
py-2
text-sm
font-medium
text-slate-700
shadow-sm
hover:bg-slate-100
"

>

<Eye size={16}/>

View

</button>





<button

type="button"

className="
inline-flex
items-center
gap-2
rounded-lg
bg-white
px-3
py-2
text-sm
font-medium
text-blue-600
shadow-sm
hover:bg-blue-50
"

>

<Download size={16}/>

Download

</button>



</div>

)

}



</div>

);


}









function fileType(file){


if(!file)
return false;



return (

file.type?.includes(
"image"
)

);


}