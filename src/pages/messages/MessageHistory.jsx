export default function MessageHistory() {
  return (
    <div>

      <h1 className="mb-6">
        Message History
      </h1>

      <div className="bg-white rounded-xl shadow">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-3">
                Audience
              </th>

              <th className="p-3">
                Message
              </th>

              <th className="p-3">
                Date
              </th>

              <th className="p-3">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            <tr>

              <td className="p-3">
                Parents
              </td>

              <td className="p-3">
                Fee reminder...
              </td>

              <td className="p-3">
                Today
              </td>

              <td className="p-3 text-green-600">
                Delivered
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}