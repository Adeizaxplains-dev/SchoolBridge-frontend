import {
  PlusCircle,
  MinusCircle,
} from "lucide-react";

export default function FeeItemRow({
  index,
  item,
  errors = {},
  isFirst = false,
  canRemove = true,
  onChange,
  onAdd,
  onRemove,
}) {
  return (
    <div
      className="
      rounded-xl
      border
      border-gray-200
      bg-gray-50
      p-4

      dark:border-gray-700
      dark:bg-gray-800
    "
    >
      <div
        className="
        grid
        gap-4

        lg:grid-cols-12
        lg:items-start
        "
      >
        {/* ==========================================
            Fee Item Name
        ========================================== */}

        <div className="lg:col-span-5">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Fee Item
          </label>

          <input
            type="text"
            placeholder="e.g Tuition Fee"
            value={item.name}
            onChange={(e) =>
              onChange(
                index,
                "name",
                e.target.value
              )
            }
            className={`
              w-full
              rounded-lg
              border
              px-4
              py-2.5
              text-sm

              focus:border-primary
              focus:outline-none

              dark:border-gray-700
              dark:bg-gray-900
              dark:text-white

              ${
                errors[
                  `item-name-${index}`
                ]
                  ? "border-red-500"
                  : "border-gray-300"
              }
            `}
          />

          {errors[
            `item-name-${index}`
          ] && (
            <p className="mt-1 text-xs text-red-500">
              {
                errors[
                  `item-name-${index}`
                ]
              }
            </p>
          )}
        </div>

        {/* ==========================================
            Amount
        ========================================== */}

        <div className="lg:col-span-4">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Amount (₦)
          </label>

          <input
            type="number"
            min="0"
            placeholder="0"
            value={item.amount}
            onChange={(e) =>
              onChange(
                index,
                "amount",
                e.target.value
              )
            }
            className={`
              w-full
              rounded-lg
              border
              px-4
              py-2.5
              text-sm

              focus:border-primary
              focus:outline-none

              dark:border-gray-700
              dark:bg-gray-900
              dark:text-white

              ${
                errors[
                  `item-amount-${index}`
                ]
                  ? "border-red-500"
                  : "border-gray-300"
              }
            `}
          />

          {errors[
            `item-amount-${index}`
          ] && (
            <p className="mt-1 text-xs text-red-500">
              {
                errors[
                  `item-amount-${index}`
                ]
              }
            </p>
          )}
        </div>

        {/* ==========================================
            Actions
        ========================================== */}

        <div
          className="
          flex
          items-end
          gap-2

          lg:col-span-3
        "
        >
          {isFirst && (
            <button
              type="button"
              onClick={onAdd}
              className="
                flex
                flex-1
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-primary
                px-4
                py-2.5
                text-sm
                font-medium
                text-white
                transition

                hover:opacity-90
              "
            >
              <PlusCircle className="h-4 w-4" />

              Add
            </button>
          )}

          {canRemove && (
            <button
              type="button"
              onClick={() =>
                onRemove(index)
              }
              className="
                flex
                items-center
                justify-center
                rounded-lg
                border
                border-red-300
                p-2.5
                text-red-600
                transition

                hover:bg-red-50

                dark:border-red-800
                dark:hover:bg-red-900/20
              "
            >
              <MinusCircle className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}