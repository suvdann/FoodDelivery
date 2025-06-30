"use client";
import { Input } from "@/components/ui/input";
import { ChevronRight, MapPin, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { OrderDetails } from "./orderDetails";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export const Header = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  // Хэрэглэгчийн email-г localStorage-с авна
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("email");
      if (storedEmail) {
        setEmail(storedEmail);
      }
    }
  }, []);
  // const handleSignOut = () => {
  //   localStorage.removeItem("token"); // эсвэл clear() хийж болно
  //   redirect("/login"); // login хуудас руу шилжүүлнэ
  // };
  return (
    <div className=" w-full bg-black flex  items-center justify-between p-3">
      <div className=" left-[64px] cursor-pointer">
        <Image
          onClick={() => redirect("/")}
          src={"/LogoContainer.png"}
          alt="header logo"
          width={146}
          height={146}
        />
      </div>
      <div className="flex items-center">
        <div className="flex items-center justify-center bg-white w-[251px] h-[36px] rounded-full px-3 py-2 gap-1">
          <div className="flex items-center  text-[#EF4444] text-[12px] text-nowrap">
            <MapPin className="w-[20px] h-[20px]" />
            <div>Delivery address:</div>
          </div>
          
          <Input
            className="border-none focus:outline-none p-0  text-[12px]"
            placeholder="Add location"
          />
          <ChevronRight className="text-[#18181B80] w-[20px] h-[20px]" />
        </div>
        <OrderDetails />
        <div>
          <Popover>
            <PopoverTrigger className="">
              {" "}
              <div className="bg-[#EF4444] w-[36px] h-[36px] text-white rounded-full flex items-center justify-center">
                <User />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-full flex flex-col gap-3 justify-center items-center">
              <p className="text-[16px] font-semibold">
                {email ? email : "No user"}
              </p>
              <div className="flex gap-3 rounded-xl   bg-[#F4F4F5]">
                <Button
                  onClick={()=>redirect("/signup")}
                  variant={"outline"}
                  className="rounded-full w-[80px] h-[36px] bg-[#F4F4F5]"
                >
                  Sign out
                </Button>
                <Button variant={"outline"} 
                onClick={()=>redirect("/login")}
                   className="rounded-full w-[80px] h-[36px] bg-[#F4F4F5]"
                >Log out</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};
