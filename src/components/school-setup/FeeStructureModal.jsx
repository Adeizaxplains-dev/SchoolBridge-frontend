import {
  X,
  Save,
  Loader2,
  Wallet,
} from "lucide-react";

import FeeItemRow from "./FeeItemRow";


const getId = (value) => {
  if (!value) return "";

  if (typeof value === "string") {
    return value;
  }

  return value._id || value.id || "";
};


const getLabel = (value, fallback = "") => {
  if (!value) return fallback;

  if (typeof value === "string") {
    return value;
  }

  return (
    value.name ||
    value.termName ||
    value.title ||
    value.label ||
    value.code ||
    fallback
  );
};

export default function FeeStructureModal({
  open = false,
  structure = null,
  formData,
  setFormData,
  validationErrors = {},
  saving = false,
  totalAmount = 0,

  classes = [],
  academicSessions = [],
  terms = [],

  onFormChange,

  onSave,
  onClose,
  addFeeItem,
  removeFeeItem,
  handleItemChange,
}) {
  if (!open) return null;


  /*
  =====================================================
  FORM CHANGE
  =====================================================
  */

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    if (onFormChange) {
      onFormChange(name, value);
      return;
    }

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        p-4
        backdrop-blur-sm
      "
    >
      <div
        className="
          flex
          max-h-[95vh]
          w-full
          max-w-5xl
          flex-col
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl
          dark:bg-gray-900
        "
      >

        {/* ==========================================
            HEADER
        ========================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            px-6
            py-5
            dark:border-gray-800
          "
        >
          <div className="flex items-center gap-4">

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-blue-100
                text-blue-600
              "
            >
              <Wallet className="h-6 w-6" />
            </div>

            <div>
              <h2
                className="
                  text-xl
                  font-bold
                  text-gray-900
                  dark:text-white
                "
              >
                {structure
                  ? "Edit Fee Structure"
                  : "Create Fee Structure"}
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Configure the fee structure for a
                class, academic session and term.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="
              rounded-lg
              p-2
              text-gray-500
              hover:bg-gray-100
              hover:text-gray-900
              dark:hover:bg-gray-800
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>


        {/* ==========================================
            BODY
        ========================================== */}

        <div
          className="
            flex-1
            space-y-8
            overflow-y-auto
            p-6
          "
        >

          {/* ========================================
              FEE STRUCTURE TITLE
          ======================================== */}

          <div>
            <label
              htmlFor="fee-title"
              className="
                mb-2
                block
                text-sm
                font-medium
                text-gray-700
                dark:text-gray-200
              "
            >
              Fee Structure Title
            </label>

            <input
              id="fee-title"
              type="text"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              placeholder="e.g. JSS 1 First Term Fees"
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                bg-white
                px-4
                py-3
                text-gray-900
                outline-none
                transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
                dark:border-gray-700
                dark:bg-gray-800
                dark:text-white
              "
            />

            {validationErrors.title && (
              <p className="mt-1 text-xs text-red-500">
                {validationErrors.title}
              </p>
            )}
          </div>


          {/* ========================================
              CLASS / SESSION / TERM
          ======================================== */}

          <div
            className="
              grid
              gap-6
              md:grid-cols-3
            "
          >

            {/* CLASS */}

            <div>
              <label
                htmlFor="fee-class"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  dark:text-gray-200
                "
              >
                Class
              </label>

              <select
                id="fee-class"
                name="class"
                value={formData.class || ""}
                onChange={handleChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                  py-3
                  text-gray-900
                  outline-none
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-100
                  dark:border-gray-700
                  dark:bg-gray-800
                  dark:text-white
                "
              >
                <option value="">
                  Select Class
                </option>

                {classes.map((item) => {
                  const id = getId(item);

                  if (!id) return null;

                  return (
                    <option
                      key={id}
                      value={id}
                    >
                      {getLabel(
                        item,
                        "Unnamed Class",
                      )}
                    </option>
                  );
                })}
              </select>

              {validationErrors.class && (
                <p className="mt-1 text-xs text-red-500">
                  {validationErrors.class}
                </p>
              )}
            </div>


            {/* ACADEMIC SESSION */}

            <div>
              <label
                htmlFor="fee-session"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  dark:text-gray-200
                "
              >
                Academic Session
              </label>

              <select
                id="fee-session"
                name="session"
                value={formData.session || ""}
                onChange={handleChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                  py-3
                  text-gray-900
                  outline-none
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-100
                  dark:border-gray-700
                  dark:bg-gray-800
                  dark:text-white
                "
              >
                <option value="">
                  Select Academic Session
                </option>

                {academicSessions.map((item) => {
                  const id = getId(item);

                  if (!id) return null;

                  return (
                    <option
                      key={id}
                      value={id}
                    >
                      {getLabel(
                        item,
                        "Unnamed Session",
                      )}
                    </option>
                  );
                })}
              </select>

              {validationErrors.session && (
                <p className="mt-1 text-xs text-red-500">
                  {validationErrors.session}
                </p>
              )}
            </div>


            {/* TERM */}

            <div>
              <label
                htmlFor="fee-term"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  dark:text-gray-200
                "
              >
                Term
              </label>

              <select
                id="fee-term"
                name="term"
                value={formData.term || ""}
                onChange={handleChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                  py-3
                  text-gray-900
                  outline-none
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-100
                  dark:border-gray-700
                  dark:bg-gray-800
                  dark:text-white
                "
              >
                <option value="">
                  Select Term
                </option>

                {terms.map((item) => {
                  const id = getId(item);

                  if (!id) return null;

                  return (
                    <option
                      key={id}
                      value={id}
                    >
                      {getLabel(
                        item,
                        "Unnamed Term",
                      )}
                    </option>
                  );
                })}
              </select>

              {validationErrors.term && (
                <p className="mt-1 text-xs text-red-500">
                  {validationErrors.term}
                </p>
              )}
            </div>

          </div>


          {/* ==========================================
              FEE ITEMS
          ========================================== */}

          <div className="space-y-4">

            <div>
              <h3
                className="
                  text-lg
                  font-semibold
                  text-gray-900
                  dark:text-white
                "
              >
                Fee Items
              </h3>

              <p
                className="
                  text-sm
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Add all charges applicable to
                this fee structure.
              </p>
            </div>


            {validationErrors.items && (
              <p className="text-sm text-red-500">
                {validationErrors.items}
              </p>
            )}


            {formData.items.map(
              (item, index) => (
                <FeeItemRow
                  key={index}
                  index={index}
                  item={item}
                  errors={validationErrors}
                  isFirst={index === 0}
                  canRemove={
                    formData.items.length > 1
                  }
                  onChange={
                    handleItemChange
                  }
                  onAdd={addFeeItem}
                  onRemove={
                    removeFeeItem
                  }
                />
              ),
            )}

          </div>


          {/* ==========================================
              TOTAL
          ========================================== */}

          <div
            className="
              rounded-2xl
              border
              border-blue-100
              bg-blue-50
              p-6
              dark:border-gray-700
              dark:bg-gray-800
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
              <span
                className="
                  text-lg
                  font-medium
                  text-gray-700
                  dark:text-gray-200
                "
              >
                Total Amount
              </span>

              <span
                className="
                  text-3xl
                  font-bold
                  text-blue-600
                "
              >
                ₦
                {Number(
                  totalAmount,
                ).toLocaleString()}
              </span>
            </div>
          </div>

        </div>


        {/* ==========================================
            FOOTER
        ========================================== */}

        <div
          className="
            flex
            justify-end
            gap-3
            border-t
            px-6
            py-5
            dark:border-gray-800
          "
        >

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="
              rounded-xl
              border
              border-gray-300
              px-5
              py-2.5
              text-gray-700
              hover:bg-gray-50
              disabled:cursor-not-allowed
              disabled:opacity-50
              dark:border-gray-700
              dark:text-gray-200
              dark:hover:bg-gray-800
            "
          >
            Cancel
          </button>


          <button
            type="button"
            disabled={saving}
            onClick={onSave}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-blue-600
              px-6
              py-2.5
              font-medium
              text-white
              hover:bg-blue-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {saving ? (
              <>
                <Loader2
                  className="h-4 w-4 animate-spin"
                />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />

                {structure
                  ? "Update Structure"
                  : "Create Structure"}
              </>
            )}
          </button>

        </div>

      </div>
    </div>
  );
}