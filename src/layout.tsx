import { Outlet } from "react-router-dom";
<<<<<<< HEAD
import Header from "./components/partials/header";
import SideBar from "./components/partials/sidebar";

const Layout = () => {
    return (
        <div className="flex h-screen">
            <aside>
                <SideBar />
            </aside>
            <div className="flex-1 flex flex-col">
                <main className="ml-4">
                    <Header />
                    {/* Page content */}
                    <div className="p-6">
                        <Outlet />
=======
import Header from "./app/layout-component/header";
import SideBar from "./app/layout-component/sidebar";
import React, { useState } from "react";


const Layout = () => {
         const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div className="flex h-screen ">
            <aside>
                <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
            </aside>
            <div className="flex-1 flex flex-col">
                <main className="ml-2">
                    <Header />
                    {/* Page content */}
                    <div className="my-2 w-[calc(100%-8px)] ">
                        <Outlet context={{ isOpen }} />
>>>>>>> Assia-Branch
                    </div>
                </main>
            </div>
        </div>
<<<<<<< HEAD
    );
}

export default Layout;
=======
    );}

export default Layout;
>>>>>>> Assia-Branch
