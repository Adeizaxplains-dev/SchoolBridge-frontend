import Button from "../../components/ui/Button";

export default function FeeReminderRules() {
  return (
    <div>

      <h1 className="mb-6">
        Fee Reminder Automation
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        <label className="flex items-center gap-2 mb-4">
          <input type="checkbox" />
          Enable Automatic Fee Reminders
        </label>

        <div className="space-y-4">

          <div>
            Send reminder:
            <select className="border ml-3 p-2 rounded">
              <option>7 days before due date</option>
              <option>3 days before due date</option>
              <option>On due date</option>
            </select>
          </div>

          <div>
            Repeat every:
            <select className="border ml-3 p-2 rounded">
              <option>7 days</option>
              <option>14 days</option>
              <option>30 days</option>
            </select>
          </div>

        </div>

        <Button className="mt-6">
          Save Rules
        </Button>

      </div>

    </div>
  );
}