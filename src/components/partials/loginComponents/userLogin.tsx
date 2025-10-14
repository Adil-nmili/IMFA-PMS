import type { UserType } from "@/types/UserType"
import { useState, type JSX } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import CodePin from "./CodePin";

function UserLogin ({SelectedUser}:{SelectedUser : UserType | null}) {
    const [loginMethod,setLoginMethod] = useState<"code-pin"|"badge-nfc">("code-pin");
    
    const renderCard = (user: UserType): JSX.Element => (
    <motion.div
      key={user.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      >
      <Card className="w-80 mx-auto bg-transparent text-white border-none shadow-none overflow-hidden">
        <CardContent className="flex flex-col items-center p-4 space-y-0">
          <img
            src={user?.image}
            alt={user?.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-primary/30"
          />
          <h3 className="text-lg font-semibold text-white">{user?.name}</h3>
          <p className="text-sm text-[#D9DEE6] capitalize">{user?.role}</p>
        </CardContent>
      </Card>
    </motion.div>
  );

  const tabClass =
    "h-10 bg-[#EFEEEE] data-[state=active]:bg-[#3F3124] data-[state=active]:text-white  transition-colors cursor-pointer text-sm ";
  return (
    <div className="flex items-center flex-col  h-screen">
      <div >
        {renderCard(SelectedUser as UserType)}
      </div>
      <div className="w-full">
        <Tabs defaultValue="code-pin" className="w-full flex flex-col gap-6">
          <TabsList className="grid grid-cols-2 mb-4 w-[90%] mx-auto h-12  ">
            <TabsTrigger value="code-pin" className={tabClass+"rounded-s-md"}>Code PIN</TabsTrigger>
            <TabsTrigger value="badge-nfc" className={tabClass+"rounded-r-md"}>Badge NFC</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="h-full ">
      {
        loginMethod  == "code-pin" ? 
        <CodePin/>
        :""
      }

      </div>
      <div>

      </div>
    </div>
  )
}

export default UserLogin