import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";


import {
  ArrowLeft,
  UploadCloud,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  Download,
} from "lucide-react";


import {
  importTeachers
} from "../../../services/teacherService";





export default function ImportTeachers(){


  const navigate = useNavigate();



  const [file,setFile] =
    useState(null);



  const [loading,setLoading] =
    useState(false);



  const [error,setError] =
    useState("");



  const [success,setSuccess] =
    useState("");



  const [preview,setPreview] =
    useState([]);








  const handleFileChange=(e)=>{


    const selected =
      e.target.files[0];


    if(!selected)
      return;



    setFile(selected);



    /*
      Later connect CSV parser:

      PapaParse
      SheetJS

      for real preview

    */


    setPreview([]);


  };








  const handleImport = async()=>{


    if(!file){

      setError(
        "Please select a file first"
      );

      return;

    }




    try{


      setLoading(true);

      setError("");

      setSuccess("");



      await importTeachers(
        file
      );



      setSuccess(
        "Teachers imported successfully"
      );



      setFile(null);



    }
    catch(err){


      setError(

        err.response?.data?.message ||

        "Import failed"

      );


    }
    finally{


      setLoading(false);


    }


  };









  return (

    <div
    className="
    space-y-8
    "
    >






      {/* Header */}


      <div
      className="
      flex
      items-center
      justify-between
      "
      >



        <button

        onClick={() =>
          navigate(-1)
        }

        className="
        flex
        items-center
        gap-2
        text-slate-600
        hover:text-slate-900
        "

        >

          <ArrowLeft size={18}/>

          Back


        </button>





        <h1
        className="
        flex
        items-center
        gap-3
        text-3xl
        font-bold
        text-slate-900
        "
        >

          <UploadCloud
          className="text-blue-600"
          />

          Import Teachers


        </h1>



      </div>









      {
        error && (

        <div
        className="
        flex
        items-center
        gap-3
        rounded-xl
        bg-red-50
        p-4
        text-red-700
        "
        >

          <AlertCircle size={20}/>

          {error}

        </div>

        )
      }








      {
        success && (

        <div
        className="
        flex
        items-center
        gap-3
        rounded-xl
        bg-emerald-50
        p-4
        text-emerald-700
        "
        >

          <CheckCircle size={20}/>

          {success}

        </div>

        )
      }









      {/* Upload Area */}


      <div
      className="
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-8
      shadow-sm
      "
      >


        <h2
        className="
        text-xl
        font-bold
        "
        >

          Upload Teacher File

        </h2>



        <p
        className="
        mt-2
        text-sm
        text-slate-500
        "
        >

          Upload CSV or Excel file containing teacher information.

        </p>






        <label
        className="
        mt-6
        flex
        cursor-pointer
        flex-col
        items-center
        justify-center
        rounded-2xl
        border-2
        border-dashed
        border-slate-300
        p-10
        transition
        hover:bg-slate-50
        "
        >


          <FileSpreadsheet
          size={45}
          className="text-blue-600"
          />



          <p
          className="
          mt-4
          font-semibold
          text-slate-700
          "
          >

            {
              file
              ?
              file.name
              :
              "Click to select file"
            }


          </p>



          <p
          className="
          mt-2
          text-sm
          text-slate-400
          "
          >

            CSV, XLS, XLSX

          </p>





          <input

          type="file"

          hidden

          accept="
          .csv,
          .xls,
          .xlsx
          "

          onChange={
            handleFileChange
          }

          />


        </label>






      </div>









      {/* Template */}

      <div
      className="
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-6
      shadow-sm
      "
      >


        <div
        className="
        flex
        items-center
        justify-between
        "
        >


          <div>

            <h2
            className="
            text-lg
            font-bold
            "
            >

              Import Template

            </h2>


            <p
            className="
            mt-1
            text-sm
            text-slate-500
            "
            >

              Download the correct format before uploading.

            </p>


          </div>





          <button

          className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          px-4
          py-2
          text-sm
          font-semibold
          hover:bg-slate-50
          "

          >

            <Download size={17}/>

            Template

          </button>



        </div>


      </div>









      {/* Preview */}


      {
        preview.length > 0 && (


        <div
        className="
        rounded-3xl
        border
        bg-white
        p-6
        shadow-sm
        "
        >

          <h2
          className="
          mb-5
          text-xl
          font-bold
          "
          >

            Preview

          </h2>



        </div>


        )

      }









      {/* Action */}


      <div
      className="
      flex
      justify-end
      "
      >


        <button

        onClick={handleImport}

        disabled={loading}

        className="
        rounded-xl
        bg-blue-600
        px-6
        py-3
        font-semibold
        text-white
        hover:bg-blue-700
        disabled:opacity-50
        "

        >

          {
            loading
            ?
            "Importing..."
            :
            "Import Teachers"
          }


        </button>


      </div>






    </div>

  );

}