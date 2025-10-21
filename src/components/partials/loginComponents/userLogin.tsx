import type { UserType } from "@/types/UserType"
import { useState, type JSX } from "react";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import CodePin from "./CodePin";
import BadgeNfc from "./BadgeNfc";
import UserCard from "@/components/cards/userCard";

function UserLogin ({SelectedUser}:{SelectedUser : UserType | null}) {
    const [loginMethod,setLoginMethod] = useState<"code-pin"|"badge-nfc">("code-pin");


  const tabClass =
    "h-10 bg-[#EFEEEE] data-[state=active]:bg-[#3F3124] data-[state=active]:text-white  transition-colors cursor-pointer text-sm ";
  return (
    <div className="flex items-center flex-col h-screen">
      <div >
        <UserCard 
        selectedUser={SelectedUser}
        setSelectedUser={()=>{}}
        scaleCard={1}
        />
      </div>
      <div className="w-full">
        <Tabs defaultValue="code-pin" className="w-full flex flex-col gap-6">
          <TabsList className="grid grid-cols-2 w-[90%] mx-auto h-10  ">
            <TabsTrigger value="code-pin" className={tabClass+"rounded-s-md"}
            onClick={()=>setLoginMethod("code-pin")}
            >Code PIN</TabsTrigger>
            <TabsTrigger value="badge-nfc" className={tabClass+"rounded-r-md"}
            onClick={()=>setLoginMethod("badge-nfc")}
            >Badge NFC</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="h-full ">
      {
        loginMethod  == "code-pin" ? 
        <CodePin nomEmp={SelectedUser?.nomEmp}/>
        :<BadgeNfc nomEmp={SelectedUser?.nomEmp}/>
      }

      </div>
      <div>

      </div>
    </div>
  )
}

export default UserLogin