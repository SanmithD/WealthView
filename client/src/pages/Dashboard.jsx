import { useEffect } from "react";
import Allocation from "../Components/Allocation";
import TotalValues from "../Components/TotalValues";
import { UseStockStore } from "../store/UseStockStore";

function Dashboard() {
    const { fetchHoldings } = UseStockStore();

    useEffect(()=>{
        fetchHoldings()
    },[]);
  return (
    <div className="h-screen mx-auto p-4 mb-6" >
        <div className="w-full p-6" >
            <TotalValues/>
            <Allocation/>
        </div>
    </div>
  )
}

export default Dashboard