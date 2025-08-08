import { useEffect } from "react";
import Allocation from "../Components/Allocation";
import Holds from "../Components/Holds";
import Performance from "../Components/Performance";
import Summary from "../Components/Summary";
import TotalValues from "../Components/TotalValues";
import { UseStockStore } from "../store/UseStockStore";

function Dashboard() {
    const { fetchHoldings } = UseStockStore();

    useEffect(()=>{
        fetchHoldings()
    },[]);
  return (
    <div className="h-screen mx-auto p-4 mb-6 bg-[#111418]" >
        <div className="w-full p-6" >
            <TotalValues/>
            <Allocation/>
            <Holds/>
            <Performance/>
            <Summary/>
        </div>
    </div>
  )
}

export default Dashboard