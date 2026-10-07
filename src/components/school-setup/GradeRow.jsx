// src/components/school-setup/GradeRow.jsx

import {
  Trash2,
} from "lucide-react";


export default function GradeRow({

  grade,

  index,

  onChange,

  onRemove,

  error,

}) {



  const updateField = (
    field,
    value
  ) => {

    onChange(
      index,
      {
        ...grade,
        [field]: value,
      }
    );

  };




  return (

    <div
      className="
      grid
      gap-3
      rounded-xl
      border
      border-gray-200
      bg-gray-50
      p-4

      md:grid-cols-5

      dark:border-gray-700
      dark:bg-gray-800/50
      "
    >



      {/* GRADE */}


      <div>


        <label
          className="
          mb-1
          block
          text-xs
          font-medium
          "
        >

          Grade

        </label>


        <input

          value={
            grade.grade || ""
          }

          onChange={(e)=>
            updateField(
              "grade",
              e.target.value
            )
          }

          placeholder="A"

          className={`
          w-full
          rounded-lg
          border
          px-3
          py-2
          outline-none

          ${
            error
            ?
            "border-red-500"
            :
            "border-gray-300"
          }

          dark:border-gray-700
          dark:bg-gray-900
          `}

        />


      </div>







      {/* MIN SCORE */}


      <div>


        <label
          className="
          mb-1
          block
          text-xs
          font-medium
          "
        >

          Min Score

        </label>


        <input

          type="number"

          value={
            grade.minScore ?? ""
          }


          onChange={(e)=>
            updateField(
              "minScore",
              Number(
                e.target.value
              )
            )
          }


          placeholder="0"


          className="
          w-full
          rounded-lg
          border
          border-gray-300
          px-3
          py-2

          dark:border-gray-700
          dark:bg-gray-900
          "

        />


      </div>








      {/* MAX SCORE */}


      <div>


        <label
          className="
          mb-1
          block
          text-xs
          font-medium
          "
        >

          Max Score

        </label>


        <input

          type="number"


          value={
            grade.maxScore ?? ""
          }


          onChange={(e)=>
            updateField(
              "maxScore",
              Number(
                e.target.value
              )
            )
          }


          placeholder="100"


          className="
          w-full
          rounded-lg
          border
          border-gray-300
          px-3
          py-2

          dark:border-gray-700
          dark:bg-gray-900
          "

        />


      </div>








      {/* REMARK */}


      <div>


        <label
          className="
          mb-1
          block
          text-xs
          font-medium
          "
        >

          Remark

        </label>


        <input

          value={
            grade.remark || ""
          }


          onChange={(e)=>
            updateField(
              "remark",
              e.target.value
            )
          }


          placeholder="Excellent"


          className="
          w-full
          rounded-lg
          border
          border-gray-300
          px-3
          py-2

          dark:border-gray-700
          dark:bg-gray-900
          "

        />


      </div>








      {/* REMOVE */}


      <div
        className="
        flex
        items-end
        "
      >


        <button

          type="button"

          onClick={onRemove}


          className="
          flex
          h-10
          w-full
          items-center
          justify-center
          gap-2
          rounded-lg
          border
          border-red-200
          text-red-600

          hover:bg-red-50

          dark:border-red-900
          dark:hover:bg-red-900/20

          md:w-auto
          md:px-4
          "

        >

          <Trash2
            className="
            h-4
            w-4
            "
          />

          <span
            className="
            md:hidden
            "
          >

            Remove

          </span>


        </button>


      </div>



    </div>


  );

}