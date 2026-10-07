import { useEffect, useMemo, useState } from "react";
import API from "../services/api";

/*
=========================================
SCHOOLBRIDGE CREATE RESULT ENGINE
=========================================
*/

export default function useCreateResult() {

  /*
  =========================================
  STUDENTS STATE
  =========================================
  */
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [student, setStudent] = useState(null);

  /*
  =========================================
  ACADEMIC CONTEXT
  =========================================
  */
  const [session, setSession] = useState("2026/2027");
  const [term, setTerm] = useState("First Term");

  /*
  =========================================
  REMARKS
  =========================================
  */
  const [teacherRemark, setTeacherRemark] = useState("");
  const [principalRemark, setPrincipalRemark] = useState("");

  /*
  =========================================
  SUBJECTS STATE
  =========================================
  */
  const [subjects, setSubjects] = useState([
    {
      subject: "",
      ca1: 0,
      ca2: 0,
      ca3: 0,
      exam: 0,
      total: 0,
      percentage: 0,
      grade: "",
      remark: "",
      teacherComment: "",
    },
  ]);

  /*
  =========================================
  LOADING STATE
  =========================================
  */
  const [loading, setLoading] = useState(false);

  /*
  =========================================
  LOAD STUDENTS
  =========================================
  */
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const res = await API.get("/students");

      const data = res.data;

      if (Array.isArray(data)) {
        setStudents(data);
      } else if (Array.isArray(data.data)) {
        setStudents(data.data);
      } else {
        setStudents([]);
      }
    } catch (err) {
      console.error("LOAD STUDENTS ERROR:", err);
      setStudents([]);
    }
  };

  /*
  =========================================
  FETCH SINGLE STUDENT
  =========================================
  */
  const fetchStudent = async (id) => {
    if (!id) return;

    try {
      const res = await API.get(`/students/${id}`);

      setStudent(res.data.data || res.data);
    } catch (err) {
      console.error("FETCH STUDENT ERROR:", err);
    }
  };

  /*
  =========================================
  SUBJECT HANDLERS
  =========================================
  */
  const updateSubject = (index, updated) => {
    const copy = [...subjects];
    copy[index] = updated;
    setSubjects(copy);
  };

  const addSubject = () => {
    setSubjects((prev) => [
      ...prev,
      {
        subject: "",
        ca1: 0,
        ca2: 0,
        ca3: 0,
        exam: 0,
        total: 0,
        percentage: 0,
        grade: "",
        remark: "",
        teacherComment: "",
      },
    ]);
  };

  const removeSubject = (index) => {
    setSubjects((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  /*
  =========================================
  CALCULATIONS (SMART & REACTIVE)
  =========================================
  */
  const totalScore = useMemo(() => {
    return subjects.reduce(
      (sum, s) => sum + Number(s.total || 0),
      0
    );
  }, [subjects]);

  const maxScore = subjects.length * 100;

  const average = useMemo(() => {
    return subjects.length > 0
      ? totalScore / subjects.length
      : 0;
  }, [subjects, totalScore]);

  const percentage = useMemo(() => {
    return maxScore > 0
      ? (totalScore / maxScore) * 100
      : 0;
  }, [maxScore, totalScore]);

  /*
  =========================================
  SAVE RESULT
  =========================================
  */
  const saveResult = async () => {
    if (!selectedStudent) {
      alert("Please select a student");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        studentId: selectedStudent,
        className: student?.class || "",
        term,
        session,
        subjects,
        teacherRemark,
        principalRemark,
        totalScore,
        average,
        percentage,
      };

      const res = await API.post(
        "/results",
        payload
      );

      alert("Result saved successfully");

      return res.data;
    } catch (err) {
      console.error("SAVE RESULT ERROR:", err);

      alert(
        err?.response?.data?.message ||
          "Failed to save result"
      );
    } finally {
      setLoading(false);
    }
  };

  /*
  =========================================
  RETURN ENGINE
  =========================================
  */
  return {
    // students
    students,
    selectedStudent,
    setSelectedStudent,
    student,
    fetchStudent,

    // academic
    session,
    setSession,
    term,
    setTerm,

    // remarks
    teacherRemark,
    setTeacherRemark,
    principalRemark,
    setPrincipalRemark,

    // subjects
    subjects,
    setSubjects,
    updateSubject,
    addSubject,
    removeSubject,

    // calculations
    totalScore,
    average,
    percentage,

    // actions
    saveResult,
    loading,
  };
}