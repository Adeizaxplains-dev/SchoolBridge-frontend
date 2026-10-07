import { useState } from "react";
import {
  BookOpen,
  CalendarDays,
  Paperclip,
  Save,
  Send,
  FileText,
} from "lucide-react";
import API from "../../services/api";

export default function CreateAssignment() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    subject: "",
    className: "",
    dueDate: "",
    totalMarks: 100,
    instructions: "",
    attachment: null,
    publish: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleFile = (e) => {
    setForm((prev) => ({
      ...prev,
      attachment: e.target.files[0],
    }));
  };

  const submitAssignment = async () => {
    try {
      setLoading(true);

      const data = new FormData();

      Object.keys(form).forEach((key) => {
        data.append(key, form[key]);
      });

      await API.post("/assignments", data);

      alert("Assignment created successfully.");

      setForm({
        title: "",
        subject: "",
        className: "",
        dueDate: "",
        totalMarks: 100,
        instructions: "",
        attachment: null,
        publish: true,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to create assignment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* HERO */}

      <section className="rounded-3xl bg-gradient-to-r from-indigo-700 to-blue-700 p-8 text-white shadow-lg">

        <p className="uppercase tracking-wider text-blue-100 text-sm">
          Assignment Management
        </p>

        <h1 className="text-4xl font-bold mt-3">
          Create Assignment
        </h1>

        <p className="mt-4 text-blue-100 max-w-2xl">
          Create homework, projects, tests and
          classroom activities. Students will
          receive instant notifications.
        </p>

      </section>

      {/* FORM */}

      <div className="bg-white rounded-3xl shadow border">

        <div className="border-b px-8 py-6">

          <h2 className="text-2xl font-bold">
            Assignment Details
          </h2>

        </div>

        <div className="p-8 space-y-8">

          <div className="grid lg:grid-cols-2 gap-6">

            <Input
              icon={<FileText size={18} />}
              label="Assignment Title"
              name="title"
              value={form.title}
              onChange={handleChange}
            />

            <Input
              icon={<BookOpen size={18} />}
              label="Subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
            />

            <Input
              label="Class"
              name="className"
              value={form.className}
              onChange={handleChange}
            />

            <Input
              icon={<CalendarDays size={18} />}
              type="date"
              label="Due Date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
            />

            <Input
              label="Total Marks"
              name="totalMarks"
              type="number"
              value={form.totalMarks}
              onChange={handleChange}
            />

          </div>

          {/* Instructions */}

          <div>

            <label className="block font-semibold mb-2">
              Instructions
            </label>

            <textarea
              rows={8}
              name="instructions"
              value={form.instructions}
              onChange={handleChange}
              placeholder="Write assignment instructions..."
              className="w-full rounded-2xl border p-5"
            />

          </div>

          {/* Attachment */}

          <div>

            <label className="font-semibold block mb-3">
              Attachment
            </label>

            <label className="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center cursor-pointer hover:bg-slate-50">

              <Paperclip size={36} />

              <p className="mt-3">
                Upload PDF, DOCX or Image
              </p>

              <input
                type="file"
                hidden
                onChange={handleFile}
              />

              {form.attachment && (
                <p className="mt-4 text-blue-600 font-medium">
                  {form.attachment.name}
                </p>
              )}

            </label>

          </div>

          {/* Publish */}

          <div className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={form.publish}
              name="publish"
              onChange={handleChange}
            />

            <span>
              Publish immediately after saving
            </span>

          </div>

        </div>

      </div>

      {/* ACTIONS */}

      <div className="flex justify-end gap-4">

        <button
          className="px-6 py-3 rounded-xl border"
        >
          Cancel
        </button>

        <button
          onClick={submitAssignment}
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-indigo-700 text-white flex items-center gap-2"
        >

          <Save size={18} />

          {loading ? "Saving..." : "Save Draft"}

        </button>

        <button
          onClick={submitAssignment}
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-green-600 text-white flex items-center gap-2"
        >

          <Send size={18} />

          Publish

        </button>

      </div>

    </div>
  );
}

function Input({
  label,
  icon,
  ...props
}) {
  return (
    <div>

      <label className="font-semibold mb-2 block">
        {label}
      </label>

      <div className="relative">

        {icon && (
          <div className="absolute left-4 top-4 text-slate-400">
            {icon}
          </div>
        )}

        <input
          {...props}
          className={`w-full rounded-2xl border p-4 ${
            icon ? "pl-12" : ""
          }`}
        />

      </div>

    </div>
  );
}