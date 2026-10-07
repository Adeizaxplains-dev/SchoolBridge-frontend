import { useEffect, useState } from "react";
import API from "../../../services/api";
export default function FeeStatus() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const user = JSON.parse(
          localStorage.getItem("user")
        );

        const res = await API.get(
          "/parent/dashboard",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        setFees(res.data.fees || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFees();
  }, []);

  if (loading)
    return <p>Loading fees...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Fees Overview
      </h1>

      <div className="space-y-3">
        {fees.length === 0 ? (
          <p>No fee records</p>
        ) : (
          fees.map((fee, i) => (
            <div
              key={i}
              className="p-4 bg-white shadow rounded"
            >
              <p>
                Student:{" "}
                {fee.student?.name}
              </p>
              <p>
                Amount: ₦{fee.amount}
              </p>
              <p>
                Paid: ₦{fee.paidAmount}
              </p>
              <p>
                Balance: ₦{fee.balance}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}