import { useEffect } from "react";
import { UseStockStore } from "../store/UseStockStore";

function Summary() {
  const { summary, fetchSummary } = UseStockStore();

  useEffect(() => {
    fetchSummary();
  }, []);

  if (!summary || !summary.topPerformer || !summary.worstPerformer) {
    return <div className="text-center py-10">Loading summary...</div>;
  }

  const {
    topPerformer,
    worstPerformer,
    diversificationScore,
    riskLevel,
  } = summary;

  const Card = ({ title, name, symbol, gainPercent, gainColor }) => (
    <div className={`p-4 rounded-xl shadow-md border w-full`}>
      <h3 className="text-sm mb-1">{title}</h3>
      <p className="text-lg font-semibold">{name} ({symbol})</p>
      <p className={`text-sm font-medium ${gainColor}`}>
        {gainPercent >= 0 ? "+" : ""}
        {gainPercent}%
      </p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <h2 className="text-2xl font-bold text-white">
        Performance Summary
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card
          title="Best Performing Stock"
          name={topPerformer.name}
          symbol={topPerformer.symbol}
          gainPercent={topPerformer.gainPercent}
          gainColor="text-green-600"
        />
        <Card
          title="Worst Performing Stock"
          name={worstPerformer.name}
          symbol={worstPerformer.symbol}
          gainPercent={worstPerformer.gainPercent}
          gainColor="text-red-600"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-4 rounded-xl shadow-md border">
          <h3 className="text-sm  mb-1">Diversification Score</h3>
          <p className="text-xl font-bold text-blue-600">{diversificationScore}/10</p>
        </div>
        <div className="p-4 rounded-xl shadow-md border">
          <h3 className="text-sm mb-1">Risk Level</h3>
          <p className="text-xl font-bold text-yellow-600">{riskLevel}</p>
        </div>
      </div>
    </div>
  );
}

export default Summary;
