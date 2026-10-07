// src/pages/assignments/EditAssignment.jsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  BookOpen,
  CalendarDays,
  Paperclip,
  Save,
  ArrowLeft,
  FileText,
} from "lucide-react";
import API from "../../services/api";

export default function EditAssignment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    subject: "",
    className: "",
    dueDate: "",
    totalMarks: "",
    instructions: "",
    attachment: null,
    existingAttachment: "",
    publish: true,
  });

  useEffect(() => {
    loadAssignment();
  }, []);

  async function loadAssignment() {
    try {
      const res = await API.get(`/assignments/${id}`);

      const assignment = res.data.data || res.data;

      setForm({
        title: assignment.title || "",
        subject: assignment.subject || "",
        className: assignment.className || "",
        dueDate: assignment.dueDate?.substring(0, 10) || "",
        totalMarks: assignment.totalMarks || 100,
        instructions: assignment.instructions || "",
        attachment: null,
        existingAttachment: assignment.attachment || "",
        publish: assignment.publish ?? true,
      });
    } catch (err) {
      console.error(err);
      alert("Unable to load assignment.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleFile(e) {
    setForm((prev) => ({
      ...prev,
      attachment: e.target.files[0],
    }));
  }

  async function updateAssignment() {
    try {
      setSaving(true);

      const data = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (value !== null) data.append(key, value);
      });

      await API.put(`/assignments/${id}`, data);

      alert("Assignment updated successfully.");

      navigate("/teacher/assignments");
    } catch (err) {
      console.error(err);
      alert("Update failed.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading assignment...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <section className="rounded-3xl bg-gradient-to-r from-amber-600 to-orange-600 text-white p-8 shadow-lg">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-5"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-4xl font-bold">
          Edit Assignment
        </h1>

        <p className="mt-3 text-orange-100">
          Modify assignment details before students submit.
        </p>

      </section>

      <div className="bg-white rounded-3xl shadow border">

        <div className="p-8 space-y-8">

          <div className="grid lg:grid-cols-2 gap-6">

            <Input
              icon={<FileText size={18} />}
              label="Title"
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
              type="number"
              label="Total Marks"
              name="totalMarks"
              value={form.totalMarks}
              onChange={handleChange}
            />

          </div>

          <div>

            <label className="font-semibold block mb-2">
              Instructions
            </label>

            <textarea
              rows={8}
              className="w-full rounded-2xl border p-5"
              name="instructions"
              value={form.instructions}
              onChange={handleChange}
            />

          </div>

          <div>

            <label className="font-semibold block mb-3">
              Replace Attachment
            </label>

            <label className="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center cursor-pointer">

              <Paperclip size={34} />

              <p className="mt-3">
                Choose new attachment
              </p>

              <input
                hidden
                type="file"
                onChange={handleFile}
              />

              {form.existingAttachment && (
                <p className="mt-4 text-indigo-600 text-sm">
                  Current:
                  {" "}
                  {form.existingAttachment}
                </p>
              )}

              {form.attachment && (
                <p className="mt-2 text-green-600">
                  {form.attachment.name}
                </p>
              )}

            </label>

          </div>

          <div className="flex items-center gap-3">

            <input
              type="checkbox"
              name="publish"
              checked={form.publish}
              onChange={handleChange}
            />

            Publish Assignment

          </div>

        </div>

      </div>

      <div className="flex justify-end">

        <button
          disabled={saving}
          onClick={updateAssignment}
          className="bg-indigo-700 text-white px-8 py-3 rounded-xl flex items-center gap-2"
        >

          <Save size={18} />

          {saving ? "Updating..." : "Update Assignment"}

        </button>

      </div>

    </div>
  );
}

function Input({ label, icon, ...props }) {
  return (
    <div>

      <label className="block mb-2 font-semibold">
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