import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import type React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
const GlobalModal : React.FC<any> = ({children,message}) =>{
  return (
    children &&
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button className="cursor-pointer">{message}</button>
        </DialogTrigger>
          <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 z-40" />
            <DialogPrimitive.Content
              className="fixed left-1/2 bg-[#F6E4CF]  top-1/2 z-50 grid w-[85vw] h-[90vh] max-w-none translate-x-[-50%] translate-y-[-50%] px-6 shadow-lg focus:outline-none rounded-xl"
            >
              {children}
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
      </form>
    </Dialog>
  )
}

export default GlobalModal