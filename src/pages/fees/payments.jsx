import { useEffect, useState } from "react";

import {
  getPayments,
  recordPayment,
} from "../../services/paymentService";

import {
  getFees,
  initializeFeePayment,
} from "../../services/feeService";

import Button from "../../components/ui/Button";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [fees, setFees] = useState([]);

  const [form, setForm] = useState({
    feeId: "",
    studentId: "",
    amount: "",
    method: "cash",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const paymentRes = await getPayments();
      const feeRes = await getFees();

      setPayments(paymentRes.data || []);
      setFees(feeRes.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await recordPayment(form);

      alert("Payment recorded successfully");

      setForm({
        feeId: "",
        studentId: "",
        amount: "",
        method: "cash",
      });

      loadData();
    } catch (error) {
      console.error(error);
      alert("Failed to record payment");
    }
  };

  const handlePaystackPayment = async (feeId) => {
    try {
      const res = await initializeFeePayment(
        feeId
      );

      window.location.href =
        res.authorization_url;
    } catch (error) {
      console.error(error);

      alert(
        "Failed to initialize Paystack payment"
      );
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Fee Payments
      </h1>

      {/* MANUAL PAYMENT FORM */}

      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="font-semibold mb-4">
          Record Manual Payment
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <select
            className="border p-2 w-full"
            value={form.feeId}
            onChange={(e) => {
              const fee = fees.find(
                (f) =>
                  f._id === e.target.value
              );

              setForm({
                ...form,
                feeId: e.target.value,
                studentId:
                  fee?.studentId?._id || "",
              });
            }}
          >
            <option value="">
              Select Fee
            </option>

            {fees.map((fee) => (
              <option
                key={fee._id}
                value={fee._id}
              >
              {fee.studentId?.name}                {" - "}
                ₦{fee.balance}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Amount"
            className="border p-2 w-full"
            value={form.amount}
            onChange={(e) =>
              setForm({
                ...form,
                amount: e.target.value,
              })
            }
          />

          <select
            className="border p-2 w-full"
            value={form.method}
            onChange={(e) =>
              setForm({
                ...form,
                method: e.target.value,
              })
            }
          >
            <option value="cash">
              Cash
            </option>

            <option value="transfer">
              Transfer
            </option>

            <option value="pos">
              POS
            </option>

            <option value="paystack">
              Paystack
            </option>
          </select>

          <Button type="submit">
            Record Payment
          </Button>
        </form>
      </div>

      {/* OUTSTANDING FEES */}

      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="font-semibold mb-4">
          Outstanding Fees
        </h2>

        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">
                Student
              </th>

              <th className="text-left">
                Balance
              </th>

              <th className="text-left">
                Status
              </th>

              <th className="text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {fees.map((fee) => (
              <tr key={fee._id}>
          
              <td>
            {fee.studentId?.name || "N/A"}
              </td>                

                <td>
                  ₦{fee.balance}
                </td>

                <td>
                  {fee.status}
                </td>

                <td>
                  {fee.balance > 0 && (
                    <Button
                      onClick={() =>
                        handlePaystackPayment(
                          fee._id
                        )
                      }
                    >
                      Pay Online
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAYMENT HISTORY */}

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold mb-4">
          Recent Payments
        </h2>

        <table className="w-full">
          <thead>
            <tr>
              <th>Student</th>
              <th>Amount</th>
              <th>Method</th>
            </tr>
          </thead>

          <tbody>
            {payments.map(
              (payment) => (
                <tr
                  key={payment._id}
                >
                 <td>
        {payment.studentId?.name || "N/A"}
                </td>

                  <td>
                    ₦
                    {
                      payment.amount
                    }
                  </td>

                  <td>
                    {
                      payment.method
                    }
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}