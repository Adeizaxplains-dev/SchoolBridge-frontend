import {
  Camera,
  Upload,
  X,
  ImageIcon,
} from "lucide-react";

import { useEffect, useState } from "react";


export default function PhotoUploader({

  value,

  onChange,

  label = "Upload Photo",

  helperText =
    "PNG, JPG or JPEG (max 2MB)",

  disabled = false,

  loading = false,

  maxSize = 2,

  error = "",

  className = "",

}) {


  const [preview, setPreview] =
    useState("");



  useEffect(() => {

    if (!value) {

      setPreview("");

      return;

    }


    if (value instanceof File) {

      const url =
        URL.createObjectURL(value);


      setPreview(url);


      return () => {
        URL.revokeObjectURL(url);
      };

    }


    setPreview(value);


  }, [value]);







  function validateFile(file) {


    if (!file.type.startsWith("image/")) {

      return "Only image files are allowed.";

    }



    const size =
      file.size /
      1024 /
      1024;



    if (size > maxSize) {

      return `Image must be less than ${maxSize}MB`;

    }



    return null;

  }







  function handleFile(file) {


    if (!file) return;



    const validation =
      validateFile(file);



    if (validation) {

      onChange?.(
        null,
        validation
      );

      return;

    }



    onChange?.(
      file,
      ""
    );

  }







  function handleInput(e) {


    const file =
      e.target.files?.[0];



    handleFile(file);

  }







  function handleDrop(e) {

    e.preventDefault();


    if (disabled) return;



    const file =
      e.dataTransfer.files?.[0];


    handleFile(file);

  }








  function removePhoto() {

    onChange?.(
      null,
      ""
    );

  }









  return (

    <div
      className={`space-y-3 ${className}`}
    >



      {/* Label */}

      <label
        className="
        block
        text-sm
        font-semibold
        text-slate-700
        "
      >

        {label}

      </label>







      <div

        onDragOver={(e)=>
          e.preventDefault()
        }

        onDrop={handleDrop}

        className={`
          relative
          flex
          flex-col
          items-center
          justify-center
          rounded-3xl
          border-2
          border-dashed
          p-6
          transition
          ${
            error
            ?
            "border-red-400 bg-red-50"
            :
            "border-slate-300 bg-slate-50 hover:border-blue-500"
          }
          ${
            disabled
            ?
            "opacity-60"
            :
            ""
          }
        `}
      >





        {preview ? (


          <div
            className="
            relative
            "
          >


            <img

              src={preview}

              alt="Preview"

              className="
              h-40
              w-40
              rounded-full
              object-cover
              border
              border-slate-200
              "
            />



            {!disabled && (

              <button

                type="button"

                onClick={removePhoto}

                className="
                absolute
                -right-2
                -top-2
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-red-500
                text-white
                shadow
                hover:bg-red-600
                "

              >

                <X size={16}/>

              </button>

            )}


          </div>



        ) : (



          <>

            <div
              className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-blue-100
              text-blue-600
              "
            >

              <Camera size={30}/>

            </div>


            <p
              className="
              mt-4
              text-sm
              font-medium
              text-slate-700
              "
            >

              Drag & drop image here

            </p>



            <p
              className="
              mt-1
              text-xs
              text-slate-500
              "
            >

              or click to browse

            </p>



          </>

        )}







        <input

          type="file"

          accept="image/*"

          disabled={
            disabled ||
            loading
          }

          onChange={handleInput}

          className="
          absolute
          inset-0
          cursor-pointer
          opacity-0
          "

        />



      </div>








      {!error && (

        <p
          className="
          flex
          items-center
          gap-2
          text-xs
          text-slate-500
          "
        >

          <ImageIcon size={14}/>

          {helperText}

        </p>

      )}





      {error && (

        <p
          className="
          text-xs
          text-red-600
          "
        >

          {error}

        </p>

      )}




    </div>

  );

}