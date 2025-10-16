import { FaSearch, FaBell } from "react-icons/fa";
// shadcn/ui
import { Button } from "@/components/ui/button"; // shadcn/ui
import { Input } from "@/components/ui/input"
interface HeaderProps {
  profilePicUrl?: string; // URL from backend
}

const Header = ({ profilePicUrl }: HeaderProps) => {
  return (
    <div className="flex justify-between items-center w-[calc(100%-70px)] h-12 bg-[#E9E6E1] border border-[#958E85] rounded-lg px-6 mt-5">
      {/* Search Bar */}
     <div className="relative w-[350px] h-9 ml-auto mr-40 flex items-center">
          <FaSearch className="absolute left-3 text-[#3F3124] w-4 h-4" />
          <Input
            type="text"
            placeholder="Search"
            className="pl-10 h-9 bg-[#f5ede5] text-[#3F3124] rounded-lg transition-all duration-200 focus:outline-none"
          />
     </div>

      <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="w-10 h-10 rounded-full p-0 border-2 border-[#795E46] text-[#3F3124] flex items-center justify-center"
          >
          <FaBell className="w-5 h-5" />
          </Button>
          <img
            src={profilePicUrl}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
      </div>
    </div>
  );
};

export default Header;
