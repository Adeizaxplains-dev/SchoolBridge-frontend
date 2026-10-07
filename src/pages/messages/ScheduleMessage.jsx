import Button from "../../components/ui/Button";

export default function ScheduleMessage() {
  return (
    <div>

      <h1 className="mb-6">
        Schedule Message
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        <textarea
          rows="6"
          className="w-full border rounded-lg p-3 mb-4"
          placeholder="Message..."
        />

        <label>
          Delivery Date
        </label>

        <input
          type="date"
          className="w-full border rounded-lg p-3 mb-4"
        />

        <label>
          Delivery Time
        </label>

        <input
          type="time"
          className="w-full border rounded-lg p-3 mb-4"
        />

        <label>
          Recurring
        </label>

        <select
          className="w-full border rounded-lg p-3 mb-4"
        >
          <option>One Time</option>
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>

        <Button>
          Schedule Message
        </Button>

      </div>

    </div>
  );
}