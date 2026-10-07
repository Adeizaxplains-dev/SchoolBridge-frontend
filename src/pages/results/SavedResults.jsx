import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import API from "../../services/api";

import ResultToolbar from "../../components/results/ResultToolbar";
import ResultTable from "../../components/results/ResultTable";
import ResultDashboard from "../../components/results/ResultDashboard";
import SendResultModal from "../../components/SendResult/SendResultModal";

export default function SavedResults() {

    const navigate = useNavigate();

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [termFilter, setTermFilter] = useState("");
    const [sessionFilter, setSessionFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const [page, setPage] = useState(1);
    const pageSize = 10;

    const [selectedResult, setSelectedResult] = useState(null);
    const [showSendModal, setShowSendModal] = useState(false);

    useEffect(() => {
        fetchResults();
    }, []);

    useEffect(() => {
        setPage(1);
    }, [
        search,
        termFilter,
        sessionFilter,
        statusFilter,
    ]);

    const fetchResults = async () => {

        try {

            setLoading(true);

            const res = await API.get("/results");

            setResults(res.data.data || []);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    const deleteResult = async (id) => {

        if (
            !window.confirm(
                "Delete this result permanently?"
            )
        ) return;

        try {

            await API.delete(`/results/${id}`);

            fetchResults();

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Delete failed"
            );

        }

    };

    const keyword = search.toLowerCase();

    const filteredResults = results.filter((result) => {

        const matchesSearch =

            result.studentName
                ?.toLowerCase()
                .includes(keyword)

            ||

            result.admissionNumber
                ?.toLowerCase()
                .includes(keyword)

            ||

            result.className
                ?.toLowerCase()
                .includes(keyword);

        const matchesTerm =
            !termFilter ||
            result.term === termFilter;

        const matchesSession =
            !sessionFilter ||
            result.session === sessionFilter;

        const matchesStatus =
            !statusFilter ||
            result.status === statusFilter;

        return (

            matchesSearch &&
            matchesTerm &&
            matchesSession &&
            matchesStatus

        );

    });

    const totalPages = Math.max(
        1,
        Math.ceil(filteredResults.length / pageSize)
    );

    const paginatedResults = filteredResults.slice(

        (page - 1) * pageSize,

        page * pageSize

    );

    return (

        <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen space-y-6">

            {/* HEADER */}

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Result Management
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage, review, publish and distribute student results.
                    </p>

                </div>

                <button

                    onClick={() =>
                        navigate("/results/create")
                    }

                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow"

                >

                    <Plus size={18} />

                    Create Result

                </button>

            </div>

            {/* DASHBOARD */}

            <ResultDashboard
    results={results}
    loading={loading}
    onRefresh={fetchResults}
/>

            {/* TOOLBAR */}

            <ResultToolbar

                search={search}
                setSearch={setSearch}

                term={termFilter}
                setTerm={setTermFilter}

                session={sessionFilter}
                setSession={setSessionFilter}

                status={statusFilter}
                setStatus={setStatusFilter}

                onRefresh={fetchResults}

            />

                        {/* RESULTS TABLE */}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

                {loading ? (

                    <div className="flex justify-center items-center py-24">

                        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

                    </div>

                ) : paginatedResults.length === 0 ? (

                    <div className="py-24 text-center">

                        <div className="mx-auto w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">

                            📄

                        </div>

                        <h2 className="mt-6 text-xl font-semibold text-gray-800">

                            No Results Found

                        </h2>

                        <p className="mt-2 text-gray-500">

                            Try changing your filters or create a new result.

                        </p>

                        <button

                            onClick={() =>
                                navigate("/results/create")
                            }

                            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"

                        >

                            Create Result

                        </button>

                    </div>

                ) : (

                    <ResultTable

                        results={paginatedResults}

                        onView={(result) =>
                            navigate(`/results/${result._id}`)
                        }

                        onEdit={(result) =>
                            navigate(`/results/edit/${result._id}`)
                        }

                        onPDF={(result) =>
                            navigate(`/results/${result._id}`)
                        }

                        onSend={(result) => {

                            setSelectedResult(result);

                            setShowSendModal(true);

                        }}

                        onDelete={(result) =>
                            deleteResult(result._id)
                        }

                    />

                )}

            </div>

            {/* PAGINATION */}

            <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                <div className="text-sm text-gray-500">

                    Showing{" "}

                    <strong>

                        {paginatedResults.length}

                    </strong>{" "}

                    of{" "}

                    <strong>

                        {filteredResults.length}

                    </strong>{" "}

                    results

                </div>

                <div className="flex items-center gap-2">

                    <button

                        disabled={page === 1}

                        onClick={() =>
                            setPage((prev) => prev - 1)
                        }

                        className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-40"

                    >

                        Previous

                    </button>

                    <span className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold">

                        {page}

                    </span>

                    <button

                        disabled={page === totalPages}

                        onClick={() =>
                            setPage((prev) => prev + 1)
                        }

                        className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-40"

                    >

                        Next

                    </button>

                </div>

            </div>

                        {/* SEND RESULT MODAL */}

            {showSendModal && selectedResult && (

                <SendResultModal

                    open={showSendModal}

                    result={selectedResult}

                    onClose={() => {

                        setShowSendModal(false);

                        setSelectedResult(null);

                    }}

                    onSuccess={() => {

                        fetchResults();

                        setShowSendModal(false);

                        setSelectedResult(null);

                    }}

                />

            )}

        </div>

    );

}