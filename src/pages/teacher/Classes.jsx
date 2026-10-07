import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Users,
  UserCheck,
  BookOpen,
  ClipboardCheck,
  MessageCircle,
  Download,
  Eye,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const attendanceData = [
  { day: "Mon", attendance: 91 },
  { day: "Tue", attendance: 94 },
  { day: "Wed", attendance: 92 },
  { day: "Thu", attendance: 96 },
  { day: "Fri", attendance: 95 },
];

const studentsData = [
  {
    id: 1,
    name: "Abdul Malik",
    admission: "ADM001",
    gender: "Male",
    attendance: 98,
    result: 84,
    fees: "Paid",
  },
  {
    id: 2,
    name: "Aisha Bello",
    admission: "ADM002",
    gender: "Female",
    attendance: 94,
    result: 81,
    fees: "Partial",
  },
  {
    id: 3,
    name: "John David",
    admission: "ADM003",
    gender: "Male",
    attendance: 90,
    result: 75,
    fees: "Paid",
  },
  {
    id: 4,
    name: "Mary James",
    admission: "ADM004",
    gender: "Female",
    attendance: 97,
    result: 88,
    fees: "Paid",
  },
];

export default function MyClass() {
  const [search, setSearch] = useState("");

  const filteredStudents = useMemo(() => {
    return studentsData.filter((student) =>
      student.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="space-y-8">

      {/* HERO */}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-8 text-white shadow-xl"
      >
        <div className="flex flex-col lg:flex-row justify-between gap-8">

          <div>

            <p className="uppercase tracking-widest text-blue-200 text-sm">
              Class Management
            </p>

            <h1 className="text-4xl font-bold mt-2">
              Primary 5 Gold
            </h1>

            <p className="mt-4 text-blue-100 max-w-2xl">
              Manage attendance, monitor performance,
              communicate with parents and oversee every
              student in your class from one dashboard.
            </p>

          </div>

          <div className="flex flex-wrap gap-3">

            <button className="bg-white text-blue-700 px-5 py-3 rounded-xl font-semibold hover:bg-gray-100">
              <ClipboardCheck className="inline mr-2 h-5 w-5" />
              Take Attendance
            </button>

            <button className="bg-white/20 backdrop-blur px-5 py-3 rounded-xl hover:bg-white/30">
              <BookOpen className="inline mr-2 h-5 w-5" />
              Enter Results
            </button>

            <button className="bg-white/20 backdrop-blur px-5 py-3 rounded-xl hover:bg-white/30">
              <MessageCircle className="inline mr-2 h-5 w-5" />
              Message Parents
            </button>

          </div>

        </div>
      </motion.div>

      {/* KPI */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {[
          {
            title: "Students",
            value: 32,
            icon: Users,
          },
          {
            title: "Boys",
            value: 17,
            icon: UserCheck,
          },
          {
            title: "Girls",
            value: 15,
            icon: UserCheck,
          },
          {
            title: "Attendance",
            value: "95%",
            icon: ClipboardCheck,
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <motion.div
              whileHover={{ y: -5 }}
              key={item.title}
              className="bg-white rounded-3xl shadow-sm border p-6"
            >
              <div className="flex justify-between">

                <div>

                  <p className="text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {item.value}
                  </h2>

                </div>

                <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                  <Icon className="text-blue-700" />

                </div>

              </div>

            </motion.div>
          );
        })}

      </div>

      {/* GRAPH */}

      <div className="bg-white rounded-3xl shadow-sm border p-8">

        <div className="flex justify-between items-center mb-6">

          <div>

            <h2 className="text-xl font-bold">
              Attendance Trend
            </h2>

            <p className="text-gray-500">
              Weekly class attendance
            </p>

          </div>

          <Download className="text-gray-500 cursor-pointer" />

        </div>

        <div className="h-80">

          <ResponsiveContainer width="100%" height="100%">

            <LineChart data={attendanceData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="day" />

              <YAxis domain={[80, 100]} />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="attendance"
                stroke="#2563eb"
                strokeWidth={4}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* STUDENTS */}

      <div className="bg-white rounded-3xl shadow-sm border">

        <div className="p-6 border-b flex flex-col md:flex-row md:justify-between gap-4">

          <div>

            <h2 className="text-xl font-bold">
              Class Students
            </h2>

            <p className="text-gray-500">
              Manage every student
            </p>

          </div>

          <div className="relative">

            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

            <input
              placeholder="Search student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-3 rounded-xl border w-80"
            />

          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="text-left p-4">
                  Student
                </th>

                <th>Admission</th>

                <th>Gender</th>

                <th>Attendance</th>

                <th>Average</th>

                <th>Fees</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {filteredStudents.map((student) => (

                <tr
                  key={student.id}
                  className="border-t hover:bg-blue-50"
                >

                  <td className="p-4 font-semibold">
                    {student.name}
                  </td>

                  <td>{student.admission}</td>

                  <td>{student.gender}</td>

                  <td>{student.attendance}%</td>

                  <td>{student.result}%</td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        student.fees === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {student.fees}
                    </span>

                  </td>

                  <td>

                    <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800">

                      <Eye size={18} />

                      View

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}