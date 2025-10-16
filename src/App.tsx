import SideBar from "./layoutComponent/sidebar"
import Header from "./layoutComponent/header"
function App() {
return (
  <div className="flex h-screen">
    <aside>
      <SideBar/>
    </aside>
    <div className="flex-1 flex flex-col">
        <main className="ml-4"> 
            <Header />
         </main>
          {/* Page content */}
        <div className="p-6">
            Page Content
        </div>
      </div>
  </div>
  );
}



export default App
