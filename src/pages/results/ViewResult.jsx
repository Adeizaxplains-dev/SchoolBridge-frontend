import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";

import ResultHeaderActions from "../../components/results/ResultHeaderActions";
import StudentProfileCard from "../../components/results/StudentProfileCard";
import ResultSummaryCards from "../../components/results/ResultSummaryCards";
import SubjectTable from "../../components/results/SubjectTable";
import TeacherRemarksCard from "../../components/results/TeacherRemarksCard";
import PrincipalRemarksCard from "../../components/results/PrincipalRemarksCard";
import ResultApprovalTimeline from "../../components/results/ResultApprovalTimeline";
import ResultStatistics from "../../components/results/ResultStatistics";
import ResultStatusBar from "../../components/results/ResultStatusBar";
import ResultPerformanceChart from "../../components/results/ResultPerformanceChart";

export default function ViewResult() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);

    useEffect(() => {
        loadResult();
    }, []);

    const loadResult = async () => {
        try {
            setLoading(true);

            const res = await API.get(`/results/${id}`);

            setResult(res.data.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                Loading Result...
            </div>
        );
    }

    if (!result) {
        return (
            <div className="flex items-center justify-center h-screen">
                Result Not Found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100">

            <div className="max-w-7xl mx-auto p-6 space-y-6">

                {/* Top Actions */}

                <ResultHeaderActions
                    result={result}
                />

                {/* Status */}

                <ResultStatusBar
                    result={result}
                />

                {/* Student */}

                <StudentProfileCard
                    student={{
                        name:
                            result.studentName,
                        passport:
                            result.studentPassport,
                        admissionNumber:
                            result.admissionNumber,
                        class:
                            result.className,
                        gender:
                            result.gender,
                        phone:
                            result.phone,
                    }}
                />

                {/* Summary */}

                <ResultSummaryCards
                    result={result}
                />

                {/* Statistics */}

                <ResultStatistics
                    result={result}
                />

                {/* Subject Table */}

                <div className="bg-white rounded-xl shadow">

                    <div className="px-6 py-4 border-b">

                        <h2 className="text-lg font-semibold">
                            Subject Performance
                        </h2>

                    </div>

                    <div className="p-6">

                        <SubjectTable
                            subjects={
                                result.subjects
                            }
                            readonly
                        />

                    </div>

                </div>

                {/* Chart */}

                <div className="bg-white rounded-xl shadow p-6">

                    <ResultPerformanceChart
                        subjects={
                            result.subjects
                        }
                    />

                </div>

                {/* Remarks */}

                <div className="grid lg:grid-cols-2 gap-6">

                    <TeacherRemarksCard
                        remark={
                            result.teacherRemark
                        }
                    />

                    <PrincipalRemarksCard
                        remark={
                            result.principalRemark
                        }
                    />

                </div>

                {/* Approval */}

                <ResultApprovalTimeline
                    result={result}
                />

                {/* Bottom Buttons */}

                <div className="flex justify-end gap-3 pt-6">

                    <button
                        onClick={() =>
                            navigate(
                                `/results/edit/${result._id}`
                            )
                        }
                        className="px-5 py-3 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600"
                    >
                        Edit Result
                    </button>

                    <button
                        onClick={() =>
                            navigate(
                                `/results/send/${result._id}`
                            )
                        }
                        className="px-5 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700"
                    >
                        Send Result
                    </button>

                    <button
                        onClick={() =>
                            navigate(
                                "/results/saved"
                            )
                        }
                        className="px-5 py-3 rounded-lg border"
                    >
                        Back
                    </button>

                </div>

            </div>

        </div>
    );
}