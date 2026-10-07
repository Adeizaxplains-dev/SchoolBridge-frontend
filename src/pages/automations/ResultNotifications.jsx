import Button from "../../components/ui/Button";

export default function ResultNotifications() {
  return (
    <div>

      <h1 className="mb-6">
        Result Notifications
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        <label className="flex items-center gap-2 mb-4">
          <input type="checkbox" />
          Send notification when results are published
        </label>

        <textarea
          rows="6"
          className="w-full border rounded-lg p-3"
          defaultValue={`Dear Parent,

The result of {studentName}
has been published.

Click below to view.

{resultLink}`}
        />

        <Button className="mt-4">
          Save Template
        </Button>

      </div>

    </div>
  );
}