"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { OrderHistory } from "./OrderHistory";
import { DetailLogCart } from "./DetailLogCart";
import { CheckOutDialog } from "./backHomeCart";
import { useAuth } from "./UserProvider";
import axios from "axios";

type UnitDataType = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  _id: string;
  quantity: number;
  address: string;
};

const storageKey = "cart";
export const OrderDetails = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<UnitDataType[]>([]);
  const [address, setAddress] = useState("");
  const [isAddressInvalid, setIsAddressInvalid] = useState(false);

  const [openCard, setOpenCard] = useState<boolean>(false);
  const CloseOrderCard = () => {
    setOpenCard(!openCard);
  };
  useEffect(() => {
    const existingData = localStorage.getItem("cart");
    if (existingData) {
      const parsed = JSON.parse(existingData);
      setCartItems(parsed);
      console.log("cartItems full", localStorage);
    }
  }, []);
  const updateCart = (newChart: UnitDataType[]) => {
    setCartItems(newChart);
    localStorage.setItem(storageKey, JSON.stringify(newChart));
  };
  const increaseQty = (index: number) => {
    const newChart = [...cartItems];
    newChart[index].quantity += 1;
    updateCart(newChart);
  };
  const decreaseQty = (index: number) => {
    const newChart = [...cartItems];
    if (newChart[index].quantity > 1) {
      newChart[index].quantity -= 1;
      updateCart(newChart);
    }
  };

  const handleDelete = (_id: string) => {
    const updateItems = cartItems.filter((cartItems) => cartItems._id !== _id);
    updateCart(updateItems);
  };

  const checkOutSubmit = async () => {
    console.log("is being called");
    const backEndData = cartItems.map((food) => ({
      food: food._id,
      quantity: food.quantity,
    }));

    const totalPrice =
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0) +
      0.99;

    const token = localStorage.getItem("token");
    console.log(token, "from checkout");

    try {
      const res = await axios.post(
        "https://fooddelivery-backend-ic50.onrender.com/createOrder",
        {
          userId: user?.userId,
          address,
          foodOrderItems: backEndData,
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res, "axios is called");

      alert("Захиалга амжилттай илгээгдлээ");

      setCartItems([]);

      setAddress("");
    } catch (error) {
      alert("Захиалга илгээхэд алдаа гарлаа");
      console.error(error, "////");
    }
  };

  const calculateItemsTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const calculateTotal = () => {
    const itemsTotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return parseFloat((itemsTotal + 0.99).toFixed(2)); // 0.99 бол shipping
  };
  return (
    <div className="p-4">
      <Sheet>
        <SheetTrigger>
          <div className=" w-[36px] h-[36px] bg-[white] flex items-center justify-center rounded-full">
            <ShoppingCart className="w-[16px] h-[16px]" />
          </div>
        </SheetTrigger>
        <SheetContent className="bg-[#404040] overflow-y-scroll p-3 !w-fit !max-w-fit rounded-l-[20px]">
          <SheetTitle className="text-[#FAFAFA] flex items-center gap-3">
            <ShoppingCart className="w-[16px] h-[16px]" />
            <p className="text-[20px]">Order detail</p>
          </SheetTitle>

          <Tabs
            defaultValue="account"
            className="w-[535px] flex justify-center items-center px-5"
          >
            <TabsList className="w-[471px]">
              <TabsTrigger value="account">Cart</TabsTrigger>
              <TabsTrigger value="password">Order</TabsTrigger>
            </TabsList>
            <TabsContent
              value="account"
              className="flex flex-col items-center  p-5 gap-6 !w-fit !max-w-fit"
            >
              <Card className=" w-[471px]  ">
                <h1 className="font-bold text-[#71717A] text-[20px]">
                  My cart
                </h1>
                {cartItems.length === 0 ? (
                  <div className="flex justify-center items-center w-[439px]  ">
                    <div className="w-[439px] h-[182px] bg-[#F4F4F5] flex flex-col items-center justify-center rounded-[20px] ">
                      <Image
                        src={"/logo.png"}
                        alt="logo"
                        width={61}
                        height={50}
                      ></Image>
                      <p className="text-[16px] font-bold">
                        Your cart is empthy
                      </p>
                      <p className="text-[#71717A] text-center">
                        Hungry? 🍔 Add some delicious dishes to your cart and
                        satisfy your cravings!
                      </p>
                    </div>
                  </div>
                ) : (
                  cartItems.map((item, index) => (
                    <div
                      key={item._id}
                      className="p-4 w-[471px]  border-b-[2px] border-dashed "
                    >
                      <div className=" flex gap-[10px] justify-between">
                        {/* ----end zurag */}
                        <div className="relative  w-[124px] h-[120px] ">
                          <Image
                            src={item.image}
                            alt={item.foodName}
                            fill
                            className="object-cover rounded-xl"
                          />
                        </div>

                        {/* text */}
                        <div className="flex flex-col justify-between">
                          <div>
                            <h1 className="text-[#EF4444] font-bold text-[22px] mb-2">
                              {item.foodName}
                            </h1>
                            <p className="text-sm text-gray-600">
                              {item.ingredients}
                            </p>
                          </div>

                          <div className="flex items-center gap-4 mt-4">
                            <Button
                              onClick={() => decreaseQty(index)}
                              variant="ghost"
                              className="rounded-full w-9 h-9"
                            >
                              <Minus />
                            </Button>
                            <p className="">{item.quantity || 1}</p>
                            <Button
                              onClick={() => increaseQty(index)}
                              variant="ghost"
                              className="rounded-full w-9 h-9"
                            >
                              <Plus />
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-col justify-between">
                          <Button
                            variant="outline"
                            onClick={() => handleDelete(item._id)}
                            className="border w-[36px] h-[36px] rounded-full border-[#EF4444] cursor-pointer"
                          >
                            <X className="text-[#EF4444]" />
                          </Button>
                          <p className="font-semibold whitespace-nowrap">
                            {item.price}$
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <div className="mt-4">
                  <h1 className="text-[#71717A] text-[20px] font-bold">
                    Delivery location
                  </h1>
                  <Textarea
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (e.target.value.trim().length > 0) {
                        setIsAddressInvalid(false); // address бичих үед алдааг арилгана
                      }
                    }}
                    placeholder="Please complete your address"
                    className={`
                      ${address ? "border border-red-500" : ""}
                        mt-2
                      `}
                  />
                  {isAddressInvalid && (
                    <p className="text-red-500 text-sm mt-1">
                      Please complete your address
                    </p>
                  )}
                </div>
              </Card>

              {/* ------------payment---------- */}
              <Card className=" flex flex-col  items-center px-3 w-[471px]">
                <CardTitle className="font-bold text-[#71717A] text-[20px] ">
                  Payment info
                </CardTitle>
                <CardContent className=" w-full px-4 text-sm text-[#18181B]">
                  <div>
                    <div className="flex  flex-col gap-5 border-b-[2px] mb-2 pb-2 border-dashed">
                      <div className="flex justify-between gap-5">
                        <p className="text-[#71717A] text-[16px]">Items</p>
                        {calculateItemsTotal()}
                      </div>

                      <div className=" flex justify-between">
                        <p className="text-[#71717A] text-[16px]">Shipping:</p>
                        <p className="font-bold text-[16px]">0.99$</p>
                      </div>
                    </div>
                    <div className="flex  justify-between">
                      <p className="text-[#71717A] text-[16px]">Total:</p>
                      <p className="font-bold">
                        {cartItems.reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )}
                        ;$
                      </p>

                      <p className="text-[28px] font-bold">
                        {calculateTotal()}$
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center p-2">
                    {user?.userId ? (
                      <CheckOutDialog
                        CloseOrderCard={CloseOrderCard}
                        checkOutSubmit={checkOutSubmit}
                      />
                    ) : (
                      <DetailLogCart />
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ____________order gistory heseg_____________________ */}
            <OrderHistory />
          </Tabs>
        </SheetContent>
      </Sheet>
    </div>
  );
};
