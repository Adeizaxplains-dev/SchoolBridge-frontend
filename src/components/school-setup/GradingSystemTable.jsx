import {
  Pencil,
  Trash2,
  Award,
  Target,
} from "lucide-react";



export default function GradingSystemTable({

  systems = [],

  onEdit,

  onDelete,

}) {



  /*
  ==========================================
  EMPTY STATE
  ==========================================
  */


  if (!systems.length) {


    return (

      <div
        className="
        rounded-2xl
        border
        border-dashed
        border-gray-300
        bg-white
        py-20
        text-center

        dark:border-gray-700
        dark:bg-gray-900
        "
      >


        <div
          className="
          mx-auto
          mb-5
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-primary/10
          "
        >

          <Award
            className="
            h-10
            w-10
            text-primary
            "
          />

        </div>




        <h3
          className="
          text-xl
          font-semibold

          dark:text-white
          "
        >

          No Grading System Found

        </h3>



        <p
          className="
          mt-2
          text-gray-500

          dark:text-gray-400
          "
        >

          Create a grading system to
          configure student results.

        </p>


      </div>

    );


  }






  return (

    <div
      className="
      overflow-hidden
      rounded-2xl
      border
      border-gray-200
      bg-white
      shadow-sm

      dark:border-gray-800
      dark:bg-gray-900
      "
    >


      <div
        className="
        overflow-x-auto
        "
      >



        <table
          className="
          min-w-full
          "
        >



          <thead
            className="
            bg-gray-50

            dark:bg-gray-800
            "
          >

            <tr>


              <th className="px-6 py-4 text-left text-xs font-semibold uppercase">

                Name

              </th>



              <th className="px-6 py-4 text-left text-xs font-semibold uppercase">

                Pass Mark

              </th>



              <th className="px-6 py-4 text-center text-xs font-semibold uppercase">

                Grades

              </th>



              <th className="px-6 py-4 text-left text-xs font-semibold uppercase">

                Grade Preview

              </th>



              <th className="px-6 py-4 text-center text-xs font-semibold uppercase">

                Actions

              </th>



            </tr>

          </thead>






          <tbody
            className="
            divide-y

            dark:divide-gray-800
            "
          >



          {
            systems.map((system)=>(


              <tr

                key={system._id}

                className="
                transition

                hover:bg-gray-50

                dark:hover:bg-gray-800/50
                "

              >



                {/* NAME */}

                <td
                  className="
                  px-6
                  py-5
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
                      rounded-lg
                      bg-primary/10
                      p-2
                      "
                    >

                      <Award
                        className="
                        h-5
                        w-5
                        text-primary
                        "
                      />

                    </div>



                    <div>

                      <p
                        className="
                        font-semibold
                        "
                      >

                        {system.name}

                      </p>


                    </div>


                  </div>


                </td>







                {/* PASS MARK */}


                <td className="px-6 py-5">


                  <span
                    className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-green-100
                    px-3
                    py-1
                    text-sm
                    font-medium
                    text-green-700
                    "
                  >

                    <Target
                      className="h-4 w-4"
                    />


                    {system.passMark || 0}%


                  </span>


                </td>







                {/* NUMBER OF GRADES */}


                <td
                  className="
                  px-6
                  py-5
                  text-center
                  "
                >


                  <span
                    className="
                    rounded-full
                    bg-blue-100
                    px-3
                    py-1
                    text-sm
                    font-medium
                    text-blue-700
                    "
                  >

                    {
                      system.grades?.length || 0
                    }


                  </span>


                </td>







                {/* PREVIEW */}


                <td
                  className="
                  px-6
                  py-5
                  "
                >


                  <div
                    className="
                    flex
                    flex-wrap
                    gap-2
                    "
                  >

                  {
                    system.grades
                    ?.slice(0,5)
                    .map((grade,index)=>(


                      <span

                        key={index}

                        className="
                        rounded-lg
                        bg-gray-100
                        px-2
                        py-1
                        text-xs

                        dark:bg-gray-800
                        "

                      >

                        {grade.grade}

                        {" "}

                        {grade.minScore}-

                        {grade.maxScore}


                      </span>


                    ))
                  }



                  {
                    system.grades?.length > 5 && (

                      <span
                        className="
                        text-xs
                        text-gray-500
                        "
                      >

                        +
                        {
                          system.grades.length - 5
                        }

                        more

                      </span>

                    )
                  }


                  </div>


                </td>







                {/* ACTIONS */}


                <td
                  className="
                  px-6
                  py-5
                  "
                >


                  <div
                    className="
                    flex
                    justify-center
                    gap-2
                    "
                  >



                    <button

                      onClick={() =>
                        onEdit(system)
                      }

                      className="
                      rounded-lg
                      p-2
                      text-blue-600

                      hover:bg-blue-50
                      "

                    >

                      <Pencil
                        className="
                        h-4
                        w-4
                        "
                      />

                    </button>






                    <button

                      onClick={() =>
                        onDelete(system)
                      }

                      className="
                      rounded-lg
                      p-2
                      text-red-600

                      hover:bg-red-50
                      "

                    >

                      <Trash2
                        className="
                        h-4
                        w-4
                        "
                      />

                    </button>



                  </div>


                </td>



              </tr>


            ))
          }



          </tbody>


        </table>


      </div>


    </div>


  );


}