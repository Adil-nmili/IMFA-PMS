import UserLogin from "@/components/partials/loginComponents/userLogin";
import RolesSlider from "@/components/partials/slides/RolesSlider";
import type { UserType } from "@/types/UserType";
import {  useState } from "react"
import { Link } from "react-router-dom"

function Login() {
  const [selectedUser,setSelectedUser] = useState<UserType | null>(null);

  return (
    <div className="h-screen items-center grid grid-cols-1 md:grid-cols-2 font-inria">
      
      <div className=" h-full flex items-center">
        <RolesSlider setSelectedUser={setSelectedUser}/>
      </div>
      
      <div className="bg-[#967E62] h-screen flex justify-center">
      {
        selectedUser ? 
        <UserLogin SelectedUser={selectedUser} />
        :
      <div className="  relative hidden md:flex flex-col gap-12 items-center justify-center ">
        <div className="w-1/3">
          <img src="login-secure-undraw.svg" alt="login-secure" className="w-full" />
        </div>
        <div>
          <h1 className="text-[#FFFBFB] text-xl md:text-3xl font-bold ">Choisir votre profil</h1>
        </div>
        <div className="absolute bottom-10 left-5 z-5">
            <Link 
            to={''}
            className="text-white hover:text-[#FFFBFB]">
              Mot de passe oublier
            </Link>
        </div>
      </div>
      }

      </div>
    </div>
  )
}

export default Login