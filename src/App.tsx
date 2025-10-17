import { Routes, Route } from "react-router-dom";
import SideBar from "./layoutComponent/sidebar"
import Header from "./layoutComponent/header"
import Dashboard from "./pages/Dashboard";
import ReservationPage from "./pages/reservation";

function App() {
return (
<div className="flex h-screen">
    <aside>
      <SideBar/>
    </aside>
  <div className="flex-1 flex flex-col">
    <main className="ml-4"> 
            <Header />
        {/* Page content */}  
       <div className="p-6">
           <Routes>
              <Route path="/" element={<Dashboard />} />
               <Route path="/reservation" element={<ReservationPage />} />
            </Routes>
          </div> 
        </main> 
    </div>
  </div>
  );
}



export default App
