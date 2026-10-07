import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

import {
  RefreshCw,
  Send,
  Search,
} from "lucide-react";

import StudentMiniCard from "../../components/results/StudentMiniCard";
import ResultStatusBadge from "../../components/results/ResultStatusBadge";

export default function PublishResults() {
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selected, setSelected] = useState([]);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
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

  const filteredResults = useMemo(() => {
    return results.filter((result) => {
      const matchesSearch =
        result.studentName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        result.admissionNumber
          ?.toLowerCase()
          .includes(search.toLowerCase());

      return (
        matchesSearch &&
        result.status !== "published"
      );
    });
  }, [results, search]);

  const toggleSelection = (id) => {
    if (selected.includes(id)) {
      setSelected(
        selected.filter((x) => x !== id)
      );
    } else {
      setSelected([...selected, id]);
    }
  };

  const publishOne = async (id) => {
    try {
      await API.patch(`/results/publish/${id}`);

      await loadResults();
    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.message ||
          "Unable to publish result."
      );
    }
  };

  const publishBulk = async () => {
    if (selected.length === 0) {
      return alert("Please select results.");
    }

    try {
      await Promise.all(
        selected.map((id) =>
          API.patch(`/results/publish/${id}`)
        )
      );

      setSelected([]);

      await loadResults();

      alert(
        `${selected.length} result(s) published successfully.`
      );
    } catch (err) {
      console.log(err);
      alert("Bulk publish failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-7xl mx-auto p-6 space-y-6">

        {/* Header */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          <div>

            <h1 className="text-3xl font-bold">
              Publish Results
            </h1>

            <p className="text-gray-500">
              Publish approved student results.
            </p>

          </div>

          <div className="flex gap-3">

            <button
              onClick={loadResults}
              className="border rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-50"
            >
              <RefreshCw size={18} />
              Refresh
            </button>

            <button
              onClick={publishBulk}
              className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-5 py-2 flex items-center gap-2"
            >
              <Send size={18} />
              Publish Selected
            </button>

          </div>

        </div>

        {/* Search */}

        <div className="bg-white rounded-xl shadow p-5">

          <div className="relative">

            <Search
              className="absolute left-3 top-3 text-gray-400"
              size={18}
            />

            <input
              className="w-full border rounded-lg pl-10 pr-4 py-2"
              placeholder="Search by student or admission number..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </div>

        {/* Table */}

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="w-14 p-4 text-center">

                  <input
                    type="checkbox"
                    checked={
                      filteredResults.length > 0 &&
                      selected.length ===
                        filteredResults.length
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelected(
                          filteredResults.map(
                            (r) => r._id
                          )
                        );
                      } else {
                        setSelected([]);
                      }
                    }}
                  />

                </th>

                <th className="p-4 text-left">
                  Student
                </th>

                <th className="p-4">
                  Class
                </th>

                <th className="p-4">
                  Average
                </th>

                <th className="p-4">
                  Status
                </th>

                <th className="p-4">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan={6}
                    className="py-16 text-center text-gray-500"
                  >
                    Loading results...
                  </td>

                </tr>

              ) : filteredResults.length === 0 ? (

                <tr>

                  <td
                    colSpan={6}
                    className="py-16 text-center text-gray-500"
                  >
                    No results awaiting publication.
                  </td>

                </tr>

              ) : (

                filteredResults.map((result) => (

                  <tr
                    key={result._id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="text-center">

                      <input
                        type="checkbox"
                        checked={selected.includes(
                          result._id
                        )}
                        onChange={() =>
                          toggleSelection(
                            result._id
                          )
                        }
                      />

                    </td>

                    <td className="p-4">

                      <StudentMiniCard
                        student={{
                          passport:
                            result.studentPassport,
                          name:
                            result.studentName,
                          admissionNumber:
                            result.admissionNumber,
                          class:
                            result.className,
                          parentPhone:
                            result.parentPhone,
                        }}
                      />

                    </td>

                    <td className="text-center font-medium">

                      {result.className}

                    </td>

                    <td className="text-center font-semibold text-blue-700">

                      {Number(
                        result.average || 0
                      ).toFixed(2)}

                    </td>

                    <td className="text-center">

                      <ResultStatusBadge
                        status={result.status}
                      />

                    </td>

                    <td className="text-center">

                      <button
                        onClick={() =>
                          publishOne(result._id)
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Publish
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

