import { Calculator, Percent, Award } from "lucide-react";

export default function ResultSubjectRow({
  index,
  subject = {},
  onChange,
  action,
}) {
  const getGrade = (score) => {
    if (score >= 75) return "A";
    if (score >= 65) return "B";
    if (score >= 55) return "C";
    if (score >= 45) return "D";
    if (score >= 40) return "E";
    return "F";
  };

  const getRemark = (score) => {
    if (score >= 75) return "Excellent";
    if (score >= 65) return "Very Good";
    if (score >= 55) return "Good";
    if (score >= 45) return "Fair";
    if (score >= 40) return "Pass";
    return "Fail";
  };

  const updateField = (field, value) => {
    const updated = {
      ...subject,
      [field]:
        field === "subject" || field === "teacherComment"
          ? value
          : Number(value || 0),
    };

    const total =
      Number(updated.ca1 || 0) +
      Number(updated.ca2 || 0) +
      Number(updated.ca3 || 0) +
      Number(updated.exam || 0);

    updated.total = total;
    updated.percentage = total;
    updated.grade = getGrade(total);
    updated.remark = getRemark(total);

    onChange(index, updated);
  };

  const gradeStyle = {
    A: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    B: "bg-blue-100 text-blue-700 border border-blue-200",
    C: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    D: "bg-orange-100 text-orange-700 border border-orange-200",
    E: "bg-purple-100 text-purple-700 border border-purple-200",
    F: "bg-red-100 text-red-700 border border-red-200",
  };

  const inputStyle =
    "w-full h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

  const scoreStyle =
    "w-20 h-11 rounded-xl border border-slate-200 bg-slate-50 text-center font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition mx-auto";

  return (
    <tr className="border-b border-slate-100 hover:bg-blue-50/40 transition">

      {/* Subject */}

      <td className="w-64 px-4 py-3">
        <input
          type="text"
          placeholder="Subject"
          value={subject.subject || ""}
          onChange={(e) =>
            updateField("subject", e.target.value)
          }
          className={inputStyle}
        />
      </td>

      {/* CA1 */}

      <td className="w-24 px-4 py-3 text-center">
        <input
          type="number"
          min={0}
          max={10}
          value={subject.ca1 ?? 0}
          onChange={(e) =>
            updateField("ca1", e.target.value)
          }
          className={scoreStyle}
        />
      </td>

      {/* CA2 */}

      <td className="w-24 px-4 py-3 text-center">
        <input
          type="number"
          min={0}
          max={10}
          value={subject.ca2 ?? 0}
          onChange={(e) =>
            updateField("ca2", e.target.value)
          }
          className={scoreStyle}
        />
      </td>

      {/* CA3 */}

      <td className="w-24 px-4 py-3 text-center">
        <input
          type="number"
          min={0}
          max={10}
          value={subject.ca3 ?? 0}
          onChange={(e) =>
            updateField("ca3", e.target.value)
          }
          className={scoreStyle}
        />
      </td>

      {/* Exam */}

      <td className="w-24 px-4 py-3 text-center">
        <input
          type="number"
          min={0}
          max={70}
          value={subject.exam ?? 0}
          onChange={(e) =>
            updateField("exam", e.target.value)
          }
          className={scoreStyle}
        />
      </td>

      {/* Total */}

      <td className="w-24 px-4 py-3 text-center">
        <div className="inline-flex items-center gap-2 font-bold text-blue-600">
          <Calculator size={15} />
          {subject.total ?? 0}
        </div>
      </td>

      {/* Percentage */}

      <td className="w-20 px-4 py-3 text-center">
        <div className="inline-flex items-center gap-1 font-semibold text-slate-700">
          <Percent size={14} />
          {(Number(subject.percentage) || 0).toFixed(0)}
        </div>
      </td>

      {/* Grade */}

      <td className="w-28 px-4 py-3 text-center">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold ${
            gradeStyle[subject.grade] || gradeStyle.F
          }`}
        >
          <Award size={14} />
          {subject.grade || "-"}
        </span>
      </td>

      {/* Remark */}

      <td className="w-40 px-4 py-3 text-center">
        <span className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700">
          {subject.remark || "-"}
        </span>
      </td>

      {/* Teacher Comment */}

      <td className="w-72 px-4 py-3">
        <input
          type="text"
          placeholder="Teacher's comment..."
          value={subject.teacherComment || ""}
          onChange={(e) =>
            updateField("teacherComment", e.target.value)
          }
          className={inputStyle}
        />
      </td>

      {/* Action */}

      <td className="w-20 px-4 py-3 text-center">
        {action}
      </td>

    </tr>
  );
}