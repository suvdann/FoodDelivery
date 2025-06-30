import { Button } from "@/components/ui/button";
import { Car, LayoutDashboard } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

import Link from "next/link";
export const metadata: Metadata = {
  title: "admin",
  description: "admin ",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-screen h-screen flex-row">
      <div className=" flex flex-col  w-[200px] h-screen border">
        <div className=" relative w-[165px] h-[44px]">
          <Image src={"/adminlgo.png"} alt="photo" fill></Image>
        </div>
        <Link
          href={"/admin/menu"}
          className="
            flex items-center "
        >
          <Button variant={"ghost"}>
            <LayoutDashboard />
            Food menu
          </Button>
        </Link>
        <Link href={"/admin/orders"} className="flex items-center">
          <Button variant={"ghost"}>
            {" "}
            <Car />
            Orders
          </Button>
        </Link>
      </div>
      {children}
    </div>
  );
}
