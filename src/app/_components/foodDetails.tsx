"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/sonner";
import { ItemIndicator } from "@radix-ui/react-dropdown-menu";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
type FoodProps = {
  food: {
    foodName: string;
    image: string;
    ingredients: string;
    price: number;
    _id: string;
  };
};
//localstorage-d hadgalah type
type LocalStorageType = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  quantity: number;
};

export const FoodDetails = ({ food }: FoodProps) => {
  const [quantity, setQuantity] = useState(1);
  const AddQuantity = () => {
    setQuantity(quantity + 1);
  };
  const hasahQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);

      console.log(quantity, "daragdlaa");
    }
  };

  // localstorage ruu data hadgalah
  const storageKey = "cart"; //localstorage dotor cart gedeg tulhuur ugeeer  hadgalan
  const saveUnitData = () => {
    const existingData = localStorage.getItem(storageKey); //omno ni hadgalsan ogogdliig unshina
    const cartItems: LocalStorageType[] = existingData // cartItems гэдэг хувьсагчид өмнөх өгөгдлийг хөрвүүлж хадгална
      ? JSON.parse(existingData)
      : [];

    const isFoodExisting = cartItems.find((item) => item._id === food._id); //omno ni tuhaiin hool baigaa esehiig shalgana
    //hereweee hool baiwal update
    if (isFoodExisting) {
      const newFoods = cartItems.map((item) => {
        if (item._id === food._id) {
          return { ...item, quantity: item.quantity + quantity };
        } else {
          return item;
        }
      });
      // localStorage-д шинэчлэгдсэн өгөгдлөө хадгална
      localStorage.setItem(storageKey, JSON.stringify(newFoods));
      // console.log("new foods", newFoods);
      toast.success("Сагс шинэчлэгдлээ ");
    } else {
      //herewee baihgui bol:
      const newFoods = [
        ...cartItems,
        {
          foodName: food.foodName,
          price: food.price,
          image: food.image,
          _id: food._id,
          ingredients: food.ingredients,
          quantity: quantity,
        },
      ];
      localStorage.setItem(storageKey, JSON.stringify(newFoods));
      toast.success("Сагс  нэмэгдлээ🛍️", {
        className: "bg-red-500 text-white",
      });
      console.log("new foods::", newFoods);
    }
  };

  return (
    <>
      <Toaster richColors position="top-center" />
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="rounded-full w-[44px] h-[44px] cursor-pointer"
          >
            <Plus className="text-[#EF4444]" />
          </Button>
        </DialogTrigger>

        <DialogContent className="!w-fit !max-w-fit ">
          <div className="flex flex-col md:flex-row gap-6 w-full">
            {/* Image section */}
            <div className="relative w-full md:w-[377px] h-[300px] ">
              <Image
                src={food.image}
                alt={food.foodName}
                fill
                className="object-cover rounded-xl"
              />
            </div>

            {/* Info section */}
            <div className="flex flex-col justify-between flex-1">
              <div>
                <h1 className="text-[#EF4444] font-bold text-[22px] mb-2">
                  {food.foodName}
                </h1>
                <p className="text-sm text-gray-600">{food.ingredients}</p>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <p className="font-semibold whitespace-nowrap">
                  Total price: {food.price}$
                </p>

                <Button
                  onClick={hasahQuantity}
                  variant="outline"
                  className="rounded-full w-9 h-9"
                >
                  <Minus />
                </Button>
                <p>{quantity}</p>
                <Button
                  onClick={AddQuantity}
                  variant="outline"
                  className="rounded-full w-9 h-9"
                >
                  <Plus />
                </Button>
              </div>

              <Button onClick={saveUnitData} className="w-full mt-4">
                Add to cart
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
