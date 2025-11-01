import { Outlet } from "react-router-dom";
import Header from "./app/layout-component/header";
import SideBar from "./app/layout-component/sidebar";

const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 flex flex-col ">
        <main className="ml-4">
          <Header />
          {/* Page content */}
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
      <aside>
        <SideBar />
      </aside>
    </div>
  );
};

export default Layout;
