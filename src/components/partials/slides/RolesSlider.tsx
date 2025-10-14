import React, { useState, type JSX } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import managers from "@/constants/managers.json";
import admins from "@/constants/admins.json";
import receptionists from "@/constants/receptionists.json";
import type { UserType } from "@/types/UserType";

interface Props {
  setSelectedUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}

const RolesSlider: React.FC<Props> = ({ setSelectedUser }) => {
  const [currentIndex, setCurrentIndex] = useState({
    manager: 0,
    admin: 0,
    receptionist: 0,
  });
  const [currentRole, setCurrentRole] = useState<"manager" | "admin" | "receptionist">("manager");

  const roles: Record<"manager" | "admin" | "receptionist", UserType[]> = {
    manager: managers,
    admin: admins,
    receptionist: receptionists,
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

  const renderCard = (user: UserType, scale: number): JSX.Element => (
    <motion.div
      key={user.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, scale }}
      transition={{ duration: 0.4 }}
      onClick={() => setSelectedUser(user)}
      className="cursor-pointer hover:shadow-xl"
    >
      <Card className="w-54 mx-auto overflow-hidden">
        <CardContent className="flex flex-col items-center p-4 space-y-3">
          <img
            src={user.image}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-primary/30"
          />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{user.name}</h3>
          <p className="text-sm text-gray-500 capitalize">{user.role}</p>
        </CardContent>
      </Card>
    </motion.div>
  );

  const tabClass =
    "h-10 bg-gray-200 data-[state=active]:bg-[#967E62] data-[state=active]:text-white rounded-md transition-colors";

  return (
    <div className="w-full max-w-3xl mx-auto py-10">
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
<div className="flex items-center justify-center gap-4">
  {[-1, 0, 1].map((offset) => {
    const roleUsers = roles[currentRole];
    const len = roleUsers.length;

    // circular index calculation
    const index = (currentIndex[currentRole] + offset + len) % len;
    const user = roleUsers[index];

    // scale & opacity: center card bigger
    const scale = offset === 0 ? 1.1 : 0.9;
    const opacity = offset === 0 ? 1 : 0.6;

    return (
      <motion.div
        key={user.id}
        animate={{ scale, opacity }}
        transition={{ duration: 0.4 }}
      >
        {renderCard(user, scale)}
      </motion.div>
    );
  })}
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
