import React, { useEffect, useState, type JSX } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// import managers from "@/constants/managers.json";
// import admins from "@/constants/admins.json";
// import receptionists from "@/constants/receptionists.json";
import type { UserType } from "@/types/UserType";
import UserCard from "@/components/partials/cards/userCard";
import type { Props } from "@/types/propsType";
import { getAllUsers } from "@/api/authapi";



const RolesSlider: React.FC<Props> = ({ setSelectedUser }) => {

  const [rolesUsers,setRolesUsers] = useState<UserType| any>([]);

  const roleIds = {
    admin: 3,
    manager: 1,
    receptionist: 2,
  };

  const getUsers = async()=>{
    const response = await getAllUsers();
    console.log(response);
    setRolesUsers(response);  
  }
  useEffect(()=>{
    getUsers();
  },[])

  const [currentIndex, setCurrentIndex] = useState({
    manager: 0,
    admin: 0,
    receptionist: 0,
  });
  const [currentRole, setCurrentRole] = useState<"manager" | "admin" | "receptionist">("manager");
  // here rolesUsers is an int of the "role_id" column from the users table 
  const roles: Record<"manager" | "admin" | "receptionist", UserType[]> = {
    // manager: rolesUsers?.filter((ru : any)=>(ru?.role).toLowerCase() === "manager"),
    // admin: rolesUsers?.filter((ru : any)=>(ru?.role).toLowerCase() === "admin"),
    // receptionist: rolesUsers?.filter((ru:any)=>(ru?.role).toLowerCase() === "receptioniste"),
    manager: rolesUsers?.filter((ru : any)=>(ru?.role_id) === roleIds.manager),
    admin: rolesUsers?.filter((ru : any)=>(ru?.role_id) ===  roleIds.admin),
    receptionist: rolesUsers?.filter((ru:any)=>(ru?.role_id) === roleIds.receptionist),
  };

  const handleSlide = (
    role: "manager" | "admin" | "receptionist",
    direction: "next" | "prev",
    dataLength: number
  ): void => {
    setCurrentIndex((prev) => {
      const newIndex =
        direction === "next"
          ? (prev[role] + 1) % dataLength
          : (prev[role] - 1 + dataLength) % dataLength;
      return { ...prev, [role]: newIndex };
    });
  };



  const tabClass =
    "h-10 bg-gray-200 data-[state=active]:bg-[#967E62] data-[state=active]:text-white rounded-md transition-colors";

  return (
    <div className="w-full max-w-3xl mx-auto py-10 overflow-hidden">
      <h2 className="text-xl md:text-3xl font-bold text-center mb-12">Bienvenue dans votre espace</h2>

      <Tabs defaultValue="managers" className="w-full flex flex-col gap-6">
        <TabsList className="grid grid-cols-3 w-[90%] mx-auto h-12 mb-6 gap-2">
          <TabsTrigger value="managers" className={tabClass} onClick={() => setCurrentRole("manager")}>
            Managers
          </TabsTrigger>
          <TabsTrigger value="admins" className={tabClass} onClick={() => setCurrentRole("admin")}>
            Admins
          </TabsTrigger>
          <TabsTrigger value="receptionists" className={tabClass} onClick={() => setCurrentRole("receptionist")}>
            Receptionists
          </TabsTrigger>
        </TabsList>

        {(["manager", "admin", "receptionist"] as const).map((role) => (
          <TabsContent key={role} value={role + "s"}>
          <div className="hidden md:flex items-center justify-center gap-4 transition-all duration-3000">
          {roles[currentRole]?.length > 0 && (() => {
            const roleUsers = roles[currentRole];
            const len = roleUsers.length;

            if (len <= 2) {
              return roleUsers.map((user) => (
                <motion.div
                  key={user?.id}
                  animate={{ scale: 1.1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <UserCard selectedUser={user} setSelectedUser={setSelectedUser} scaleCard={1.1} />
                </motion.div>
              ));
            }

            return [-1, 0, 1].map((offset) => {
              const index = (currentIndex[currentRole] + offset + len) % len;
              const user = roleUsers[index];
              const scale = offset === 0 ? 1.1 : 0.9;
              const opacity = offset === 0 ? 1 : 0.6;

              return (
                <motion.div
                  key={user?.id}
                  animate={{ scale, opacity }}
                  transition={{ duration: 0.4 }}
                >
                  <UserCard selectedUser={user} setSelectedUser={setSelectedUser} scaleCard={scale} />
                </motion.div>
              );
            });
          })()}

          </div>
          <div className="md:hidden flex items-center justify-center gap-4">
                  <UserCard  selectedUser={roles[currentRole][currentIndex[currentRole]]} setSelectedUser={setSelectedUser}  scaleCard={1} />
          </div>
          </TabsContent>
        ))}

        <div className="w-[50%] mx-auto flex items-center justify-center gap-4 mt-4">
          <Button
            onClick={() => handleSlide(currentRole, "prev", roles[currentRole].length)}
            className="p-2 bg-[#3F3124] rounded-full hover:bg-[#967E62]"
          >
            <ChevronLeft />
          </Button>
          <Button
            onClick={() => handleSlide(currentRole, "next", roles[currentRole].length)}
            className="p-2 bg-[#3F3124] rounded-full hover:bg-[#967E62]"
          >
            <ChevronRight />
          </Button>
        </div>
      </Tabs>
    </div>
  );
};

export default RolesSlider;
