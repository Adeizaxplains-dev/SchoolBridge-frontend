import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";
import StudentMiniCard from "../../components/results/StudentMiniCard";
import ResultSummaryCards from "../../components/results/ResultSummaryCards";
import SubjectTable from "../../components/results/SubjectTable";
import TeacherRemarksCard from "../../components/results/TeacherRemarksCard";
import PrincipalRemarksCard from "../../components/results/PrincipalRemarksCard";
import ResultHeaderActions from "../../components/results/ResultHeaderActions";
import ResultApprovalTimeline from "../../components/results/ResultApprovalTimeline";

export default function ResultPreview() {
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

            setResult(res.data.data || res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-500">
                Loading Result...
            </div>
        );
    }

    if (!result) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500">
                Result not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100">

    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* HERO */}

        <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white shadow-xl p-8">

            <div className="flex justify-between items-start flex-col lg:flex-row gap-6">

                <div>

                    <p className="uppercase tracking-widest text-blue-200 text-sm">
                        Academic Report
                    </p>

                    <h1 className="text-4xl font-bold mt-2">
                        Student Result Preview
                    </h1>

                    <p className="mt-3 text-blue-100 max-w-2xl">
                        Review academic performance, remarks, approval history
                        and publish professionally formatted report cards.
                    </p>

                </div>

                <ResultHeaderActions result={result} />

            </div>

        </div>

        {/* STUDENT + SUMMARY */}

        <div className="grid xl:grid-cols-4 gap-6">

            <div className="xl:col-span-1">

                <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">

                    <StudentMiniCard
                        student={{
                            name: result.studentName,
                            passport: result.studentPassport,
                            admissionNumber: result.admissionNumber,
                            class: result.className,
                            parentPhone: result.phone,
                        }}
                    />

                </div>

            </div>

            <div className="xl:col-span-3">

                <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">

                    <h2 className="text-xl font-semibold mb-6">
                        Performance Summary
                    </h2>

                    <ResultSummaryCards
                        result={result}
                    />

                </div>

            </div>

        </div>

        {/* SUBJECTS */}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">

            <div className="px-8 py-6 border-b">

                <h2 className="text-xl font-semibold">
                    Subject Performance
                </h2>

                <p className="text-gray-500 mt-1">
                    Continuous Assessment and Examination Breakdown
                </p>

            </div>

            <div className="p-6">

                <SubjectTable
                    subjects={result.subjects || []}
                    readonly
                />

            </div>

        </div>

        {/* REMARKS */}

        <div className="grid lg:grid-cols-2 gap-6">

            <div className="bg-white rounded-3xl shadow-sm border border-gray-200">

                <div className="px-6 py-5 border-b">

                    <h2 className="font-semibold">
                        Teacher Assessment
                    </h2>

                </div>

                <div className="p-6">

                    <TeacherRemarksCard
                        remark={result.teacherRemark}
                    />

                </div>

            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-200">

                <div className="px-6 py-5 border-b">

                    <h2 className="font-semibold">
                        Principal Assessment
                    </h2>

                </div>

                <div className="p-6">

                    <PrincipalRemarksCard
                        remark={result.principalRemark}
                    />

                </div>

            </div>

        </div>

        {/* APPROVAL */}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">

            <h2 className="text-xl font-semibold mb-6">
                Approval Workflow
            </h2>

            <ResultApprovalTimeline
                result={result}
            />

        </div>

        {/* FOOTER */}

        <div className="flex justify-end gap-4 sticky bottom-6">

            <button
                onClick={() =>
                    navigate(`/results/edit/${result._id}`)
                }
                className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white shadow-lg font-semibold transition"
            >
                Edit Result
            </button>

            <button
                onClick={() =>
                    navigate(`/results/send/${result._id}`)
                }
                className="px-8 py-3 rounded-2xl bg-green-600 hover:bg-green-700 text-white shadow-lg font-semibold transition"
            >
                Send Result
            </button>

        </div>

    </div>

</div>
    );
}