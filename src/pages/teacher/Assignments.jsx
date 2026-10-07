import { useEffect, useState } from "react";
import axios from "axios";

import { API_BASE_URL } from "../../services/api";

const API = `${API_BASE_URL}/teacher`;

export default function TeacherAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
    subject: "",
    classId: "",
    dueDate: "",
  });

  const token = localStorage.getItem("token");

  const fetchAssignments = async () => {
    try {
      const { data } = await axios.get(
        `${API}/assignments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAssignments(data.data || []);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${API}/assignments`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setForm({
        title: "",
        description: "",
        subject: "",
        classId: "",
        dueDate: "",
      });

      fetchAssignments();

      alert("Assignment created.");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Assignments
        </h1>

        <p className="text-gray-500">
          Create and manage assignments.
        </p>

      </div>

      <form
        onSubmit={submitHandler}
        className="bg-white rounded-xl shadow p-6 grid md:grid-cols-2 gap-4"
      >

        <input
          className="border rounded-lg p-3"
          placeholder="Title"
          value={form.title}
          onChange={(e)=>
            setForm({
              ...form,
              title:e.target.value
            })
          }
        />

        <input
          className="border rounded-lg p-3"
          placeholder="Subject"
          value={form.subject}
          onChange={(e)=>
            setForm({
              ...form,
              subject:e.target.value
            })
          }
        />

        <input
          className="border rounded-lg p-3"
          placeholder="Class"
          value={form.classId}
          onChange={(e)=>
            setForm({
              ...form,
              classId:e.target.value
            })
          }
        />

        <input
          type="date"
          className="border rounded-lg p-3"
          value={form.dueDate}
          onChange={(e)=>
            setForm({
              ...form,
              dueDate:e.target.value
            })
          }
        />

        <textarea
          className="border rounded-lg p-3 md:col-span-2"
          rows="4"
          placeholder="Description"
          value={form.description}
          onChange={(e)=>
            setForm({
              ...form,
              description:e.target.value
            })
          }
        />

        <button
          className="bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700"
        >
          Create Assignment
        </button>

      </form>

      <div className="bg-white rounded-xl shadow">

        <div className="p-5 border-b">

          <h2 className="font-semibold">
            My Assignments
          </h2>

        </div>

        {loading ? (

          <div className="p-6">
            Loading...
          </div>

        ) : (

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="text-left p-4">
                  Title
                </th>

                <th className="text-left p-4">
                  Subject
                </th>

                <th className="text-left p-4">
                  Class
                </th>

                <th className="text-left p-4">
                  Due Date
                </th>

              </tr>

            </thead>

            <tbody>

              {assignments.map((item)=>(

                <tr
                  key={item._id}
                  className="border-t"
                >

                  <td className="p-4">
                    {item.title}
                  </td>

                  <td className="p-4">
                    {item.subject}
                  </td>

                  <td className="p-4">
                    {item.classId}
                  </td>

                  <td className="p-4">
                    {new Date(item.dueDate)
                      .toLocaleDateString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}