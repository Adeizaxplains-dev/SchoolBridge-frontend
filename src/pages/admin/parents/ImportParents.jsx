import {
  useState,
} from "react";


import {
  useNavigate,
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
  importParents,
} from "../../../services/parentService";







export default function ImportParents(){


  const navigate =
    useNavigate();




  const [file,setFile] =
    useState(null);



  const [loading,setLoading] =
    useState(false);



  const [result,setResult] =
    useState(null);



  const [error,setError] =
    useState("");









  const handleFile=(event)=>{


    const selected =
      event.target.files[0];



    if(!selected)
      return;



    if(
      !selected.name.endsWith(".csv")
    ){

      setError(
        "Only CSV files are allowed"
      );

      return;

    }



    setFile(selected);

    setError("");

  };









  const handleImport=async()=>{


    if(!file){

      setError(
        "Please select a CSV file"
      );

      return;

    }



    try{


      setLoading(true);



      const formData =
        new FormData();



      formData.append(
        "file",
        file
      );



      const response =
        await importParents(
          formData
        );



      setResult(
        response.data
      );


    }
    catch(err){


      setError(
        "Import failed. Please check your file."
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







      <button

      onClick={()=>navigate(-1)}

      className="
      flex
      items-center
      gap-2
      text-slate-600
      "

      >

        <ArrowLeft size={18}/>

        Back

      </button>









      <div>


        <h1
        className="
        text-3xl
        font-bold
        text-slate-900
        "
        >

          Import Parents

        </h1>



        <p
        className="
        mt-2
        text-slate-500
        "
        >

          Upload multiple parents using CSV file.

        </p>


      </div>









      {
        error && (

          <div
          className="
          flex
          gap-3
          rounded-xl
          border
          border-red-200
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









      {/* Upload Area */}



      <div
      className="
      rounded-3xl
      border-2
      border-dashed
      border-slate-300
      bg-white
      p-10
      text-center
      "
      >



        <UploadCloud

        size={50}

        className="
        mx-auto
        text-blue-600
        "

        />



        <h2
        className="
        mt-5
        text-xl
        font-bold
        "
        >

          Upload Parent CSV

        </h2>



        <p
        className="
        mt-2
        text-slate-500
        "
        >

          Supported format: CSV

        </p>






        <label
        className="
        mt-6
        inline-flex
        cursor-pointer
        items-center
        gap-2
        rounded-xl
        bg-blue-600
        px-5
        py-3
        font-semibold
        text-white
        "
        >

          <UploadCloud size={18}/>

          Choose File



          <input

          type="file"

          accept=".csv"

          onChange={handleFile}

          className="
          hidden
          "

          />

        </label>






        {
          file && (

            <div
            className="
            mt-6
            flex
            items-center
            justify-center
            gap-3
            rounded-xl
            bg-slate-50
            p-4
            "
            >

              <FileSpreadsheet
              className="text-green-600"
              />


              <span
              className="
              font-semibold
              "
              >

                {file.name}

              </span>


            </div>

          )
        }



      </div>









      {/* Template */}



      <div
      className="
      rounded-3xl
      border
      bg-white
      p-6
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


            <h3
            className="
            font-bold
            "
            >

              CSV Format

            </h3>



            <p
            className="
            mt-1
            text-sm
            text-slate-500
            "
            >

              Use the school approved template.

            </p>


          </div>




          <button

          className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-slate-100
          px-4
          py-2
          text-sm
          font-semibold
          "

          >

            <Download size={16}/>

            Template

          </button>


        </div>



      </div>









      {/* Import Button */}



      <button

      onClick={handleImport}

      disabled={loading}

      className="
      flex
      items-center
      justify-center
      gap-2
      rounded-xl
      bg-blue-600
      px-6
      py-3
      font-semibold
      text-white
      disabled:opacity-50
      "

      >

        {
          loading
          ?
          "Importing..."
          :
          "Import Parents"
        }


      </button>









      {
        result && (

          <div
          className="
          rounded-3xl
          border
          border-green-200
          bg-green-50
          p-6
          "
          >

            <div
            className="
            flex
            items-center
            gap-3
            text-green-700
            "
            >

              <CheckCircle/>

              <h3
              className="
              font-bold
              "
              >

                Import Completed

              </h3>


            </div>




            <p className="mt-3">

              Successful:
              {" "}
              {result.success || 0}

            </p>



            <p>

              Failed:
              {" "}
              {result.failed || 0}

            </p>



          </div>

        )
      }







    </div>

  );

}