import { Search, Bell, ToggleRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  profilePicUrl?: string; 
}

const Header = ({ profilePicUrl }: HeaderProps) => {
  return (
    <div className="flex justify-between items-center w-[calc(100%-70px)] h-12 bg-[#E9E6E1] border border-[#958E85] rounded-lg px-6 mt-2">
      {/* searshbar */}
      <div className="relative w-[350px] h-9 flex items-center">
        <Search className="absolute left-3 text-[#3F3124] w-4 h-4" />
        <Input
          type="text"
          placeholder="Search"
          className="pl-10 h-9 bg-[#f5ede5] text-[#3F3124] rounded-lg transition-all duration-200 focus:outline-none"
        />
      </div>

      {/*right side*/}
      <div className="flex items-center gap-4">
        {/* Darkmodetoggle*/}
        <Button
          variant="outline"
          className="w-10 h-10 rounded-full p-0 border-2 border-[#795E46] text-[#3F3124] flex items-center justify-center hover:bg-[#3F3124] hover:text-[#E9E6E1] transition-colors duration-200"
        >
          <ToggleRight className="w-5 h-5" />
        </Button>

        {/* notificationButton */}
        <Button
          variant="outline"
          className="w-10 h-10 rounded-full p-0 border-2 border-[#795E46] text-[#3F3124] flex items-center justify-center hover:bg-[#3F3124] hover:text-[#E9E6E1] transition-colors duration-200"
        >
          <Bell className="w-5 h-5" />
        </Button>

        {/*profilepicture*/}
        <img
          src={profilePicUrl || "https://via.placeholder.com/40"}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover border border-[#795E46]"
        />
      </div>
    </div>
  );
};

export default Header;
