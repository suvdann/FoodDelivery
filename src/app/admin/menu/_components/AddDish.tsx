"use client";
import { Card } from "@/components/ui/card";
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
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { ImageUpload } from "./ImageUpload";
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
export const AddDish = ({ category }: { category: string }) => {
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
    console.log(foodName, "foodName");
    console.log(price, "total");

    console.log(ingredients, "ingredients");
    try {
      if (!file) {
        alert("Please select a file");
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
      console.log("hi");
      console.log(formData, "cloudnary dataa");
      const img = await result.json();
      console.log(img.secure_url);
      await axios.post("http://localhost:8000/addfood", {
        foodName: foodName,
        price: price,
        category: category,
        ingredients: ingredients,
        image: img.secure_url,
      });
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };
  return (
    <Dialog>
      <form onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Card className="flex items-center justify-center border-dashed border-[#EF4444] w-[270px] h-[241px]">
            {/* <Button className="w-[40px] h-[40px] rounded-full bg-[#EF4444] "> */}
            <Plus className="w-[40px] h-[40px] rounded-full bg-[#EF4444] text-[white]" />
            {/* </Button> */}
            <p>Add new Dish to Salads </p>
          </Card>
        </DialogTrigger>
        <DialogContent className="w-[462px] h-[592px]">
          <DialogHeader>
            <DialogTitle className="font-bold text-[18px]">
              {" "}
              Add new Dish Appetizers
            </DialogTitle>
          </DialogHeader>
          <div className="flex gap-3">
            <div className="grid gap-3">
              <Label htmlFor="tabs-demo-name">Food name </Label>
              <Input
                name="name"
                value={foodName}
                onChange={handleFoodNameChange}
                // onChange={handleChange}
                placeholder="Type food name"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="tabs-demo-username">Total Price</Label>
              <Input
                type="number"
                value={price}
                onChange={handlePriceChange}
                placeholder="Enter price"
              />
            </div>
          </div>
          <div>
            <h1>Ingredients</h1>
            <Input
              name="ingredients"
              placeholder="List ingredients..."
              className="w-[412px] h-[90px]"
              value={ingredients}
              onChange={handleIngredientsChange}
            />
          </div>
          <div>
            <div className="">
              <ImageUpload
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                setFile={setFile}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
