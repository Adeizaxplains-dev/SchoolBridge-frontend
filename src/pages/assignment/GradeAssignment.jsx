// src/pages/Assignments/GradeAssignment.jsx

import { useEffect, useState } from "react";
import {
  Search,
  CheckCircle2,
  Clock3,
  FileText,
  Save,
  Send,
  Star,
} from "lucide-react";

import API from "../../services/api";
import Button from "../../components/ui/Button";

export default function GradeAssignment() {
  const [submissions, setSubmissions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      const res = await API.get("/assignments/submissions");

      setSubmissions(res.data.data || []);
    } catch (err) {
      console.error(err);

      // Demo data

      setSubmissions([
        {
          _id: "1",
          student: "Abdul Kareem",
          class: "SS2 Gold",
          assignment: "Algebra Worksheet",
          submittedAt: "Today • 9:15 AM",
          status: "Submitted",
          answer:
            "Student attached PDF solution showing all working..."
        },
        {
          _id: "2",
          student: "Mary Johnson",
          class: "SS2 Gold",
          assignment: "Algebra Worksheet",
          submittedAt: "Yesterday",
          status: "Submitted",
          answer:
            "Student answered directly inside the editor."
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const saveGrade = async () => {
    if (!selected) return;

    try {
      setSaving(true);

      await API.post(`/assignments/${selected._id}/grade`, {
        score,
        feedback,
      });

      alert("Assignment graded successfully.");
    } catch (err) {
      console.error(err);
      alert("Grade saved (demo)");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* Hero */}

      <section className="rounded-3xl bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-600 text-white p-8 shadow-lg">

        <h1 className="text-4xl font-bold">
          Grade Assignments
        </h1>

        <p className="mt-3 text-blue-100">
          Review student submissions, assign marks and provide
          constructive feedback.
        </p>

      </section>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT */}

        <div className="bg-white rounded-3xl shadow border">

          <div className="p-6 border-b">

            <div className="relative">

              <Search
                size={18}
                className="absolute left-3 top-3 text-gray-400"
              />

              <input
                placeholder="Search submissions..."
                className="w-full pl-10 pr-4 py-3 border rounded-xl"
              />

            </div>

          </div>

          <div className="divide-y max-h-[650px] overflow-y-auto">

            {loading ? (
              <div className="p-8 text-center">
                Loading...
              </div>
            ) : (
              submissions.map((item) => (
                <button
                  key={item._id}
                  onClick={() => {
                    setSelected(item);
                    setScore("");
                    setFeedback("");
                  }}
                  className={`w-full text-left p-5 hover:bg-slate-50 transition ${
                    selected?._id === item._id
                      ? "bg-blue-50"
                      : ""
                  }`}
                >

                  <div className="flex justify-between">

                    <div>

                      <h3 className="font-semibold">
                        {item.student}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {item.class}
                      </p>

                    </div>

                    <CheckCircle2
                      className="text-green-500"
                      size={18}
                    />

                  </div>

                  <p className="mt-3 font-medium">
                    {item.assignment}
                  </p>

                  <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">

                    <Clock3 size={14} />

                    {item.submittedAt}

                  </div>

                </button>
              ))
            )}

          </div>

        </div>

        {/* RIGHT */}

        <div className="lg:col-span-2">

          {!selected ? (
            <div className="bg-white rounded-3xl shadow border p-20 text-center">

              <FileText
                size={60}
                className="mx-auto text-gray-300"
              />

              <h2 className="mt-6 text-2xl font-bold">
                Select a submission
              </h2>

              <p className="text-gray-500 mt-2">
                Choose a student to begin grading.
              </p>

            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow border">

              <div className="p-8 border-b">

                <h2 className="text-2xl font-bold">
                  {selected.student}
                </h2>

                <p className="text-gray-500 mt-2">
                  {selected.assignment}
                </p>

              </div>

              <div className="p-8 space-y-8">

                <div>

                  <h3 className="font-semibold mb-3">
                    Student Submission
                  </h3>

                  <div className="rounded-2xl bg-slate-50 p-6 leading-7">

                    {selected.answer}

                  </div>

                </div>

                <div className="grid md:grid-cols-2 gap-6">

                  <div>

                    <label className="font-medium">
                      Score
                    </label>

                    <input
                      type="number"
                      value={score}
                      onChange={(e) =>
                        setScore(e.target.value)
                      }
                      className="mt-2 w-full border rounded-xl px-4 py-3"
                      placeholder="100"
                    />

                  </div>

                  <div>

                    <label className="font-medium">
                      Rating
                    </label>

                    <div className="flex gap-2 mt-4">

                      {[1,2,3,4,5].map((s)=>(
                        <Star
                          key={s}
                          className="text-yellow-500 cursor-pointer"
                        />
                      ))}

                    </div>

                  </div>

                </div>

                <div>

                  <label className="font-medium">
                    Feedback
                  </label>

                  <textarea
                    rows={6}
                    value={feedback}
                    onChange={(e)=>
                      setFeedback(e.target.value)
                    }
                    className="mt-2 w-full border rounded-2xl p-4"
                    placeholder="Provide constructive feedback..."
                  />

                </div>

              </div>

              <div className="border-t p-6 flex justify-end gap-4">

                <Button
                  onClick={saveGrade}
                  disabled={saving}
                >
                  <Save size={18}/>
                  Save Draft
                </Button>

                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={saveGrade}
                  disabled={saving}
                >
                  <Send size={18}/>
                  Return to Student
                </Button>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}