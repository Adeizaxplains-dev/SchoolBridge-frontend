import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function MessagesDashboard() {
  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1>Communication Center</h1>

        <Button>
          New Message
        </Button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4 mb-6">

        <Card
          title="Messages Sent"
          value="1,254"
        />

        <Card
          title="Scheduled"
          value="42"
        />

        <Card
          title="Delivered"
          value="1,210"
        />

        <Card
          title="Failed"
          value="44"
        />

      </div>

      {/* ACTIVITY SECTION */}
      <div className="bg-white p-6 rounded-xl shadow">
        Recent Communication Activity
      </div>

    </div>
  );
}