import { Outlet } from "react-router-dom";
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
                    </div>
                </main>
            </div>
        </div>
    );}

export default Layout;
