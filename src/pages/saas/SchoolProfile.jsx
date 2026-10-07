import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function SchoolProfile() {
  return (
    <div>

      <h1 className="mb-6">
        School Profile
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        <Input
          label="School Name"
          placeholder="Future Leaders Academy"
        />

        <Input
          label="Email"
          placeholder="info@school.com"
        />

        <Input
          label="Phone"
          placeholder="08012345678"
        />

        <Button>
          Save Changes
        </Button>

      </div>

    </div>
  );
}