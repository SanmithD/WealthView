import { Toaster } from "react-hot-toast"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <div className="h-screen bg-[#111418]" >
      <Toaster/> 
      <Dashboard/>
    </div>
  )
}

export default App