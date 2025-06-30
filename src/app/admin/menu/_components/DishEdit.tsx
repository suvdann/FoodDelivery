"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Minus, Pen, Plus, Trash, User } from "lucide-react";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
type Props = {
  category: string;
  image: string;
  foodName: string;
  price: number | undefined;
  ingredients: string;
};
export type PropsType = {
  imageUrl: string | null;
  setImageUrl: Dispatch<SetStateAction<string | null>>;
  setFile: Dispatch<SetStateAction<File | null>>;
};

export const DishEdit = ({
  category,
}: //   setFoods,
//   categoryName,
// }: {
//   category: string;
//   setFoods: Dispatch<SetStateAction<any[]>>;
//   categoryName: string;
{
  category: string;
}) => {
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const handleFoodNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFoodName(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handleIngredientsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredients(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      if (!file) {
        alert("please select image");
        return null;
      }
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "food-delivery");
      const result = await fetch(
        "https://api.cloudinary.com/v1_1/doqgdtl79/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const img = await result.json();
      await axios.put("/addfood", {
        foodName: foodName,
        price: price,
        category: category,
        ingredients: ingredients,
        image: img.secure_url,
      });
    } catch (err) {}
  };
  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full w-[44px] h-[44px] cursor-pointer"
            >
              <Pen className="text-[#EF4444]" />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[472px] h-[596px] !max-w-none">
            <DialogHeader>
              <DialogTitle>Dishes info</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="flex ">
                <Label htmlFor="name-1" className="text-[#71717A] text-[12px]">
                  Dish name
                </Label>
                <Input value={foodName} onChange={handleSubmit} />
              </div>
              <div className="flex justify-around">
                <Label
                  htmlFor="username-1"
                  className="text-[#71717A] text-[12px]"
                >
                  Dish category
                </Label>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="light"
                      className="border w-[116px] h-[20px] rounded-full bg-[#F4F4F5]"
                    >
                      Light
                    </SelectItem>
                    {/* <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem> */}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex  justify-around">
                <Label className="text-[#71717A] text-[12px]">
                  Ingredients
                </Label>
                <Input
                  id="username-1"
                  name="username"
                  placeholder=""
                  className="h-[36px]"
                />
              </div>
              <div className="flex  justify-around">
                <Label className="text-[#71717A] text-[12px]">Price</Label>
                <Input id="username-1" name="username" />
              </div>
            </div>
            <DialogFooter className="w-full flex justify-between items-center">
              <DialogClose asChild>
                <Button variant="outline">
                  <Trash />
                </Button>
              </DialogClose>

              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};
