import { AppWindowIcon, CodeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
export const DishCategoryTabs = ({ foods }: PropsType) => {
  const keys = Object.keys(foods);
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="account">
        <TabsList className="flex  gap-3 ">
          {keys.map((el) => {
            return (
              <div key={el}>
                <TabsTrigger
                  value="${el}"
                  className="border border-[#E4E4E7] rounded-full w-[141px] h-[36px]"
                >
                  {el} <p>({foods[el].length})</p>
                </TabsTrigger>
              </div>

              //   <TabsTrigger
              //     value="all"
              //     className="border border-[#E4E4E7] rounded-full w-[141px] h-[36px]"
              //   >
              //     All Dishes
              //   </TabsTrigger>
            );
          })}
        </TabsList>
        <TabsContent value="el" className=""></TabsContent>
        <TabsContent value="side dish">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current password</Label>
                <Input id="tabs-demo-current" type="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New password</Label>
                <Input id="tabs-demo-new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="salads">
          <Card>
            <CardHeader>
              <CardTitle>salads</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current password</Label>
                <Input id="tabs-demo-current" type="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New password</Label>
                <Input id="tabs-demo-new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="mongol hool">
          <Card>
            <CardHeader>
              <CardTitle>Mongol hool</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current password</Label>
                <Input id="tabs-demo-current" type="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New password</Label>
                <Input id="tabs-demo-new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
