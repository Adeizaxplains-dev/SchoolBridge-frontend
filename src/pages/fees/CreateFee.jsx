import { useState, useEffect } from "react";
import { createFee } from "../../services/feeService";
import { getStudents } from "../../services/studentService";
import Button from "../../components/ui/Button";

export default function CreateFee() {
const [students, setStudents] = useState([]);
const [loadingStudents, setLoadingStudents] =
useState(true);

const [form, setForm] = useState({
studentId: "",
category: "Tuition",
session: "",
term: "first",
totalAmount: "",
dueDate: "",
});

useEffect(() => {
loadStudents();
}, []);

const loadStudents = async () => {
  try {
    setLoadingStudents(true);

    const res = await getStudents();

    console.log("FULL RESPONSE:", res);

    if (Array.isArray(res)) {
      setStudents(res);
    } else if (res.students) {
      setStudents(res.students);
    } else if (res.data) {
      setStudents(res.data);
    } else {
      setStudents([]);
    }
  } catch (error) {
    console.error(
      "Failed to load students",
      error
    );
  } finally {
    setLoadingStudents(false);
  }
};

const handleSubmit = async (e) => {
e.preventDefault();

try {
  await createFee(form);

  alert("Fee created successfully");

  setForm({
    studentId: "",
    category: "Tuition",
    session: "",
    term: "first",
    totalAmount: "",
    dueDate: "",
  });
} catch (error) {
  console.error(error);

  alert(
    error?.response?.data?.message ||
      "Failed to create fee"
  );
}

};

return ( <div className="max-w-2xl mx-auto"> <form
     onSubmit={handleSubmit}
     className="bg-white p-6 rounded-xl shadow"
   > <h1 className="text-2xl font-bold mb-6">
Create Fee </h1>

    <label className="block mb-1 font-medium">
      Student
    </label>

    <select
      className="border p-2 w-full mb-4"
      value={form.studentId}
      onChange={(e) =>
        setForm({
          ...form,
          studentId: e.target.value,
        })
      }
      required
    >
      <option value="">
        {loadingStudents
          ? "Loading students..."
          : "Select Student"}
      </option>

      {students.map((student) => (
        <option
          key={student._id}
          value={student._id}
        >
          {student.name} - {student.class}
        </option>
      ))}
    </select>
<p className="text-sm text-gray-500">
  Students loaded: {students.length}
</p>

    <label className="block mb-1 font-medium">
      Fee Category
    </label>

    <select
      className="border p-2 w-full mb-4"
      value={form.category}
      onChange={(e) =>
        setForm({
          ...form,
          category: e.target.value,
        })
      }
    >
      <option value="Tuition">
        Tuition
      </option>

      <option value="Transport">
        Transport
      </option>

      <option value="Uniform">
        Uniform
      </option>

      <option value="Books">
        Books
      </option>

      <option value="PTA">
        PTA
      </option>

      <option value="Examination">
        Examination
      </option>

      <option value="Hostel">
        Hostel
      </option>

      <option value="Other">
        Other
      </option>
    </select>

    <label className="block mb-1 font-medium">
      Academic Session
    </label>

    <input
      type="text"
      placeholder="2026/2027"
      className="border p-2 w-full mb-4"
      value={form.session}
      onChange={(e) =>
        setForm({
          ...form,
          session: e.target.value,
        })
      }
      required
    />

    <label className="block mb-1 font-medium">
      Term
    </label>

    <select
      className="border p-2 w-full mb-4"
      value={form.term}
      onChange={(e) =>
        setForm({
          ...form,
          term: e.target.value,
        })
      }
    >
      <option value="first">
        First Term
      </option>

      <option value="second">
        Second Term
      </option>

      <option value="third">
        Third Term
      </option>
    </select>

    <label className="block mb-1 font-medium">
      Amount (₦)
    </label>

    <input
      type="number"
      placeholder="20000"
      className="border p-2 w-full mb-4"
      value={form.totalAmount}
      onChange={(e) =>
        setForm({
          ...form,
          totalAmount: e.target.value,
        })
      }
      required
    />

    <label className="block mb-1 font-medium">
      Due Date
    </label>

    <input
      type="date"
      className="border p-2 w-full mb-6"
      value={form.dueDate}
      onChange={(e) =>
        setForm({
          ...form,
          dueDate: e.target.value,
        })
      }
      required
    />

    <Button
      type="submit"
      className="w-full"
    >
      Create Fee
    </Button>
  </form>
</div>

);
}
