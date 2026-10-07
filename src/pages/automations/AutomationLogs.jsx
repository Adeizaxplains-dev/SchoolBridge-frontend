export default function AutomationLogs() {
  return (
    <div>

      <h1 className="mb-6">
        Automation Activity
      </h1>

      <div className="bg-white rounded-xl shadow p-4">

        <table className="w-full">

          <thead>
            <tr>
              <th>Date</th>
              <th>Automation</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>10 June</td>
              <td>Fee Reminder</td>
              <td>Success</td>
            </tr>

            <tr>
              <td>10 June</td>
              <td>Result Notification</td>
              <td>Success</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}