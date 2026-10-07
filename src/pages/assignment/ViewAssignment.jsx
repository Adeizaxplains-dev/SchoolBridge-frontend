// src/pages/Assignments/ViewAssignment.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  ClipboardCheck,
  Download,
  Calendar,
  BookOpen,
  Users,
  Clock,
  CheckCircle2,
  FileText,
} from "lucide-react";

import API from "../../services/api";

export default function ViewAssignment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAssignment();
  }, []);

  const loadAssignment = async () => {
    try {
      const res = await API.get(`/assignments/${id}`);
      setAssignment(res.data.data || res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 animate-pulse space-y-6">
        <div className="h-12 bg-gray-200 rounded-xl" />
        <div className="h-60 bg-gray-200 rounded-2xl" />
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="p-10 text-center">
        Assignment not found.
      </div>
    );
  }

  const stats = assignment.stats || {
    submitted: 18,
    pending: 12,
    graded: 10,
    totalStudents: 30,
  };

  const submissions =
    assignment.submissions || [];

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <button
            onClick={() => navigate(-1)}
            className="p-3 rounded-xl border hover:bg-gray-50"
          >
            <ArrowLeft size={20}/>
          </button>

          <div>

            <h1 className="text-3xl font-bold">
              {assignment.title}
            </h1>

            <p className="text-gray-500">
              Assignment Overview
            </p>

          </div>

        </div>

        <div className="flex gap-3">

          <button
            onClick={() =>
              navigate(`/assignments/edit/${id}`)
            }
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white"
          >
            <Edit size={18}/>
            Edit
          </button>

          <button
            onClick={() =>
              navigate(`/assignments/grade/${id}`)
            }
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-600 text-white"
          >
            <ClipboardCheck size={18}/>
            Grade
          </button>

        </div>

      </div>

      {/* Hero */}

      <div className="rounded-3xl bg-gradient-to-r from-indigo-700 to-blue-700 text-white p-8 shadow-lg">

        <div className="grid lg:grid-cols-2 gap-8">

          <div>

            <h2 className="text-2xl font-bold">
              {assignment.subject}
            </h2>

            <p className="mt-5 leading-8 text-blue-100">
              {assignment.description}
            </p>

          </div>

          <div className="grid grid-cols-2 gap-5">

            <HeroCard
              icon={<BookOpen size={24}/>}
              label="Class"
              value={assignment.className}
            />

            <HeroCard
              icon={<Calendar size={24}/>}
              label="Due Date"
              value={assignment.dueDate}
            />

            <HeroCard
              icon={<Users size={24}/>}
              label="Students"
              value={stats.totalStudents}
            />

            <HeroCard
              icon={<Clock size={24}/>}
              label="Status"
              value={assignment.status}
            />

          </div>

        </div>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-6">

        <StatCard
          title="Submitted"
          value={stats.submitted}
          color="bg-green-500"
        />

        <StatCard
          title="Pending"
          value={stats.pending}
          color="bg-orange-500"
        />

        <StatCard
          title="Graded"
          value={stats.graded}
          color="bg-blue-600"
        />

        <StatCard
          title="Completion"
          value={`${Math.round(
            (stats.submitted /
              stats.totalStudents) *
              100
          )}%`}
          color="bg-purple-600"
        />

      </div>

      {/* Student List */}

      <div className="bg-white rounded-3xl shadow border overflow-hidden">

        <div className="px-8 py-6 border-b">

          <h2 className="text-xl font-bold">
            Student Submissions
          </h2>

        </div>

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="px-6 py-4 text-left">
                Student
              </th>

              <th>Status</th>

              <th>Score</th>

              <th>Submission</th>

              <th></th>

            </tr>

          </thead>

          <tbody>

            {submissions.map((student) => (

              <tr
                key={student._id}
                className="border-b"
              >

                <td className="px-6 py-5 font-medium">
                  {student.studentName}
                </td>

                <td>

                  {student.submitted ? (

                    <span className="inline-flex items-center gap-1 text-green-600">

                      <CheckCircle2 size={16}/>

                      Submitted

                    </span>

                  ) : (
                    "Pending"
                  )}

                </td>

                <td>

                  {student.score ?? "--"}

                </td>

                <td>

                  {student.file ? (

                    <button className="text-blue-600 flex items-center gap-2">

                      <Download size={16}/>

                      Download

                    </button>

                  ) : (
                    "-"
                  )}

                </td>

                <td>

                  <button
                    onClick={() =>
                      navigate(
                        `/assignments/grade/${id}?student=${student._id}`
                      )
                    }
                    className="text-blue-600"
                  >
                    Grade
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

function HeroCard({ icon, label, value }) {
  return (
    <div className="bg-white/10 rounded-2xl p-5">
      {icon}
      <p className="mt-3 text-blue-100 text-sm">{label}</p>
      <h3 className="text-xl font-bold mt-1">{value}</h3>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-2xl border shadow p-6 flex justify-between items-center">
      <div>
        <p className="text-gray-500">{title}</p>
        <h2 className="text-4xl font-bold mt-2">{value}</h2>
      </div>

      <div className={`w-12 h-12 rounded-xl ${color}`} />
    </div>
  );
}