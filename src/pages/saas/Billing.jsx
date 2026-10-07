import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../components/ui/Button";

import { API_BASE_URL } from "../../services/api";

const API = `${API_BASE_URL}`;

export default function Billing() {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        `${API}/subscriptions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSubscription(res.data?.data || res.data);

    } catch (err) {
      console.error(
        "SUBSCRIPTION ERROR:",
        err.response?.data || err
      );
    } finally {
      setLoading(false);
    }
  };

  const upgradePlan = async (
    plan,
    amount,
    maxStudents
  ) => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await axios.post(
        `${API}/payments/initialize`,
        {
          plan,
          amount,
          maxStudents,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.location.href =
        res.data.authorization_url;

    } catch (err) {
      console.error(
        "PAYSTACK ERROR:",
        err.response?.data || err
      );

      alert(
        err.response?.data?.message ||
        "Payment initialization failed"
      );
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        Loading billing...
      </div>
    );
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Billing & Subscription
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <h2 className="text-xl font-bold mb-2">
          Current Plan
        </h2>

        <p>
          Plan:
          <strong>
            {" "}
            {subscription?.plan || "Trial"}
          </strong>
        </p>

        <p>
          Status:
          <strong>
            {" "}
            {subscription?.status || "Inactive"}
          </strong>
        </p>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">
            Starter
          </h2>

          <p className="text-3xl font-bold mt-4">
            ₦15,000
          </p>

          <Button
            className="mt-4"
            onClick={() =>
              upgradePlan(
                "Starter",
                15000,
                100
              )
            }
          >
            Upgrade
          </Button>
        </div>

        <div className="bg-blue-600 text-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">
            Growth
          </h2>

          <p className="text-3xl font-bold mt-4">
            ₦25,000
          </p>

          <Button
            className="mt-4"
            onClick={() =>
              upgradePlan(
                "Growth",
                25000,
                200
              )
            }
          >
            Upgrade
          </Button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">
            Premium
          </h2>

          <p className="text-3xl font-bold mt-4">
            ₦50,000
          </p>

          <Button
            className="mt-4"
            onClick={() =>
              upgradePlan(
                "Enterprise",
                50000,
                1000
              )
            }
          >
            Upgrade
          </Button>
        </div>

      </div>

    </div>
  );
}