"use client";

import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import { PropsType } from "./AddDish";
import { ImageIcon } from "lucide-react";

export const ImageUpload = ({ imageUrl, setImageUrl, setFile }: PropsType) => {
  const fileHandler = (event: any) => {
    setFile(event?.target.files[0]);
    const imgUrl = URL.createObjectURL(event?.target.files[0]);
    setImageUrl(imgUrl);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <Label htmlFor="foodImage">Food Image</Label>
      <Label
        htmlFor="foodImage"
        className="w-[412px] h-[138px] border-2 border-dashed border-[#2563EB33] rounded-md flex flex-col items-center justify-center cursor-pointer bg-sky-50 overflow-hidden"
      >
        <div className="bg-white h-[32px] w-[32px] flex items-center justify-center rounded-full">
          <ImageIcon className="w-[16px] h-[16px]" />
        </div>

        <p>Choose a file or drag & drop it here</p>

        {imageUrl && (
          <div className="">
            <img
              src={imageUrl}
              alt="image"
              className=" w-full h-fit object-contain "
            />
          </div>
        )}
      </Label>
      <input
        type="file"
        id="foodImage"
        onChange={fileHandler}
        name="foodImage"
        className="hidden"
        //
        // value="Choose a file or drag & drop it here"
      />
    </div>
  );
};
