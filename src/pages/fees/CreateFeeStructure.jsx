import { useState } from "react";
import { createFeeStructure } from "../../services/feeStructureService";
import Button from "../../components/ui/Button";

export default function CreateFeeStructure() {
  const [form, setForm] = useState({
    className: "",
    term: "first",
    session: "",
    totalAmount: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createFeeStructure(form);
      alert("Fee structure created");
    } catch (err) {
      console.error(err);
      alert("Failed to create structure");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl">
      
      <h1 className="text-xl font-bold mb-4">
        Create Fee Structure
      </h1>

      <input
        placeholder="Class Name"
        className="border p-2 w-full mb-3"
        onChange={(e) =>
          setForm({ ...form, className: e.target.value })
        }
      />

      <select
        className="border p-2 w-full mb-3"
        onChange={(e) =>
          setForm({ ...form, term: e.target.value })
        }
      >
        <option value="first">First Term</option>
        <option value="second">Second Term</option>
        <option value="third">Third Term</option>
      </select>

      <input
        placeholder="Session (e.g 2025/2026)"
        className="border p-2 w-full mb-3"
        onChange={(e) =>
          setForm({ ...form, session: e.target.value })
        }
      />

      <input
        placeholder="Total Amount"
        type="number"
        className="border p-2 w-full mb-3"
        onChange={(e) =>
          setForm({ ...form, totalAmount: e.target.value })
        }
      />

      <Button type="submit">
        Save Structure
      </Button>

    </form>
  );
}