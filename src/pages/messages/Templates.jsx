import Button from "../../components/ui/Button";

export default function Templates() {
  return (
    <div>

      <h1 className="mb-6">
        Templates
      </h1>

      <div className="grid grid-cols-2 gap-4">

        <div className="bg-white p-4 rounded-xl shadow">
          <h3>Fee Reminder</h3>

          <p>
            Dear Parent,
            this is a reminder that
            your child has an outstanding fee balance.
          </p>

          <Button className="mt-3">
            Use Template
          </Button>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3>PTA Meeting</h3>

          <p>
            Parents are invited
            for the upcoming PTA meeting.
          </p>

          <Button className="mt-3">
            Use Template
          </Button>
        </div>

      </div>

    </div>
  );
}