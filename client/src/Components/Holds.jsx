import { ArrowDown, ArrowUp } from 'lucide-react';
import { useEffect, useState } from "react";
import { UseStockStore } from "../store/UseStockStore";

function Holds() {
  const { fetchHoldings, holdings } = UseStockStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); 

  useEffect(() => {
    fetchHoldings();
  }, []);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Filtered list based on search
  let filteredHoldings = holdings?.filter((stock) => {
    const query = searchQuery.toLowerCase();
    return (
      stock.Symbol?.toLowerCase().includes(query) ||
      stock["Company Name"]?.toLowerCase().includes(query)
    );
  });

  // Sort based on Gain/Loss %
  filteredHoldings = filteredHoldings?.sort((a, b) => {
    const aPercent = Number(a["Gain/Loss %"]);
    const bPercent = Number(b["Gain/Loss %"]);
    return sortOrder === "asc" ? aPercent - bPercent : bPercent - aPercent;
  });

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">📄 Holdings</h2>
        <input
          type="text"
          placeholder="Search by symbol or company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-base-300 bg-base-100 shadow-sm">
        <table className="table table-zebra w-full text-sm">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>#</th>
              <th>Symbol</th>
              <th>Company</th>
              <th>Sector</th>
              <th>Qty</th>
              <th>Avg Price</th>
              <th>Current Price</th>
              <th>Gain/Loss (₹)</th>
              <th
                className="cursor-pointer select-none flex items-center "
                onClick={toggleSortOrder}
                title="Sort by Gain/Loss %"
              >
                Gain/Loss (%)
                <span className="ml-1 text-xs">
                  {sortOrder === "asc" ? <ArrowDown className='text-red-500' /> : <ArrowUp className='text-green-500' />}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredHoldings?.length > 0 ? (
              filteredHoldings.map((stock, index) => (
                <tr key={stock.Symbol}>
                  <th>{index + 1}</th>
                  <td>{stock.Symbol}</td>
                  <td className="max-w-[180px] truncate">{stock["Company Name"]}</td>
                  <td>{stock.Sector}</td>
                  <td>{stock.Quantity}</td>
                  <td>₹{stock["Avg Price ₹"]}</td>
                  <td>₹{stock["Current Price (₹)"]}</td>
                  <td
                    className={`font-medium ${
                      stock["Gain/Loss (₹)"] >= 0 ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    ₹{Number(stock["Gain/Loss (₹)"]).toLocaleString()}
                  </td>
                  <td
                    className={`font-medium ${
                      stock["Gain/Loss %"] >= 0 ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {(Number(stock["Gain/Loss %"]) * 100).toFixed(2)}%
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-gray-500 py-4">
                  No holdings match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Holds;
