import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

import { getFeeStats } from "../../services/feeService";

export default function FeesDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalExpected: 0,
    totalCollected: 0,
    outstanding: 0,
    defaulters: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);

      const res = await getFeeStats();

      // ✅ DEBUG SAFE CHECK
      console.log("FEE STATS RESPONSE:", res);

      // 🔥 FIX: backend returns { success, data }
      const data = res?.data;

      setStats({
        totalExpected: data?.totalExpected || 0,
        totalCollected: data?.totalCollected || 0,
        outstanding: data?.outstanding || 0,
        defaulters: data?.defaulters || 0,
      });

    } catch (error) {
      console.error("Failed to load fee stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatMoney = (value) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(value || 0);
  };

  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        Loading fee dashboard...
      </div>
    );
  }

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            Fee Management
          </h1>
          <p className="text-gray-500">
            Track collections and outstanding balances
          </p>
        </div>

        <Button onClick={() => navigate("/fees/create")}>
          + Create Fee
        </Button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <Card title="Total Expected" value={formatMoney(stats.totalExpected)} />
        <Card title="Collected" value={formatMoney(stats.totalCollected)} />
        <Card title="Outstanding" value={formatMoney(stats.outstanding)} />
        <Card title="Defaulters" value={stats.defaulters} />

      </div>

      {/* PROGRESS */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">

        <h2 className="font-semibold mb-4">
          Collection Overview
        </h2>

        <div className="flex justify-between mb-2">
          <span>Collection Progress</span>

          <span>
            {stats.totalExpected > 0
              ? Math.round(
                  (stats.totalCollected / stats.totalExpected) * 100
                )
              : 0}
            %
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-600 h-3 rounded-full"
            style={{
              width: `${stats.totalExpected > 0
                ? (stats.totalCollected / stats.totalExpected) * 100
                : 0
              }%`,
            }}
          />
        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="grid md:grid-cols-3 gap-4">

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-semibold">Create Fee</h3>
          <p className="text-sm text-gray-500 mt-1">
            Assign fees to students
          </p>

          <Button className="mt-4" onClick={() => navigate("/fees/create")}>
            Create
          </Button>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-semibold">Defaulters</h3>
          <p className="text-sm text-gray-500 mt-1">
            View unpaid balances
          </p>

          <Button className="mt-4" onClick={() => navigate("/fees/defaulters")}>
            View
          </Button>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-semibold">Payments</h3>
          <p className="text-sm text-gray-500 mt-1">
            Record payments
          </p>

          <Button className="mt-4" onClick={() => navigate("/fees/payments")}>
            Manage
          </Button>
        </div>

      </div>

    </div>
  );
}