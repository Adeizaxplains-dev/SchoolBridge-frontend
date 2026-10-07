import Button from "../../components/ui/Button";
import API from "../../services/api";
import { useState } from "react";

export default function Pricing() {
const [loading, setLoading] = useState("");

const handleSubscribe = async (plan) => {
try {
setLoading(plan);

  const res = await API.post(
    "/subscriptions/initialize-payment",
    {
      plan,
    }
  );

  if (!res.data.success) {
    alert(
      res.data.message ||
      "Failed to initialize payment"
    );
    return;
  }

  window.location.href =
    res.data.authorization_url;

} catch (err) {
  console.error(err);

  alert(
    err?.response?.data?.message ||
    "Payment initialization failed"
  );
} finally {
  setLoading("");
}

};

return ( <div> <div className="mb-8"> <h1 className="text-3xl font-bold">
SchoolBridge Pricing </h1>

    <p className="text-gray-500 mt-2">
      Choose a plan that fits your school.
    </p>
  </div>

  <div className="grid lg:grid-cols-4 gap-6">

    {/* STARTER */}
    <div className="bg-white p-6 rounded-xl shadow border">
      <h2 className="text-xl font-bold mb-2">
        Starter
      </h2>

      <p className="text-gray-500 mb-4">
        Up to 100 Students
      </p>

      <h1 className="text-4xl font-bold mb-1">
        ₦15,000
      </h1>

      <p className="text-gray-500 mb-6">
        per month
      </p>

      <Button
        className="w-full"
        disabled={loading === "Starter"}
        onClick={() =>
          handleSubscribe("Starter")
        }
      >
        {loading === "Starter"
          ? "Processing..."
          : "Choose Plan"}
      </Button>
    </div>

    {/* GROWTH */}
    <div className="bg-white p-6 rounded-xl shadow border">
      <h2 className="text-xl font-bold mb-2">
        Growth
      </h2>

      <p className="text-gray-500 mb-4">
        Up to 200 Students
      </p>

      <h1 className="text-4xl font-bold mb-1">
        ₦25,000
      </h1>

      <p className="text-gray-500 mb-6">
        per month
      </p>

      <Button
        className="w-full"
        disabled={loading === "Growth"}
        onClick={() =>
          handleSubscribe("Growth")
        }
      >
        {loading === "Growth"
          ? "Processing..."
          : "Choose Plan"}
      </Button>
    </div>

    {/* PREMIUM */}
    <div className="bg-blue-600 text-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-2">
        Premium
      </h2>

      <p className="mb-4">
        Unlimited Students
      </p>

      <h1 className="text-4xl font-bold mb-1">
        ₦50,000
      </h1>

      <p className="mb-6">
        per month
      </p>

      <Button
        className="w-full"
        disabled={loading === "Enterprise"}
        onClick={() =>
          handleSubscribe("Premium")
        }
      >
        {loading === "Premium"
          ? "Processing..."
          : "Upgrade Now"}
      </Button>
    </div>

    {/* CUSTOM */}
    <div className="bg-white p-6 rounded-xl shadow border">
      <h2 className="text-xl font-bold mb-2">
        Custom
      </h2>

      <p className="text-gray-500 mb-4">
        Multi-campus schools
      </p>

      <h1 className="text-4xl font-bold mb-1">
        Custom
      </h1>

      <p className="text-gray-500 mb-6">
        Contact Sales
      </p>

      <Button
        className="w-full"
        onClick={() =>
          window.open(
            "https://wa.me/2348148514595",
            "_blank"
          )
        }
      >
        Contact Sales
      </Button>
    </div>

  </div>
</div>

);
}
