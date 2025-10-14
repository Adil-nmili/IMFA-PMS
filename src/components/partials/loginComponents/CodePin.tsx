import { Button } from "@/components/ui/button";
import { useState } from "react"

function CodePin() {
    const [codePin,setCodePin] = useState<any>('');
    console.log(codePin);
    
  return (
    <div className="flex flex-col items-center gap-4 md:w-full w-[95%] mx-auto">
        <div className="flex items-center gap-1">
        {
            [...Array(6)].map((items,index)=>
            {
                return(
                    <div className={`
                        h-4 w-4 rounded-full border border-[#D9D9D9]
                        ${
                            codePin.length - 1 >= index ? "bg-[#D9D9D9] border-[#3F3124]" : "border-[#D9D9D9]" 
                        }
                        `}></div>
                )
            })
        }

        </div>
        <div className="grid grid-cols-3 gap-2">
        {
            [...Array(9)].map((items,index)=>
            {
                return(
                    <Button 
                    key={index}
                    className={`
                        h-14 w-30 rounded-xl bg-[#D9D9D9] text-black
                        hover:text-[white]
                        hover:bg-[#3F3124]
                        `
                        }
                        onClick={()=>setCodePin(codePin.length < 6 ? String(codePin)+String(index+1 ): codePin)}

                        >{index+1}</Button>
                )
            })
        }
        {
            ["X","0","<-"].map((item,index)=>
            {
                return(
                    <Button 
                    key={index}
                    className={`
                        h-14 w-30 rounded-xl bg-[#D9D9D9] text-black
                        hover:text-[white] hover:bg-[#3F3124]
                        `
                        }
                        onClick={()=>
                         setCodePin(
                            item == "0" ? String(codePin)+String(index+1):
                            item == "<-" ? String(codePin).substring(0,codePin.length-1) :""
                         )   
                        }
                        >{item}</Button>
                )
            })
        }

        </div>
        <div className="w-[90%] ">
            <Button className="w-full h-12 bg-[#3F3124] text-white hover:bg-[#5a4432] rounded-lg ">
                Se Connecter
            </Button>
        </div>
    </div>
  )
}

export default CodePin