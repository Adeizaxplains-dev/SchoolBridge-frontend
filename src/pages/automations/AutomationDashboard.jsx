import Card from "../../components/ui/Card";

export default function AutomationDashboard() {
  return (
    <div>

      <div className="mb-6">
        <h1>Automation Center</h1>
        <p>
          Configure smart school workflows
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">

        <Card
          title="Fee Reminders"
          value="Active"
        />

        <Card
          title="Result Alerts"
          value="Active"
        />

        <Card
          title="Calendar Events"
          value="12"
        />

        <Card
          title="Scheduled Messages"
          value="47"
        />

      </div>

    </div>
  );
}