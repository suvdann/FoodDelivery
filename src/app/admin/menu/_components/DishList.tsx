import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pen, Pencil, Plus } from "lucide-react";
import Image from "next/image";
import { AddDish } from "./AddDish";
import { DishEdit } from "./DishEdit";
import { Dispatch, SetStateAction } from "react";
type FoodProps = {
  foodName: string;
  image: string;
  ingredients: string;
  price: number;
  _id: string;
  category: string;
  categoryName: string;
  setFoods: Dispatch<SetStateAction<any[]>>;
};

export type PropsType = {
  foods: Record<string, FoodProps[]>;
};
export const DishList = ({ foods }: PropsType) => {
  const keys = Object.keys(foods);
  // console.log(foods, "darrararrraarar");
  return (
    <div>
      <div className="flex flex-col ">
        {keys.map((el) => {
          return (
            <div key={el} className=" ">
              <h2 className="text-[30px] text-[black] font-semibold">
                {el} ({foods[el].length})
              </h2>
              <div className="flex flex-wrap  ">
                <AddDish category={foods[el][0].category} />
                {foods[el].map((food) => {
                  return (
                    <div key={food._id} className="grid grid-cols-1 ">
                      <Card className="  w-[270px] h-fit rounded-[20px] flex p-3 ">
                        <div key={food._id} className=" ">
                          {/* <p>{food._id}</p> */}
                          <div className="relative flex justify-center ">
                            <div className=" relative w-[238px] h-[129px]">
                              <Image
                                src={food.image}
                                alt="food photo"
                                fill
                                className="object-cover rounded-xl"
                              ></Image>
                              {/* <Button
                                variant={"outline"}
                                className="absolute rounded-full bg-white top-[65px] left-[164px] w-[44px] h-[44px] "
                              >
                                <Pen className="text-[#EF4444] font-bold w-[16px] h-[16px]" />
                              </Button> */}
                            </div>
                            <div>
                              <DishEdit category={foods[el][0].category} />
                            </div>
                            <div className="absolute ml-[301px] mt-[146px]">
                              {/* <FoodDetails food={food} /> */}
                            </div>
                          </div>
                          <div className="flex items-center justify-between ">
                            <CardTitle className="text-[#EF4444] font-bold text-[22px]">
                              {food.foodName}
                            </CardTitle>
                            <p className="font-semibold ">{food.price}$</p>
                          </div>
                          <div className="text-sm">{food.ingredients}</div>
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
