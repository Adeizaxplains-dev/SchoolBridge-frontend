import { ShieldX } from "lucide-react";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">

      <ShieldX
        size={80}
        className="text-red-500 mb-6"
      />

      <h1 className="text-3xl font-bold mb-2">
        Access Denied
      </h1>

      <p className="text-gray-600 text-center max-w-md mb-8">
        You do not have permission to access this page.
      </p>

      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Return Home
      </Link>
    </div>
  );
}