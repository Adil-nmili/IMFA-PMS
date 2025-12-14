import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Props } from "@/types/propsType"
import type React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
const GlobalModal : React.FC<Props> = ({children}) =>{
  return (
    children &&
    <Dialog >
      <form className='flex-1'>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full text-black">Book Now</Button>
        </DialogTrigger>
          <DialogPrimitive.Portal >
            <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 z-40" />
            <DialogPrimitive.Content
              className="fixed left-1/2 bg-[#F6E4CF] overflew-auto  top-1/2 z-50 grid w-[85vw] h-[90vh] max-w-none translate-x-[-50%] translate-y-[-50%] px-6 shadow-lg focus:outline-none rounded-xl"
            >
              {children}
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
      </form>
    </Dialog>
  )
}

export default GlobalModal