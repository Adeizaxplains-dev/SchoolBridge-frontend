import { useEffect, useState } from "react";
import API from "../../services/api";

import StudentStats from "../../components/students/StudentStats";
import StudentFilters from "../../components/students/StudentFilters";
import StudentTable from "../../components/students/StudentTable";
import StudentDrawer from "../../components/students/StudentDrawer";
import StudentForm from "../../components/students/StudentForm";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    class: "",
    feeStatus: "",
    gender: "",
  });

  /*
  =====================================
  FETCH STUDENTS
  =====================================
  */
  const fetchStudents = async () => {
    try {
      setLoading(true);

      const res = await API.get("/students", {
        params: filters,
      });

      const data = res?.data?.data || [];

      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Students fetch error:", err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  /*
  =====================================
  RE-FETCH WHEN FILTERS CHANGE
  =====================================
  */
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchStudents();
    }, 400);

    return () => clearTimeout(delay);
  }, [filters]);

  /*
  =====================================
  VIEW STUDENT DETAILS
  =====================================
  */
  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setIsDrawerOpen(true);
  };

  /*
  =====================================
  CLOSE DRAWER
  =====================================
  */
  const closeDrawer = () => {
    setSelectedStudent(null);
    setIsDrawerOpen(false);
  };

  /*
  =====================================
  OPEN CREATE FORM
  =====================================
  */
  const openCreateForm = () => {
    setSelectedStudent(null);
    setIsFormOpen(true);
  };

  /*
  =====================================
  OPEN EDIT FORM
  =====================================
  */
  const openEditForm = (student) => {
    setSelectedStudent(student);
    setIsFormOpen(true);
  };

  /*
  =====================================
  CLOSE FORM
  =====================================
  */
  const closeForm = () => {
    setSelectedStudent(null);
    setIsFormOpen(false);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Student Management
          </h1>

          <p className="text-gray-500 text-sm">
            Manage students, parents, fees, and academic records
          </p>
        </div>

        <button
          onClick={openCreateForm}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Student
        </button>
      </div>

      {/* STATS */}
      <StudentStats students={students} />

      {/* FILTERS */}
      <StudentFilters
        filters={filters}
        setFilters={setFilters}
      />

      {/* TABLE */}
      <StudentTable
        students={students}
        loading={loading}
        onView={handleViewStudent}
        onEdit={openEditForm}
        onRefresh={fetchStudents}
      />

      {/* DRAWER (Student Details) */}
      <StudentDrawer
        open={isDrawerOpen}
        student={selectedStudent}
        onClose={closeDrawer}
        onEdit={openEditForm}
      />

      {/* CREATE / EDIT FORM MODAL */}
      <StudentForm
        open={isFormOpen}
        student={selectedStudent}
        onClose={closeForm}
        onSuccess={() => {
          closeForm();
          fetchStudents();
        }}
      />

    </div>
  );
}