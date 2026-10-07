import Button from "../../components/ui/Button";

export default function PaymentAlerts() {
  return (
    <div>

      <h1 className="mb-6">
        Payment Confirmation Alerts
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        <label className="flex items-center gap-2 mb-4">
          <input type="checkbox" />
          Enable payment confirmation alerts
        </label>

        <textarea
          rows="6"
          className="w-full border rounded-lg p-3"
          defaultValue={`Dear Parent,

We have received your payment of ₦{amount}.

Outstanding Balance:
₦{balance}

Thank you.`}
        />

        <Button className="mt-4">
          Save Template
        </Button>

      </div>

    </div>
  );
}