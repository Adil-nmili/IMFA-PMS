import { getUserToken, loginByCodePin } from "@/api/authapi";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import useAppState from '@/stores/authStore'
import { useNavigate } from "react-router-dom";
import { ACCUEIL } from "@/router/router";


function CodePin(nomEmp:string|any) {
  const [codePin, setCodePin] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const login = useAppState((state) => state.login);
  const handleSubmitCodePin = async () => {
    if (codePin.length !== 6 || nomEmp === "") {
      toast.error("Le code PIN doit contenir 6 chiffres");
      return;
    }

    setIsLoading(true);

    try {
        
      const userResponse = await loginByCodePin(codePin,nomEmp?.nomEmp);

      if (userResponse) {
        const tokenResponse = await getUserToken(userResponse?.emailEmp,Number(userResponse?.code_pin));
        if(tokenResponse){
        localStorage?.setItem("access_token",tokenResponse?.session?.access_token)
          login(userResponse,tokenResponse?.session?.access_token);
          toast.success("Connexion réussie !");
          navigate(ACCUEIL)
        }
        
      } else {
        toast.error("Code PIN invalide");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Erreur lors de la connexion");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNumberClick = (num: string) => {
    if (codePin.length < 6) setCodePin(codePin + num);
  };

  const handleSpecialClick = (item: string) => {
    if (item === "0") handleNumberClick("0");
    else if (item === "<-") setCodePin(codePin.slice(0, -1));
    else setCodePin(""); 
  };

  return (
    <div className="flex flex-col items-center gap-4 md:w-full mt-4 w-[95%] mx-auto">
      <div className="flex items-center gap-3">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className={`
              h-4 w-4 rounded-full border border-[#D9D9D9]
              ${codePin.length - 1 >= index ? "bg-[#D9D9D9] border-[#3F3124]" : "border-[#D9D9D9]"}
            `}
          ></div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[...Array(9)].map((_, index) => (
          <Button
            key={index}
            className={`
              h-14 w-30 rounded-xl bg-[#D9D9D9] text-black
              hover:text-white hover:bg-[#3F3124]
            `}
            onClick={() => handleNumberClick(String(index + 1))}
          >
            {index + 1}
          </Button>
        ))}

        {["X", "0", "<-"].map((item, index) => (
          <Button
            key={index}
            className={`
              h-14 w-30 rounded-xl bg-[#D9D9D9] text-black
              hover:text-white hover:bg-[#3F3124]
            `}
            onClick={() => handleSpecialClick(item)}
          >
            {item}
          </Button>
        ))}
      </div>

      <div className="w-[100%]">
        <Button
          className="w-full h-14 bg-[#EFEEEE] text-[#373124] hover:text-[#EFEEEE] hover:bg-[#5a4432] rounded-lg"
          onClick={handleSubmitCodePin}
          disabled={isLoading}
        >
          {isLoading ? "Connexion..." : "Se Connecter"}
        </Button>
      </div>
    </div>
  );
}

export default CodePin;
