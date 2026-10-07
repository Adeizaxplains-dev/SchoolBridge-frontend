import Button from "../../../components/ui/Button";

export default function Support() {
  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        Parent Support Center
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        <div className="mb-4">

          <label className="block mb-2">
            Category
          </label>

          <select className="w-full border rounded-lg p-3">

            <option>
              Fee Complaint
            </option>

            <option>
              Result Complaint
            </option>

            <option>
              Attendance Inquiry
            </option>

            <option>
              Admission Inquiry
            </option>

            <option>
              General Question
            </option>

          </select>

        </div>

        <div className="mb-4">

          <label className="block mb-2">
            Subject
          </label>

          <input
            type="text"
            placeholder="Enter subject"
            className="w-full border rounded-lg p-3"
          />

        </div>

        <div className="mb-4">

          <label className="block mb-2">
            Message
          </label>

          <textarea
            rows="6"
            placeholder="Describe your issue..."
            className="w-full border rounded-lg p-3"
          />

        </div>

        <Button>
          Submit Ticket
        </Button>

      </div>

      {/* Previous Tickets */}

      <div className="bg-white mt-6 p-6 rounded-xl shadow">

        <h2 className="font-semibold mb-4">
          Previous Tickets
        </h2>

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">
                Ticket ID
              </th>

              <th className="p-3 text-left">
                Subject
              </th>

              <th className="p-3 text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            <tr className="border-t">

              <td className="p-3">
                #SB001
              </td>

              <td className="p-3">
                Fee Payment Issue
              </td>

              <td className="p-3 text-yellow-600">
                Pending
              </td>

            </tr>

            <tr className="border-t">

              <td className="p-3">
                #SB002
              </td>

              <td className="p-3">
                Result Clarification
              </td>

              <td className="p-3 text-green-600">
                Resolved
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}