import { Facebook, Instagram } from "lucide-react";
import Image from "next/image";

export const Footer = () => {
  return (
    <div className="relative bg-black h-[755px] w-full flex ">
      <div className=" w-full h-[92px] bg-[#EF4444] text-amber-50 flex items-center gap-10 overflow-hidden hover:animate-none absolute top-[88px]">
        <p className="text-[36px] font-bold animate-slide">
          Fresh Fast Delivered
        </p>
        <p className="text-[36px] font-bold animate-slide">
          Fresh Fast Delivered
        </p>
        <p className="text-[36px] font-bold animate-slide">
          Fresh Fast Delivered
        </p>
        <p className="text-[36px] font-bold animate-slide">
          Fresh Fast Delivered
        </p>
        <p className="text-[36px] font-bold animate-slide">
          Fresh Fast Delivered
        </p>
        <style className="">
          {`
            @keyframes slide {
              0% { transform: translateX(100%); }
              100% { transform: translateX(-100%); }
            }
            .animate-slide {
              animation: slide 20s linear infinite;
              display: inline-block;
              white-space: nowrap;
            }
          `}
        </style>
      </div>
      <div>
        {" "}
        <Image
          src={"/footer.png"}
          alt="photo"
          width={88}
          height={93}
          className="mt-[228px] ml-[88px]"
        />
      </div>
      <div className="">
        <div className="flex">
        <div className="text-white text-[16px] flex  flex-col justify-between w-[122px] h-[144px] mt-[228px] ml-[220px]">
          <p className="text-[#71717A] text-[16px]">NOMNOM</p>
          <p className="">Home</p>
          <p>Contact us</p>
          <p> Delivery zone</p> 
        </div>
         <div className="text-white text-[16px]  flex  flex-col justify-between w-[122px] h-[144px] mt-[228px] ml-[112px]">
          <p className="text-[#71717A] text-[16px]">MENU</p>
          <p className="">Appetizers</p>
          <p>Salads</p>
          <p>Pizzas</p>
          <p>Main dishes</p>
          <p>Desserts</p>
        </div>
        <div className="text-white text-[16px]  flex  flex-col justify-between w-[122px] h-[144px] mt-[248px] ml-[112px]">
          
          <p className="">Side dish</p>
          <p>Brunch</p>
          <p>Desserts</p>
          <p>Beverages</p>
          <p>Fish & Sea foods</p>
        </div>
        <div className="flex flex-col mt-[228px] ml-[146px] gap-4 ">
            <p className="text-white ">FOLLOW US</p>
            <div className="flex gap-4">
        <Facebook className="w-[28px] h-[27px] bg-white rounded-2xl" />
        <Instagram className="w-[28px] h-[27px] bg-white rounded-2xl" />
        </div>
        </div>
        </div>
        <div className=" flex items-center">
      <hr className="border border-[#F4F4F566] my-4 mt-[104px] w-[1264px]"/>
     
      </div>
       <div className=" flex justify-between">
        <p className="text-[#71717A]">Copy right 2024 © Nomnom LLC</p>
        <p className="text-[#71717A]">Privacy policy</p>
        <p className="text-[#71717A]">Terms and condition</p>
        <p className="text-[#71717A]">Cookie policy</p>
        <p></p>
      </div>
      </div>
      
    </div>
  );
};
