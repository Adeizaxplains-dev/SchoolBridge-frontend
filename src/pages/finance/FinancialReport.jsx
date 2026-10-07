import { useEffect, useState } from "react";
import API from "../../services/api";

import {
ResponsiveContainer,
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
PieChart,
Pie,
Cell,
} from "recharts";

export default function FinancialReport() {
const [report, setReport] = useState(null);
const [charts, setCharts] = useState(null);
const [classes, setClasses] = useState([]);

useEffect(() => {
loadReport();
}, []);

const loadReport = async () => {
try {
const res = await API.get(
"/analytics/financial-report"
);


  setReport(res.data.report);
  setCharts(res.data.charts);
  setClasses(res.data.classes || []);
} catch (err) {
  console.error(err);
}

};

if (!report) {
return ( <div className="p-8">
Loading Financial Report... </div>
);
}

const pieData = [
{
name: "Paid",
value: report.paidFees,
},
{
name: "Partial",
value: report.partialFees,
},
{
name: "Unpaid",
value: report.unpaidFees,
},
];

const COLORS = [
"#10B981",
"#F59E0B",
"#EF4444",
];

return ( <div className="p-6 space-y-8">

  <div>
    <h1 className="text-3xl font-bold">
      Financial Report
    </h1>

    <p className="text-gray-500">
      Revenue, collection performance,
      defaulters and class analytics
    </p>
  </div>

  {/* KPI CARDS */}

  <div className="grid md:grid-cols-4 gap-4">

    <div className="bg-white rounded-xl shadow p-5">
      <p className="text-gray-500">
        Total Revenue
      </p>

      <h2 className="text-3xl font-bold text-green-600">
        ₦{report.totalRevenue?.toLocaleString()}
      </h2>
    </div>

    <div className="bg-white rounded-xl shadow p-5">
      <p className="text-gray-500">
        Outstanding
      </p>

      <h2 className="text-3xl font-bold text-red-600">
        ₦{report.totalOutstanding?.toLocaleString()}
      </h2>
    </div>

    <div className="bg-white rounded-xl shadow p-5">
      <p className="text-gray-500">
        Students
      </p>

      <h2 className="text-3xl font-bold">
        {report.totalStudents}
      </h2>
    </div>

    <div className="bg-white rounded-xl shadow p-5">
      <p className="text-gray-500">
        Collection Rate
      </p>

      <h2 className="text-3xl font-bold text-blue-600">
        {report.collectionRate}%
      </h2>
    </div>

  </div>

  {/* EXECUTIVE SUMMARY */}

  <div className="grid md:grid-cols-2 gap-6">

    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="font-bold mb-3">
        Best Performing Class
      </h3>

      {report.bestClass ? (
        <>
          <p>
            {report.bestClass.class}
          </p>

          <p className="text-green-600 font-bold">
            {report.bestClass.collectionRate}%
          </p>
        </>
      ) : (
        "No Data"
      )}
    </div>

    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="font-bold mb-3">
        Lowest Performing Class
      </h3>

      {report.worstClass ? (
        <>
          <p>
            {report.worstClass.class}
          </p>

          <p className="text-red-600 font-bold">
            {report.worstClass.collectionRate}%
          </p>
        </>
      ) : (
        "No Data"
      )}
    </div>

  </div>

  {/* REVENUE CHART */}

  <div className="bg-white rounded-xl shadow p-6">

    <h2 className="font-bold mb-4">
      Revenue By Class
    </h2>

    <ResponsiveContainer
      width="100%"
      height={350}
    >
      <BarChart
        data={
          charts?.revenueChart || []
        }
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="class" />

        <YAxis />

        <Tooltip />

        <Bar dataKey="revenue" />
      </BarChart>
    </ResponsiveContainer>

  </div>

  {/* OUTSTANDING CHART */}

  <div className="bg-white rounded-xl shadow p-6">

    <h2 className="font-bold mb-4">
      Outstanding Fees By Class
    </h2>

    <ResponsiveContainer
      width="100%"
      height={350}
    >
      <BarChart
        data={
          charts?.outstandingChart ||
          []
        }
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="class" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="outstanding"
        />
      </BarChart>
    </ResponsiveContainer>

  </div>

  {/* PIE CHART */}

  <div className="bg-white rounded-xl shadow p-6">

    <h2 className="font-bold mb-4">
      Fee Status Breakdown
    </h2>

    <ResponsiveContainer
      width="100%"
      height={350}
    >
      <PieChart>

        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          outerRadius={120}
          label
        >
          {pieData.map(
            (_, index) => (
              <Cell
                key={index}
                fill={
                  COLORS[index]
                }
              />
            )
          )}
        </Pie>

        <Tooltip />

      </PieChart>
    </ResponsiveContainer>

  </div>

  {/* CLASS TABLE */}

  <div className="bg-white rounded-xl shadow p-6">

    <h2 className="font-bold mb-4">
      Class Performance
    </h2>

    <div className="overflow-auto">

      <table className="w-full">

        <thead>
          <tr className="border-b">
            <th>Class</th>
            <th>Expected</th>
            <th>Collected</th>
            <th>Outstanding</th>
            <th>Defaulters</th>
            <th>Rate</th>
          </tr>
        </thead>

        <tbody>
          {classes.map((item) => (
            <tr
              key={item.class}
              className="border-b"
            >
              <td>{item.class}</td>

              <td>
                ₦
                {item.expected?.toLocaleString()}
              </td>

              <td>
                ₦
                {item.collected?.toLocaleString()}
              </td>

              <td>
                ₦
                {item.outstanding?.toLocaleString()}
              </td>

              <td>
                {item.defaulters}
              </td>

              <td>
                {
                  item.collectionRate
                }
                %
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>

  </div>

</div>

);
}
