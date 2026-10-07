import {
  Pencil,
  Trash2,
  Wallet,
  List,
} from "lucide-react";

export default function FeeStructureTable({

  structures = [],

  onEdit,

  onDelete,

}) {

  /*
  ==========================================
  EMPTY STATE
  ==========================================
  */

  if (structures.length === 0) {

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
          mb-6
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-primary/10
        "
        >
          <Wallet
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
          text-gray-900

          dark:text-white
        "
        >
          No Fee Structures Found
        </h3>

        <p
          className="
          mt-2
          text-gray-500

          dark:text-gray-400
        "
        >
          Create your first fee structure
          to begin configuring school fees.
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

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead
            className="
            bg-gray-50

            dark:bg-gray-800
          "
          >

            <tr>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                Class
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                Session
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                Term
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold uppercase">
                Items
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase">
                Total
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

              structures.map((structure) => (

                <tr
                  key={structure._id}
                  className="
                  transition

                  hover:bg-gray-50

                  dark:hover:bg-gray-800/50
                "
                >

                  {/* CLASS */}

                  <td className="px-6 py-5">

                    <div className="font-semibold">

                      {structure.className}

                    </div>

                  </td>



                  {/* SESSION */}

                  <td className="px-6 py-5">

                    {structure.session}

                  </td>



                  {/* TERM */}

                  <td className="px-6 py-5">

                    <span
                      className="
                      rounded-full
                      bg-primary/10
                      px-3
                      py-1
                      text-xs
                      font-medium
                      text-primary
                    "
                    >
                      {structure.term}
                    </span>

                  </td>



                  {/* ITEMS */}

                  <td className="px-6 py-5 text-center">

                    <div
                      className="
                      inline-flex
                      items-center
                      gap-2
                    "
                    >

                      <List className="h-4 w-4" />

                      {structure.items?.length || 0}

                    </div>

                  </td>



                  {/* TOTAL */}

                  <td className="px-6 py-5 text-right font-semibold">

                    ₦

                    {Number(

                      structure.totalAmount || 0

                    ).toLocaleString()}

                  </td>



                  {/* ACTIONS */}

                  <td className="px-6 py-5">

                    <div
                      className="
                      flex
                      justify-center
                      gap-2
                    "
                    >

                      <button
                        onClick={() =>
                          onEdit(structure)
                        }
                        className="
                        rounded-lg
                        p-2
                        text-blue-600

                        hover:bg-blue-50

                        dark:hover:bg-blue-900/20
                      "
                      >
                        <Pencil className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() =>
                          onDelete(structure)
                        }
                        className="
                        rounded-lg
                        p-2
                        text-red-600

                        hover:bg-red-50

                        dark:hover:bg-red-900/20
                      "
                      >
                        <Trash2 className="h-4 w-4" />
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