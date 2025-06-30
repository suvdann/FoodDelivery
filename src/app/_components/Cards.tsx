"use client";
import { Card, CardTitle } from "@/components/ui/card";

import Image from "next/image";

import { FoodDetails } from "./foodDetails";

type FoodProps = {
  foodName: string;
  image: string;
  ingredients: string;
  price: number;
  _id: string;
};

export type PropsType = {
  foods: Record<string, FoodProps[]>;
};

export const Cards = ({ foods }: PropsType) => {
  const keys = Object.keys(foods);
  return (
    <div className="flex flex-col items-center justify-center">
      {keys.map((el) => {
        return (
          <div key={el} className="flex flex-col ">
            <h2 className="text-[30px] text-black font-semibold "> {el}</h2>
            <div className="flex flex-wrap  grid-cols-3 justify-center gap-4">
              {foods[el].slice(0, 6).map((food) => {
                return (
                  <div key={food._id} className="flex  ">
                    <Card className="  w-[397px] h-fit rounded-[20px] flex p-3 ">
                      <div key={food._id} className=" ">
                        {/* <p>{food._id}</p> */}
                        <div className="relative flex justify-center ">
                          <div className=" relative w-[365px] h-[210px]">
                            <Image
                              src={food.image}
                              alt="food photo"
                              fill
                              className="object-cover rounded-xl"
                            ></Image>
                          </div>
                          <div className="absolute ml-[301px] mt-[146px]">
                            <FoodDetails food={food} />
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
      {/* <FoodDetails /> */}
    </div>
  );
};
