import { useEffect, useState } from "react";
import API from "../../services/api";

export default function ParentSelector({ value, onChange }) {
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  /*
  =====================================
  FETCH PARENTS
  =====================================
  */
  const fetchParents = async () => {
    try {
      setLoading(true);

      const res = await API.get("/parents");

      const data = res?.data?.data || [];

      setParents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Parent fetch error:", err);
      setParents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParents();
  }, []);

  /*
  =====================================
  FILTER PARENTS (SEARCH)
  =====================================
  */
  const filteredParents = parents.filter((p) => {
    const query = search.toLowerCase();

    return (
      p.fullName?.toLowerCase().includes(query) ||
      p.email?.toLowerCase().includes(query) ||
      p.phone?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="w-full">

      {/* SEARCH INPUT */}
      <input
        type="text"
        placeholder="Search parent..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />

      {/* SELECT DROPDOWN */}
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border p-2 rounded"
      >

        <option value="">
          Select Parent (optional)
        </option>

        {loading ? (
          <option disabled>Loading parents...</option>
        ) : filteredParents.length === 0 ? (
          <option disabled>No parents found</option>
        ) : (
          filteredParents.map((p) => (
            <option key={p._id} value={p._id}>
              {p.fullName} ({p.email})
            </option>
          ))
        )}

      </select>

    </div>
  );
}