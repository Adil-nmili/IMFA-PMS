import { Button } from "@/components/ui/button";
import { ScanLine, ScanQrCode } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { getUserToken, loginByRFID } from "@/api/api"; 
import useAppState from '@/stores/store'

interface BadgeNfcProps {
  nomEmp?: string; 
}

export default function BadgeNfc({ nomEmp }: BadgeNfcProps) {
  const [lastScan, setLastScan] = useState<string | null>(null);
  const buffer = useRef("");
  const timeout = useRef<number>(300);
  const [isStartScan, setIsStartScan] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const login = useAppState(state=>state?.login);


  useEffect(() => {
    if(isStartScan){
        
        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key.length > 1 && e.key !== "Enter") return;
    
          window.clearTimeout(timeout.current);
          timeout.current = window.setTimeout(() => (buffer.current = ""), 3000);
    
          if (e.key === "Enter") {
            const tag = buffer.current.trim();
            buffer.current = "";
            if (tag) {
              console.log("RFID scanned:", tag);
              setLastScan(tag);
              handleLoginByRFID(tag); 
            }
          } else {
            buffer.current += e.key;
          }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }

  }, [isStartScan]);

  const handleLoginByRFID = async (rfidCode: string) => {
    if (!nomEmp) {
      toast.error("Nom de l'employé requis pour la connexion");
      return;
    }

    setIsLoading(true);
    try {
      const userResponse = await loginByRFID(rfidCode, nomEmp);
      const tokenResponse = await getUserToken(userResponse?.emailEmp,String(userResponse?.code_pin));
      if(tokenResponse){
        localStorage?.setItem("access_token",tokenResponse?.session?.access_token)
        login(userResponse,tokenResponse?.session?.access_token);
        toast.success(`Connexion réussie ! Bienvenue ${userResponse.nomEmp}`);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Erreur lors de la connexion RFID");
    } finally {
      setIsStartScan(false); 
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-100 gap-2">
      {isStartScan ? (
        <div className="h-[80%] bg-white text-[#3F3124] flex items-center justify-evenly flex-col p-4 w-[95%] mx-auto text-center rounded-xl">
          <ScanLine size={100} />
          <h2 className="text-xl font-bold">Lecture en cours..</h2>
          <p className="text-sm">Veillez maintenir votre badge</p>
          {isLoading && <p className="text-sm text-[#3F3124]">Connexion en cours...</p>}
        </div>
      ) : (
        <div className="h-[80%] bg-white text-[#3F3124] flex items-center justify-evenly flex-col p-4 w-[95%] mx-auto text-center rounded-xl">
          <ScanQrCode size={100} />
          <h2 className="text-xl font-bold">Scanner votre badge</h2>
          <p className="text-sm">Approcher votre badge RFID du lecteur pour connecter</p>
          <div className="w-[100%]">
            <Button
              className="w-full h-14 text-[#EFEEEE] bg-[#373124] hover:text-[#EFEEEE] hover:bg-[#5a4432] rounded-lg"
              onClick={() => setIsStartScan(true)}
            >
              Scanner mon badge
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
