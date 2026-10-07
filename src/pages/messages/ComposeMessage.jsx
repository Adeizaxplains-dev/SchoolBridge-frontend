import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function ComposeMessage() {
  return (
    <div>

      <h1 className="mb-6">
        Compose WhatsApp Message
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        <label className="block mb-2">
          Audience
        </label>

        <select className="w-full border rounded-lg p-3 mb-4">
          <option>All Parents</option>
          <option>All Teachers</option>
          <option>Specific Class</option>
          <option>Specific Student Parent</option>
        </select>

        <Input
          label="Subject"
          placeholder="Fee Reminder"
        />

        <label className="block mb-2">
          Message
        </label>

        <textarea
          rows="8"
          className="w-full border rounded-lg p-3 mb-4"
          placeholder="Write your message..."
        />

        <div className="flex gap-3">
          <Button>
            Send Now
          </Button>

          <Button variant="secondary">
            Schedule
          </Button>
        </div>

      </div>

    </div>
  );
}