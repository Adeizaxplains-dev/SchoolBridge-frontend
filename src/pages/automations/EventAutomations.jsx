import Button from "../../components/ui/Button";

export default function EventAutomations() {
  return (
    <div>

      <h1 className="mb-6">
        School Calendar Automations
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        <table className="w-full">

          <thead>
            <tr>
              <th>Event</th>
              <th>Date</th>
              <th>Reminder</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Resumption</td>
              <td>15 Sept 2026</td>
              <td>7 Days Before</td>
            </tr>

            <tr>
              <td>PTA Meeting</td>
              <td>20 Sept 2026</td>
              <td>1 Day Before</td>
            </tr>
          </tbody>

        </table>

        <Button className="mt-4">
          Add Event
        </Button>

      </div>

    </div>
  );
}