import { useEffect } from "react";
import { UseStockStore } from "../store/UseStockStore";

function TotalValues() {
  const { holdings, fetchHoldings } = UseStockStore();

  useEffect(() => {
    fetchHoldings();
  }, []);

  let totalWealth = 0;
  let gainLoss = 0;

  if (Array.isArray(holdings) && holdings.length > 0) {
    holdings.forEach((stock) => {
      totalWealth += Number(stock["Value ₹"]) || 0;
      gainLoss += Number(stock["Gain/Loss (₹)"]) || 0;
    });
  }

  const gainLossPercent =
    totalWealth > 0
      ? ((gainLoss / (totalWealth - gainLoss)) * 100).toFixed(2)
      : 0;

  return (
    <div className="p-6 shadow rounded-xl w-full max-w-6xl mx-auto text-center">    
    <h1 className="text-left text-3xl mb-3 font-bold tracking-wide" >Portfolio Overview</h1>
      {Array.isArray(holdings) && holdings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col items-start bg-[#283039] text-white rounded-md px-6 py-4">
            <p className="text-lg font-medium">Total Portfolio Value:</p>
            <p className="text-2xl font-bold">₹{totalWealth.toLocaleString()}</p>
          </div>

          <div className="flex flex-col items-start bg-[#283039] text-white rounded-md px-6 py-4">
            <p className="text-lg font-medium">Total Gain/Loss:</p>
            <p className={`text-2xl font-bold ${gainLoss >= 0 ? "text-green-400" : "text-red-400"}`}>
              ₹{gainLoss.toLocaleString()} ({gainLossPercent}%)
            </p>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">No investments found.</p>
      )}
    </div>
  );
}

export default TotalValues;
