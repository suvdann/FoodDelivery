import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";
import {redirect} from"next/navigation"
export const DetailLogCart= () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            
            className="w-[439px] bg-[#EF4444]"
          >
            Checkout
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[429px] h-[184px] flex flex-col justify-between">
          <DialogTitle className="text-center font-semibold text-[24px] rounded-xl">
           You need to log in first
          </DialogTitle>
          <div className="flex gap-3 justify-center items-center">
        
            <Button
              onClick={() => redirect("/login")}
              className="flex-1 bg-black text-white"
            >
              Log in
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => redirect("/signup")}
            >
              Sign up
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

