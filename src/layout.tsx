import { Outlet } from "react-router-dom";
import Header from "./app/layout-component/header";
import SideBar from "./app/layout-component/sidebar";
import ChatBot from "./components/partials/chatbot/ChatBot";

const Layout = () => {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-neutral-50 dark:bg-neutral-900">
            {/* Sidebar */}
            <aside className="z-20 hidden md:block h-full shrink-0">
                <SideBar />
            </aside>

            {/* Main Content Wrapper */}
            <div className="flex flex-col flex-1 h-full overflow-hidden relative">
                {/* Header */}
                <header className="z-10 w-full shrink-0">
                    <Header />
                </header>

                {/* Scrollable Page Content */}
                <main className="flex-1 overflow-y-auto scroll-smooth">
                    <div className="container mx-auto p-6 max-w-7xl">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Chatbot - Available on all pages */}
            <ChatBot />
        </div>
    );
}

export default Layout;