import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";

import ResultTopBar from "../../components/results/ResultTopBar";
import StudentProfileCard from "../../components/results/StudentProfileCard";
import SubjectEntryTable from "../../components/results/SubjectEntryTable";
import ResultPerformanceChart from "../../components/results/ResultPerformanceChart";
import ResultAnalytics from "../../components/results/ResultAnalytics";
import RemarksSection from "../../components/results/RemarksSection";
import StickySaveBar from "../../components/results/StickySaveBar";
import ResultSummaryCards from "../../components/results/ResultSummaryCards";

export default function EditResult() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [student, setStudent] = useState(null);

  const [session, setSession] = useState("");
  const [term, setTerm] = useState("");

  const [subjects, setSubjects] = useState([]);

  const [teacherRemark, setTeacherRemark] = useState("");
  const [principalRemark, setPrincipalRemark] = useState("");

  const safeSubjects = useMemo(() => subjects || [], [subjects]);

  useEffect(() => {
    loadResult();
  }, []);

  const loadResult = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/results/${id}`);

      const result = res.data.data;

      setSession(result.session || "");
      setTerm(result.term || "");

      setTeacherRemark(result.teacherRemark || "");
      setPrincipalRemark(result.principalRemark || "");

      setSubjects(result.subjects || []);

      if (typeof result.studentId === "object") {
        setStudent(result.studentId);
      } else {
        const studentRes = await API.get(`/students/${result.studentId}`);
        setStudent(studentRes.data.data);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to load result");
    } finally {
      setLoading(false);
    }
  };

  const updateSubject = (index, updatedSubject) => {
    setSubjects((prev) => {
      const copy = [...prev];
      copy[index] = updatedSubject;
      return copy;
    });
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
    setSubjects((prev) => prev.filter((_, i) => i !== index));
  };

  const totalScore = safeSubjects.reduce(
    (sum, item) => sum + Number(item.total || 0),
    0
  );

  const average =
    safeSubjects.length > 0
      ? totalScore / safeSubjects.length
      : 0;

  const percentage =
    safeSubjects.length > 0
      ? (totalScore / (safeSubjects.length * 100)) * 100
      : 0;

  const resultSummary = {
    session,
    term,
    totalScore,
    average,
    percentage,
    subjects: safeSubjects,
    teacherRemark,
    principalRemark,
  };

  const saveChanges = async () => {
    try {
      await API.put(`/results/${id}`, {
        studentId: student?._id,
        className: student?.class,

        session,
        term,

        teacherRemark,
        principalRemark,

        totalScore,
        average,
        percentage,

        subjects: safeSubjects,
      });

      alert("Result Updated Successfully");

      navigate(`/results/${id}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading Result...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      <ResultTopBar
        title="Edit Student Result"
        subtitle="Modify scores and remarks"
        onBack={() => navigate(-1)}
      />

      <div className="max-w-7xl mx-auto p-6 space-y-8">

        {student && (
          <StudentProfileCard
            student={student}
            result={resultSummary}
          />
        )}

        <ResultSummaryCards
          result={{
            totalScore,
            average,
            percentage,
            position: "--",
          }}
        />

        <SubjectEntryTable
          subjects={safeSubjects}
          updateSubject={updateSubject}
          addSubject={addSubject}
          removeSubject={removeSubject}
        />

        <div className="grid xl:grid-cols-2 gap-6">

          <ResultPerformanceChart
            subjects={safeSubjects}
          />

          <ResultAnalytics
            result={resultSummary}
          />

        </div>

        <RemarksSection
          teacherRemark={teacherRemark}
          principalRemark={principalRemark}
          setTeacherRemark={setTeacherRemark}
          setPrincipalRemark={setPrincipalRemark}
        />

      </div>

      <StickySaveBar
        totalSubjects={safeSubjects.length}
        totalScore={totalScore}
        average={average}
        percentage={percentage}
        onSave={saveChanges}
      />

    </div>
  );
}