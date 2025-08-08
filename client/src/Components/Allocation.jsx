import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { UseStockStore } from "../store/UseStockStore";

ChartJS.register(ArcElement, Tooltip, Legend);

function Allocation() {
  const { fetchAllocation, allocation } = UseStockStore();
  const [activeTab, setActiveTab] = useState("marketCap");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await fetchAllocation();
      setIsLoading(false);
    };
    loadData();
  }, []);

  const getChartData = (dataObject, colorPalette) => {
    if (!dataObject) return null;

    const labels = Object.keys(dataObject);
    const data = labels.map((label) => dataObject[label].value);
    const total = data.reduce((acc, val) => acc + val, 0);

    const details = labels.map((label, index) => ({
      label,
      value: dataObject[label].value,
      percentage: Math.round((dataObject[label].value / total) * 100),
      color: colorPalette[index % colorPalette.length],
    }));

    return {
      labels,
      datasets: [
        {
          label: "Allocation",
          data,
          backgroundColor: details.map((d) => d.color),
          borderWidth: 0,
        },
      ],
      details,
    };
  };

  const marketCapData = getChartData(allocation?.byMarketCap, [
    "#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"
  ]);

  const sectorData = getChartData(allocation?.bySector, [
    "#FBBF24", "#3B82F6", "#EF4444", "#10B981", "#8B5CF6",
    "#F472B6", "#6B7280", "#6366F1", "#14B8A6"
  ]);

  const chartOptions = {
    cutout: "65%",
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = Math.round((value / context.dataset.data.reduce((a, b) => a + b, 0)) * 100);
            return `${label}: ${percentage}% (₹${value.toLocaleString()})`;
          },
        },
        displayColors: false,
        backgroundColor: "#1F2937",
        titleFont: { size: 14, weight: "600" },
        bodyFont: { size: 13 },
        padding: 12,
        cornerRadius: 8,
      },
    },
  };

  const activeData = activeTab === "marketCap" ? marketCapData : sectorData;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="bg-[#283039] rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Portfolio Allocation</h1>
          <div className="mt-4 md:mt-0 flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("marketCap")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "marketCap"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              Market Cap
            </button>
            <button
              onClick={() => setActiveTab("sector")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "sector"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              Sector
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600">Loading allocation data...</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Chart */}
            <div className="w-full lg:w-2/5 bg-[#283039] border rounded-xl shadow-md p-6 flex flex-col items-center">
              <div className="relative w-full max-w-xs h-64">
                {activeData && <Doughnut data={activeData} options={chartOptions} />}
              </div>
            </div>

            {/* Details */}
            <div className="w-full lg:w-3/5">
              <div className="bg-[#283039] rounded-xl shadow-md divide-y max-h-[340px] overflow-y-auto">
                {activeData?.details.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 hover:bg-gray-500 transition"
                  >
                    <div className="flex items-center w-1/2">
                      <div
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-white font-medium">{item.label}</span>
                    </div>
                    <div className="w-1/4 text-right font-medium text-white">
                      ₹{item.value.toLocaleString()}
                    </div>
                    <div className="w-1/4 text-right">
                      <span className="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Allocation;
