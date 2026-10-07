import Button from "../../components/ui/Button";

export default function Payments() {
  const payments = [
    {
      id: 1,
      student: "Ahmed Musa",
      class: "JSS 2",
      amount: "₦50,000",
      date: "2026-01-12",
      status: "Paid",
    },
    {
      id: 2,
      student: "Aisha Bello",
      class: "SS 1",
      amount: "₦35,000",
      date: "2026-01-14",
      status: "Pending",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Payments
        </h1>

        <Button>
          Record Payment
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Student</th>
              <th className="text-left py-3">Class</th>
              <th className="text-left py-3">Amount</th>
              <th className="text-left py-3">Date</th>
              <th className="text-left py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-b">
                <td className="py-3">{payment.student}</td>
                <td>{payment.class}</td>
                <td>{payment.amount}</td>
                <td>{payment.date}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      payment.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}