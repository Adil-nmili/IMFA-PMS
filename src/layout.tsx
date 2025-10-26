import { Outlet } from "react-router-dom";
import Header from "./components/partials/header";
import SideBar from "./components/partials/sidebar";

const Layout = () => {
    return (
        <div className="flex h-screen ">
            <aside>
                <SideBar />
            </aside>
            <div className="flex-1 flex flex-col ">
                <main className="ml-4">
                    <Header />
                    {/* Page content */}
                    <div className="p-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Layout;