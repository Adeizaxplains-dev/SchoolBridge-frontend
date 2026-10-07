import { useEffect, useState } from "react";
import API from "../../services/api";
import {
  User,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Briefcase,
 Calendar,
  Camera,
  Save,
  Lock,
} from "lucide-react";

export default function TeacherProfile() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [teacher, setTeacher] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    qualification: "",
    designation: "",
    department: "",
    staffId: "",
    classTeacherOf: "",
    employmentDate: "",
    subjects: [],
    passport: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const res = await API.get("/teacher/profile");

      setTeacher(res.data.data || {});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field, value) => {
    setTeacher((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveProfile = async () => {
    try {
      setSaving(true);

      await API.put("/teacher/profile", teacher);

      alert("Profile updated successfully.");
    } catch (err) {
      console.error(err);
      alert("Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* HERO */}

      <div className="rounded-3xl bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-600 p-8 text-white shadow-xl">

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">

          <div className="flex items-center gap-6">

            <div className="relative">

              <img
                src={
                  teacher.passport ||
                  "https://ui-avatars.com/api/?name=Teacher"
                }
                alt=""
                className="w-28 h-28 rounded-full border-4 border-white object-cover"
              />

              <button className="absolute bottom-0 right-0 bg-white text-blue-700 rounded-full p-2 shadow-lg">

                <Camera size={18} />

              </button>

            </div>

            <div>

              <h1 className="text-3xl font-bold">
                {teacher.fullName}
              </h1>

              <p className="text-blue-100 mt-1">
                {teacher.designation}
              </p>

              <div className="mt-3 flex flex-wrap gap-3">

                <span className="bg-white/20 px-4 py-1 rounded-full text-sm">
                  {teacher.department}
                </span>

                <span className="bg-white/20 px-4 py-1 rounded-full text-sm">
                  Staff ID: {teacher.staffId}
                </span>

              </div>

            </div>

          </div>

          <button
            onClick={saveProfile}
            disabled={saving}
            className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 flex items-center gap-2"
          >
            <Save size={18} />

            {saving ? "Saving..." : "Save Changes"}

          </button>

        </div>

      </div>

      {/* PERSONAL */}

      <div className="bg-white rounded-3xl shadow border">

        <div className="p-6 border-b">

          <h2 className="font-bold text-xl">
            Personal Information
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-6 p-8">

          <Input
            icon={<User size={18} />}
            label="Full Name"
            value={teacher.fullName}
            onChange={(e) =>
              updateField("fullName", e.target.value)
            }
          />

          <Input
            icon={<Mail size={18} />}
            label="Email"
            value={teacher.email}
            disabled
          />

          <Input
            icon={<Phone size={18} />}
            label="Phone"
            value={teacher.phone}
            onChange={(e) =>
              updateField("phone", e.target.value)
            }
          />

          <Input
            icon={<MapPin size={18} />}
            label="Address"
            value={teacher.address}
            onChange={(e) =>
              updateField("address", e.target.value)
            }
          />

        </div>

      </div>

      {/* EMPLOYMENT */}

      <div className="bg-white rounded-3xl shadow border">

        <div className="p-6 border-b">

          <h2 className="font-bold text-xl">
            Employment Details
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-6 p-8">

          <Input
            icon={<Briefcase size={18} />}
            label="Designation"
            value={teacher.designation}
            disabled
          />

          <Input
            icon={<GraduationCap size={18} />}
            label="Qualification"
            value={teacher.qualification}
            onChange={(e) =>
              updateField("qualification", e.target.value)
            }
          />

          <Input
            label="Department"
            value={teacher.department}
            disabled
          />

          <Input
            icon={<Calendar size={18} />}
            label="Employment Date"
            value={
              teacher.employmentDate
                ? teacher.employmentDate.substring(0, 10)
                : ""
            }
            disabled
          />

          <Input
            label="Class Teacher"
            value={teacher.classTeacherOf}
            disabled
          />

        </div>

      </div>

      {/* SUBJECTS */}

      <div className="bg-white rounded-3xl shadow border">

        <div className="p-6 border-b">

          <h2 className="font-bold text-xl">
            Assigned Subjects
          </h2>

        </div>

        <div className="p-8 flex flex-wrap gap-3">

          {(teacher.subjects || []).map((subject) => (
            <span
              key={subject}
              className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium"
            >
              {subject}
            </span>
          ))}

        </div>

      </div>

      {/* PASSWORD */}

      <div className="bg-white rounded-3xl shadow border">

        <div className="p-6 border-b">

          <h2 className="font-bold text-xl flex items-center gap-2">

            <Lock size={20} />

            Security

          </h2>

        </div>

        <div className="p-8">

          <button className="bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800">

            Change Password

          </button>

        </div>

      </div>

    </div>
  );
}

function Input({
  icon,
  label,
  value,
  onChange,
  disabled = false,
}) {
  return (
    <div>

      <label className="block text-sm font-medium mb-2">
        {label}
      </label>

      <div className="flex items-center border rounded-xl px-4 py-3">

        {icon && (
          <div className="text-gray-400 mr-3">
            {icon}
          </div>
        )}

        <input
          className="flex-1 outline-none bg-transparent"
          value={value || ""}
          onChange={onChange}
          disabled={disabled}
        />

      </div>

    </div>
  );
}