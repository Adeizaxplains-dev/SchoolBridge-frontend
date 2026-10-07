import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

import { getFeeStructures } from "../../services/feeStructureService";

export default function FeeStructure() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);

      const res = await getFeeStructures();

      setData(res.data || []);
    } catch (err) {
      console.error("Fee structure error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        Loading fee structure...
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Fee Structure
        </h1>

        <Button
          onClick={() =>
            navigate("/fees/structure/create")
          }
        >
          + Add Structure
        </Button>
      </div>

      <div className="grid gap-4">
        {data.length > 0 ? (
          data.map((item) => (
            <Card
              key={item._id}
              title={`${item.className} - ${item.term}`}
              value={`₦${Number(
                item.totalAmount
              ).toLocaleString()}`}
            />
          ))
        ) : (
          <div className="bg-white p-6 rounded-xl shadow">
            No fee structures found.
          </div>
        )}
      </div>
    </div>
  );
}