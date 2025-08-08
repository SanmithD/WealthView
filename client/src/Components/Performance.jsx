import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip } from "chart.js";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { UseStockStore } from "../store/UseStockStore";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

function Performance() {
  const { fetchPerformance, performance } = UseStockStore();

  useEffect(() => {
    fetchPerformance();
  }, []);

  if (!performance || !performance.timeline || !performance.returns) {
    return <div className="text-center py-10">Loading performance data...</div>;
  }

  const { timeline, returns } = performance;

  const chartData = {
    labels: timeline.map((entry) => entry.date),
    datasets: [
      {
        label: "Portfolio",
        data: timeline.map((entry) => entry.portfolio),
        borderColor: "#3B82F6",
        backgroundColor: "#3B82F6",
        tension: 0.3,
        fill: false,
      },
      {
        label: "Nifty 50",
        data: timeline.map((entry) => entry.nifty50),
        borderColor: "#10B981",
        backgroundColor: "#10B981",
        tension: 0.3,
        fill: false,
      },
      {
        label: "Gold",
        data: timeline.map((entry) => entry.gold),
        borderColor: "#F59E0B",
        backgroundColor: "#F59E0B",
        tension: 0.3,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#4B5563",
          font: { size: 12 },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: ₹${context.formattedValue}`,
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          color: "#6B7280",
          callback: (value) => `₹${value.toLocaleString()}`,
        },
      },
      x: {
        ticks: { color: "#6B7280" },
      },
    },
  };

  const renderReturnCard = (label, value, color) => (
    <div className="text-sm text-center p-3 border rounded-xl w-28 shadow-sm">
      <h4 className="font-medium text-gray-600">{label}</h4>
      <p className={`text-lg font-bold ${color}`}>{value}%</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Performance Comparison</h2>

      <div className=" rounded-xl shadow-md p-6 mb-10">
        <Line data={chartData} options={chartOptions} height={100} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-4 rounded-xl border border-blue-100">
          <h3 className="font-semibold text-blue-700 mb-3 text-center">Portfolio</h3>
          <div className="flex justify-center gap-4">
            {renderReturnCard("1M", returns.portfolio["1month"], "text-blue-600")}
            {renderReturnCard("3M", returns.portfolio["3months"], "text-blue-600")}
            {renderReturnCard("1Y", returns.portfolio["1year"], "text-blue-600")}
          </div>
        </div>

        {/* Nifty 50 */}
        <div className="p-4 rounded-xl border border-green-100">
          <h3 className="font-semibold text-green-700 mb-3 text-center">Nifty 50</h3>
          <div className="flex justify-center gap-4">
            {renderReturnCard("1M", returns.nifty50["1month"], "text-green-600")}
            {renderReturnCard("3M", returns.nifty50["3months"], "text-green-600")}
            {renderReturnCard("1Y", returns.nifty50["1year"], "text-green-600")}
          </div>
        </div>

        {/* Gold */}
        <div className=" p-4 rounded-xl border border-yellow-100">
          <h3 className="font-semibold text-yellow-700 mb-3 text-center">Gold</h3>
          <div className="flex justify-center gap-4">
            {renderReturnCard("1M", returns.gold["1month"], "text-yellow-600")}
            {renderReturnCard("3M", returns.gold["3months"], "text-yellow-600")}
            {renderReturnCard("1Y", returns.gold["1year"], "text-yellow-600")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Performance;
