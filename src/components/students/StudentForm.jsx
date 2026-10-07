import { useEffect, useState } from "react";
import API from "../../services/api";
import ParentSelector from "./ParentSelector";
import CreateParentModal from "./CreateParentModal";

export default function StudentForm({
  open,
  student,
  onClose,
  onSuccess,
}) {
  const isEdit = !!student;

  const [loading, setLoading] = useState(false);
  const [showParentModal, setShowParentModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    class: "",
    gender: "",
    dateOfBirth: "",
    phone: "",
    address: "",
    feeStatus: "unpaid",
    parent: null,
  });

  /*
  =====================================
  LOAD STUDENT DATA (EDIT MODE)
  =====================================
  */
  useEffect(() => {
    if (student) {
      setForm({
        name: student.name || "",
        class: student.class || "",
        gender: student.gender || "",
        dateOfBirth: student.dateOfBirth
          ? student.dateOfBirth.split("T")[0]
          : "",
        phone: student.phone || "",
        address: student.address || "",
        feeStatus: student.feeStatus || "unpaid",
        parent: student.parent?._id || student.parent || null,
      });
    }
  }, [student]);

  /*
  =====================================
  RESET FORM
  =====================================
  */
  const resetForm = () => {
    setForm({
      name: "",
      class: "",
      gender: "",
      dateOfBirth: "",
      phone: "",
      address: "",
      feeStatus: "unpaid",
      parent: null,
    });
  };

  /*
  =====================================
  HANDLE SUBMIT
  =====================================
  */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...form,
      };

      if (isEdit) {
        await API.put(
          `/students/${student._id}`,
          payload
        );
      } else {
        await API.post("/students", payload);
      }

      resetForm();
      onSuccess();
    } catch (err) {
      console.error("Student save error:", err);
      alert(
        err.response?.data?.message ||
          "Failed to save student"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90vh]">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {isEdit ? "Edit Student" : "Create Student"}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NAME */}
          <input
            type="text"
            placeholder="Student Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full border p-2 rounded"
            required
          />

          {/* CLASS */}
          <input
            type="text"
            placeholder="Class (e.g JSS1)"
            value={form.class}
            onChange={(e) =>
              setForm({ ...form, class: e.target.value })
            }
            className="w-full border p-2 rounded"
            required
          />

          {/* GENDER */}
          <select
            value={form.gender}
            onChange={(e) =>
              setForm({ ...form, gender: e.target.value })
            }
            className="w-full border p-2 rounded"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          {/* DOB */}
          <input
            type="date"
            value={form.dateOfBirth}
            onChange={(e) =>
              setForm({
                ...form,
                dateOfBirth: e.target.value,
              })
            }
            className="w-full border p-2 rounded"
          />

          {/* PHONE */}
          <input
            type="text"
            placeholder="Parent Phone (optional)"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            className="w-full border p-2 rounded"
          />

          {/* ADDRESS */}
          <input
            type="text"
            placeholder="Address"
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
            className="w-full border p-2 rounded"
          />

          {/* FEE STATUS */}
          <select
            value={form.feeStatus}
            onChange={(e) =>
              setForm({ ...form, feeStatus: e.target.value })
            }
            className="w-full border p-2 rounded"
          >
            <option value="paid">Paid</option>
            <option value="partial">Partial</option>
            <option value="unpaid">Unpaid</option>
          </select>

          {/* PARENT SELECTOR */}
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <ParentSelector
                value={form.parent}
                onChange={(val) =>
                  setForm({ ...form, parent: val })
                }
              />
            </div>

            <button
              type="button"
              onClick={() => setShowParentModal(true)}
              className="bg-green-600 text-white px-3 py-2 rounded"
            >
              + New Parent
            </button>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {loading
                ? "Saving..."
                : isEdit
                ? "Update Student"
                : "Create Student"}
            </button>

          </div>

        </form>

      </div>

      {/* CREATE PARENT MODAL */}
      <CreateParentModal
        open={showParentModal}
        onClose={() => setShowParentModal(false)}
        onCreated={(parent) => {
          setForm({
            ...form,
            parent: parent._id,
          });
          setShowParentModal(false);
        }}
      />

    </div>
  );
}