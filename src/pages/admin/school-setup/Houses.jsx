// src/pages/admin/school-setup/Houses.jsx

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Home,
  Plus,
  RefreshCcw,
  Edit,
  Trash2,
  X,
} from "lucide-react";

import SetupSkeleton from "../../../components/school-setup/SetupSkeleton";
import SetupEmptyState from "../../../components/school-setup/SetupEmptyState";
import useSchoolSetup from "../../../hooks/useSchoolSetup";
import SummaryCard from "../../../components/school-setup/SummaryCard";

export default function Houses() {
  const {
    loading,
    saving,
    deleting,
    error,
    getHouses,
    createHouse,
    updateHouse,
    deleteHouse,
  } = useSchoolSetup();

  const [houses, setHouses] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const initialForm = {
    name: "",
    code: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialForm);

  const loadHouses = useCallback(async () => {
    try {
      const data = await getHouses();

      setHouses(
        Array.isArray(data)
          ? data
          : data?.houses || [],
      );
    } catch (err) {
      console.error("Load houses error:", err);
    }
  }, [getHouses]);

  useEffect(() => {
    loadHouses();
  }, [loadHouses]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setValidationErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const openCreate = () => {
    setSelectedHouse(null);
    setFormData(initialForm);
    setValidationErrors({});
    setShowModal(true);
  };

  const openEdit = (house) => {
    setSelectedHouse(house);

    setFormData({
      name: house.name || "",
      code: house.code || "",
      description: house.description || "",
    });

    setValidationErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    setSelectedHouse(null);
    setFormData(initialForm);
    setValidationErrors({});
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "House name is required.";
    }

    if (!formData.code.trim()) {
      errors.code = "House code is required.";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      if (selectedHouse) {
        await updateHouse(
          selectedHouse._id,
          formData,
        );
      } else {
        await createHouse(formData);
      }

      closeModal();
      await loadHouses();
    } catch (err) {
      console.error("Save house error:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Delete this house?",
    );

    if (!confirmed) return;

    try {
      await deleteHouse(id);
      await loadHouses();
    } catch (err) {
      console.error("Delete house error:", err);
    }
  };

  if (loading) {
    return <SetupSkeleton />;
  }

  if (error && houses.length === 0) {
    return (
      <SetupEmptyState
        title="Unable to load houses"
        description={error}
        actionLabel="Retry"
        onAction={loadHouses}
        icon={Home}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div
        className="
          flex
          flex-col
          gap-4
          rounded-2xl
          bg-white
          p-6
          shadow-sm
          dark:bg-gray-900
          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <div>
          <div className="flex items-center gap-3">
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
                dark:bg-blue-900/30
                dark:text-blue-400
              "
            >
              <Home className="h-6 w-6" />
            </div>

            <div>
              <h1
                className="
                  text-2xl
                  font-semibold
                  text-gray-900
                  dark:text-white
                "
              >
                School Houses
              </h1>

              <p
                className="
                  mt-1
                  text-sm
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Manage school houses used for
                student grouping and activities.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-blue-600
            px-5
            py-3
            text-sm
            font-medium
            text-white
            shadow-sm
            transition
            hover:bg-blue-700
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:ring-offset-2
          "
        >
          <Plus className="h-4 w-4" />
          Add House
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div
        className="
          grid
          gap-6
          sm:grid-cols-2
          xl:grid-cols-3
        "
      >
        <SummaryCard
          title="Total Houses"
          value={houses.length}
        />

        <SummaryCard
          title="Master Data"
          value="Houses"
        />

        <SummaryCard
          title="Used For"
          value="Students & Activities"
        />
      </div>

      {/* TABLE */}
      <section
        className="
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-sm
          dark:bg-gray-900
        "
      >
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
          <h2
            className="
              font-semibold
              text-gray-900
              dark:text-white
            "
          >
            House List
          </h2>

          <button
            type="button"
            onClick={loadHouses}
            className="
              flex
              items-center
              gap-2
              text-sm
              text-gray-500
              transition
              hover:text-blue-600
            "
          >
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        {houses.length === 0 ? (
          <div className="p-6">
            <SetupEmptyState
              title="No houses created"
              description="
                Create houses for student grouping
                and school activities.
              "
              actionLabel="Create House"
              onAction={openCreate}
              icon={Home}
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead
                className="
                  border-b
                  bg-gray-50
                  dark:border-gray-800
                  dark:bg-gray-800/50
                "
              >
                <tr>
                  <th className="px-6 py-4 text-sm">
                    House Name
                  </th>

                  <th className="px-6 py-4 text-sm">
                    Code
                  </th>

                  <th className="px-6 py-4 text-sm">
                    Description
                  </th>

                  <th className="px-6 py-4 text-sm">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {houses.map((house) => (
                  <tr
                    key={house._id}
                    className="
                      border-b
                      last:border-0
                      dark:border-gray-800
                    "
                  >
                    <td
                      className="
                        px-6
                        py-4
                        font-medium
                        text-gray-900
                        dark:text-white
                      "
                    >
                      {house.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {house.code || "-"}
                    </td>

                    <td
                      className="
                        px-6
                        py-4
                        text-sm
                        text-gray-600
                        dark:text-gray-400
                      "
                    >
                      {house.description || "-"}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(house)}
                          title="Edit house"
                          className="
                            inline-flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            bg-blue-100
                            text-blue-600
                            transition
                            hover:bg-blue-600
                            hover:text-white
                            dark:bg-blue-900/30
                            dark:text-blue-400
                            dark:hover:bg-blue-600
                            dark:hover:text-white
                          "
                        >
                          <Edit className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          disabled={deleting}
                          onClick={() =>
                            handleDelete(house._id)
                          }
                          title="Delete house"
                          className="
                            inline-flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            bg-red-100
                            text-red-600
                            transition
                            hover:bg-red-600
                            hover:text-white
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                            dark:bg-red-900/30
                            dark:text-red-400
                            dark:hover:bg-red-600
                            dark:hover:text-white
                          "
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* CREATE / EDIT MODAL */}
      {showModal && (
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
          "
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            className="
              w-full
              max-w-lg
              rounded-2xl
              bg-white
              shadow-2xl
              dark:bg-gray-900
            "
          >
            {/* MODAL HEADER */}
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
              <div>
                <h2
                  className="
                    text-lg
                    font-semibold
                    text-gray-900
                    dark:text-white
                  "
                >
                  {selectedHouse
                    ? "Edit House"
                    : "Create House"}
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  {selectedHouse
                    ? "Update the house information."
                    : "Add a new school house."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="
                  rounded-lg
                  p-2
                  text-gray-500
                  transition
                  hover:bg-gray-100
                  hover:text-gray-700
                  disabled:opacity-50
                  dark:hover:bg-gray-800
                  dark:hover:text-white
                "
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="space-y-5 px-6 py-6">
              <div>
                <label
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-gray-700
                    dark:text-gray-300
                  "
                >
                  House Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Blue House"
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-3
                    text-sm
                    text-gray-900
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-100
                    dark:border-gray-700
                    dark:bg-gray-800
                    dark:text-white
                    dark:focus:border-blue-500
                  "
                />

                {validationErrors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {validationErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-gray-700
                    dark:text-gray-300
                  "
                >
                  House Code
                </label>

                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="e.g. BLUE"
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-3
                    text-sm
                    uppercase
                    text-gray-900
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-100
                    dark:border-gray-700
                    dark:bg-gray-800
                    dark:text-white
                    dark:focus:border-blue-500
                  "
                />

                {validationErrors.code && (
                  <p className="mt-1 text-sm text-red-500">
                    {validationErrors.code}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-gray-700
                    dark:text-gray-300
                  "
                >
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe this house..."
                  className="
                    w-full
                    resize-none
                    rounded-lg
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-3
                    text-sm
                    text-gray-900
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-100
                    dark:border-gray-700
                    dark:bg-gray-800
                    dark:text-white
                    dark:focus:border-blue-500
                  "
                />
              </div>
            </div>

            {/* MODAL FOOTER */}
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
                onClick={closeModal}
                disabled={saving}
                className="
                  rounded-lg
                  border
                  border-gray-300
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-gray-700
                  transition
                  hover:bg-gray-50
                  disabled:opacity-50
                  dark:border-gray-700
                  dark:text-gray-300
                  dark:hover:bg-gray-800
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-blue-600
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-white
                  shadow-sm
                  transition
                  hover:bg-blue-700
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {saving && (
                  <span
                    className="
                      h-4
                      w-4
                      animate-spin
                      rounded-full
                      border-2
                      border-white
                      border-t-transparent
                    "
                  />
                )}

                {saving
                  ? "Saving..."
                  : selectedHouse
                    ? "Update House"
                    : "Create House"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}