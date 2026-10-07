import { useEffect, useState } from "react";
import API from "../../../services/api";
import ParentResult from "../../../components/admin/parents/ParentResults";

export default function Results() {
  const [result, setResult] = useState(null);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    loadResult();
  }, []);

  const loadResult = async () => {
    try {
      const res = await API.get("/parent/results");

      setResult(res.data.data.result);
      setStudent(res.data.data.student);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <ParentResult
        result={result}
        student={student}
      />
    </div>
  );
}