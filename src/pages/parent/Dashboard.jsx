import { useEffect, useState } from "react";
import API from "../../services/api";
import Card from "../../components/ui/Card";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get(
          "/parent/dashboard"
        );

        console.log(
          "Parent Dashboard:",
          res.data
        );

        setData(res.data);
      } catch (err) {
        console.error(
          "Parent Dashboard Error:",
          err.response?.data || err
        );

        setError(
          err.response?.data?.message ||
          "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading)
    return <div className="p-6">Loading...</div>;

  if (error)
    return (
      <div className="p-6 text-red-500">
        {error}
      </div>
    );

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">
        Welcome,
        {" "}
        {data?.parent?.fullName || "Parent"}
      </h1>

      <div className="grid md:grid-cols-4 gap-4">
        <Card
          title="Children"
          value={data?.children?.length || 0}
        />

        <Card
          title="Outstanding Fees"
          value={`₦${
            data?.outstandingFees || 0
          }`}
        />

        <Card
          title="Results Available"
          value={data?.results?.length || 0}
        />

        <Card
          title="Unread Notices"
          value={data?.unreadNotices || 0}
        />
      </div>
    </div>
  );
}