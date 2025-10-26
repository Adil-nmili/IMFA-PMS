import React, { useState } from "react";
import Logo from "../../assets/hotelLogo.png";
import {Bed, LogOut,Wallet, Cog, CheckCircle, MenuSquare,CalendarCheck} from 'lucide-react'
import { Link } from "react-router-dom";
import { ACCUEIL, RESERVATIONS } from "@/router/router";

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  path?:string;
}
const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
 
  const topMenuItems: MenuItem[] = [
    { icon: MenuSquare, name: "Dashboard",path:ACCUEIL },
    { icon: CalendarCheck, name: "Reservation" ,path:RESERVATIONS},
    { icon: Bed, name: "Rooms" ,path:""},
    { icon: CheckCircle, name: "Checks",path:"" },
    { icon: Wallet, name: "Billing",path:"" },
  ];

  const bottomMenuItems: MenuItem[] = [
    { icon: Cog, name: "Settings",path:"" },
    { icon: LogOut, name: "Logout",path:"" },
  ];

  return (
<div className="pl-1 pt-2 "> 
    <div
      className={` flex flex-col h-[95vh] bg-[#3b2f2f] text-gray-100 p-3 rounded-2xl font-roboto transition-all duration-300 overflow-hidden ${isOpen ? "w-[200px]" : "w-[70px]"
        }`} onMouseEnter={() => setIsOpen(true)}
    onMouseLeave={() => setIsOpen(false)}
     >{/* Logo */}
    <li className="flex items-center justify-start mb-4">
        <div className="flex justify-start overflow-hidden w-[80px]">
          <img
            src={Logo}
            alt="Hotel Logo"
            className={`transition-all duration-300 ${
              isOpen ? "w-full" : "w-[70px]"
            }`}
          />
        </div>
      </li>
      {/*Top Menu*/}
    <ul className="flex flex-col">
        {topMenuItems.map(({ icon: Icon, name,path }, index) => (
       <li key={index}title={name}>
         <Link to={path || "#"}
         
            className="flex items-center justify-start gap-2 h-[50px] px-3 text-lg hover:bg-[#E9E6E1] hover:text-[#3b2f2f] rounded-md cursor-pointer transition-all duration-300 ml-0.5"
        >
            <Icon className={`${
                isOpen ? "text-2xl" : "text-1xl"
              }
              transition-all duration-300`}/>
            {isOpen && <span className="ml-2 text-[16px] whitespace-nowrap">{name}</span>}
            </Link>
          </li>
        ))}
    </ul>
      {/* Bottom Menu */}
      <ul className="flex flex-col mt-auto gap-4 pb-5">
        {bottomMenuItems.map(({ icon: Icon, name,path }, index) => (
          <li key={index}
            title={name}>
            <Link to ={path || "#"}
            className="flex items-center justify-start gap-2 h-[50px] px-3 text-lg hover:bg-[#E9E6E1] hover:text-[#3b2f2f] rounded-md cursor-pointer transition-all duration-300"
          >
          <Icon className={`${
                isOpen ? "text-2xl" : "text-1xl"
              }
              transition-all duration-300`}/>
            {isOpen && <span className="ml-2 text-[16px] whitespace-nowrap">{name}</span>}</Link>
          </li>
        ))}
    </ul>
    </div>
    </div>
  );
};

export default SideBar;
