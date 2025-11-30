import React, { useState } from "react";
import Logo from "../../assets/hotelLogo.png";
import {
  Bed,
  LogOut,
  Wallet,
  Cog,
  CheckCircle,
  MenuSquare,
  CalendarCheck,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ACCUEIL, RESERVATIONS, ROOMS } from "@/router/router";
import { logout } from "@/api/authapi";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  path?: string;
  action?: () => void;
}

const SideBar = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const topMenuItems: MenuItem[] = [
    { icon: LayoutDashboard, name: "Dashboard", path: ACCUEIL },
    { icon: CalendarCheck, name: "Reservations", path: RESERVATIONS },
    { icon: Bed, name: "Rooms", path: ROOMS },
    { icon: CheckCircle, name: "Checks", path: "/checks" },
    { icon: Wallet, name: "Billing", path: "/billing" },
    { icon: Users, name: "Guests", path: "/guests" },
  ];

  const bottomMenuItems: MenuItem[] = [
    { icon: Cog, name: "Settings", path: "/settings" },
    { icon: LogOut, name: "Logout", action: () => setShowLogoutDialog(true) },
  ];

  const sidebarWidth = isHovered ? "w-[240px]" : "w-[60px]";

  return (
    <>
      <div
        className={cn(
          "flex flex-col h-full bg-[#2C241B] text-white transition-all duration-300 ease-in-out shadow-xl z-50 relative",
          sidebarWidth
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-center border-b border-white/10 mb-4">
          <div className="flex items-center justify-center overflow-hidden w-full px-4">
            <img
              src={Logo}
              alt="Hotel Logo"
              className={cn(
                "transition-all duration-300 object-contain",
                isHovered ? "h-12" : "h-10"
              )}
            />
            {isHovered && (
              <span className="ml-3 font-serif text-xl font-bold tracking-wider text-[#E9E6E1] whitespace-nowrap opacity-0 animate-in fade-in duration-300 fill-mode-forwards" style={{ animationDelay: "100ms" }}>
                IMFA PMS
              </span>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-3 space-y-2 overflow-y-auto scrollbar-hide">
          {topMenuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path || "#"}
                className={cn(
                  "flex items-center  rounded-lg transition-all duration-200 group relative",
                  isActive
                    ? "bg-[#E9E6E1] text-[#2C241B] font-medium shadow-md"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                )}
              >
                <Button variant="ghost" className="w-full justify-start">
                <item.icon
                  className={cn(
                    "w-6 h-6  transition-colors m-0 p-0",
                    isActive ? "text-[#2C241B]" : "text-gray-400"
                  )}
                />
                <span
                  className={cn(
                    " whitespace-nowrap transition-all duration-300 origin-left",
                    isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 hidden"
                  )}
                >
                  {item.name}
                </span>

                {/* Tooltip for collapsed state */}
                {!isHovered && (
                  <div className="absolute left-full py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
                    {item.name}
                  </div>
                )}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Menu */}
        <div className=" border-t border-white/10 mt-auto">
          {bottomMenuItems.map((item, index) => (
            <Button
              key={index}
              onClick={item.action || (() => navigate(item.path || "#"))}
              className={cn(
                "flex items-center w-full h-12  rounded-lg transition-all duration-200 group relative mb-1",
                "text-gray-300 hover:bg-red-500/10 hover:text-red-400"
              )}
              variant="ghost"
            >
              <item.icon className="w-6 h-6 " />
              <span 
                className={cn(
                  " whitespace-nowrap transition-all duration-300",
                  isHovered ? "opacity-100" : "opacity-0 hidden"
                )}
              >
                {item.name}
              </span>
              {!isHovered && (
                <div className="absolute left-full  py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
                  {item.name}
                </div>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be redirected to the login page and will need to sign in again to access the dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout} className="bg-destructive text-white hover:bg-destructive/90">
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SideBar;
