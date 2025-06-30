import { Card } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useAuth } from "./UserProvider";
import axios from "axios";
import { Map, Soup } from "lucide-react";

type FoodOrderItemsType = {
  food: {
    _id: string;
    foodName: string;
    price: number;
    image: string;
    ingredients: string;
  };
  quantity: number;
};

type OrderType = {
  _id: string;
  user: string;
  status: string;
  address: string;
  createdAt: Date;
  totalPrice: number;
  foodOrderItems: FoodOrderItemsType[];
};

export const OrderHistory = () => {
  const [orderData, setOrderData] = useState<OrderType[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("/getOrder", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(data.orders, "orderdata");
        setOrderData(data.orders);
      } catch (error) {
        console.error("Order data fetch error:", error);
      }
    };
    fetchOrders();
  }, []);
  // console.log(orderData, "orfghjk")
  return (
    <div>
      <TabsContent value="password">
        <div className="flex flex-col items-center ">
          <Card className="h-[832px] w-[471px]">
            <h1 className="font-bold text-[20px]">Order history</h1>
            {orderData.map((order) => (
              <div key={order._id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-center">
                  {/* <p className="text-lg font-bold">
                      $
                      {order.items
                        .reduce((sum, i) => sum + i.price * i.quantity, 0)
                        .toFixed(2)}
                    </p> */}
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-semibold">${order.totalPrice}</p>
                    <p className="font-semibold">(#{order._id.slice(0, 5)})</p>
                  </div>

                  <div
                    className={`px-2 py-1 rounded-full text-sm  ${
                      order.status === "PENDING"
                        ? " border border-[#EF4444]"
                        : "bg-green-200 text-green-800"
                    }`}
                  >
                    {order.status}
                  </div>
                </div>
                <div className="mt-2">
                  {order.foodOrderItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <p className="flex text-[#71717A] text-[16px] items-center gap-1">
                        <Soup width={16} height={16} />
                        {item.food.foodName}
                      </p>
                      <p className="text-[16px]">x{item.quantity}</p>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-500 mt-2">{/* {odor} */}</div>
                <div className="flex items-center gap-1 text-[16px] text-gray-500">
                  <Map width={16} height={16} />
                  {order.address}
                </div>
              </div>
            ))}
          </Card>
        </div>
      </TabsContent>
    </div>
  );
};
