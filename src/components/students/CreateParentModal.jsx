import { useState } from "react";
import API from "../../services/api";

export default function CreateParentModal({
  open,
  onClose,
  onCreated,
}) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  /*
  =====================================
  RESET FORM
  =====================================
  */
  const resetForm = () => {
    setForm({
      fullName: "",
      email: "",
      phone: "",
      password: "",
    });
  };

  /*
  =====================================
  CREATE PARENT
  =====================================
  */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post(
        "/parents",
        form
      );

      const parent = res?.data?.data;

      if (!parent) {
        throw new Error("Invalid response");
      }

      // Send parent back to StudentForm
      onCreated(parent);

      resetForm();
      onClose();

    } catch (err) {
      console.error("Create parent error:", err);

      alert(
        err.response?.data?.message ||
          "Failed to create parent"
      );

    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">

          <h2 className="text-xl font-bold">
            Create Parent
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500"
          >
            ✕
          </button>

        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-3">

          {/* FULL NAME */}
          <input
            type="text"
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) =>
              setForm({
                ...form,
                fullName: e.target.value,
              })
            }
            className="w-full border p-2 rounded"
            required
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="w-full border p-2 rounded"
            required
          />

          {/* PHONE */}
          <input
            type="text"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
            className="w-full border p-2 rounded"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            className="w-full border p-2 rounded"
            required
          />

          {/* ACTIONS */}
          <div className="flex justify-end gap-2 pt-4">

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
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              {loading ? "Creating..." : "Create Parent"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}