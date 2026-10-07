import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

export default function RevenueLineChart({
  data = [],
}) {
  const chartData = {
    labels: data.map((item) => item.month),

    datasets: [
      {
        label: "Revenue",

        data: data.map(
          (item) => item.amount
        ),

        borderColor: "#10b981",

        backgroundColor:
          "rgba(16,185,129,.12)",

        borderWidth: 4,

        tension: 0.4,

        fill: true,

        pointRadius: 5,

        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        mode: "index",
        intersect: false,
      },
    },

    interaction: {
      intersect: false,
      mode: "index",
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
      },

      y: {
        beginAtZero: true,

        ticks: {
          callback(value) {
            return (
              "₦" +
              (
                value / 1000000
              ).toFixed(1) +
              "M"
            );
          },
        },
      },
    },
  };

  return (
    <div className="h-80">
      <Line
        data={chartData}
        options={options}
      />
    </div>
  );
}