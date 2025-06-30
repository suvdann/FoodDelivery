"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Payment } from "./_components/columns";
import { StateChanger } from "./_components/stateChanger";
import { DataTable } from "./_components/Table";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
// import { DateFilter } from "./_components/DateFilter";
// import { DataTable } from "./_components/Table";
enum orderStatusType {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  DELIVERED = "DELIVERED",
}
const AdminOrderPage = () => {
  const [order, setOrder] = useState<any[]>([]);
  const [selectedOrdersId, setSelectedOrdersId] = useState<string[]>([]);
  const [orderStatus, setOrderStatus] = useState<orderStatusType>(
    orderStatusType.PENDING
  );
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getAdminOrders = async () => {
      const { data } = await axios.get(
        "https://fooddelivery-backend-zyay.onrender.comadmin/getAllOrders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data, "dataaaaaaaaaaaaa ");
      setOrder(data.orders);
    };

    getAdminOrders();
  }, []);

  const data: Payment[] = order.map((el: any, index) => ({
    id: el._id,
    number: index + 1,
    customer: `${el.user.email}`,
    food: `${el.foodOrderItems?.length || 0} foods`,
    date: format(new Date(el.createdAt), "yyyy-MM-dd"),
    total: el.totalPrice,
    status: el.status,
    address: el.address,
  }));

  const selectHandler = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedOrdersId((prev) => [...prev, id]);
    } else {
      const removed = selectedOrdersId.filter((item) => item != id);
      setSelectedOrdersId(removed);
    }
  };
  const statusHandler = (orderStatus: orderStatusType) => {
    setOrderStatus(orderStatus);
  };

  const saveChange = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Log in hiine uu!");
      return;
    }
    const prepare = selectedOrdersId.map((el) => ({
      _id: el,
      status: orderStatus,
    }));

    await axios.put(
      "https://fooddelivery-backend-ic50.onrender.com/admin/order/update",
      {
        orders: prepare,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const updated = order.map((item) => {
      if (selectedOrdersId.includes(item._id)) {
        return { ...item, status: orderStatus };
      }
      return item;
    });

    setOrder(updated);
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-sm text-gray-500">{order.length} items</p>
        </div>
        <div className="flex gap-5 items-center">
          {/* <DateFilter /> */}

          <p>DATE202222 </p>
          <StateChanger
            saveChange={saveChange}
            statusHandler={statusHandler}
            orderStatus={orderStatus}
          />
        </div>
      </div>

      <DataTable data={data} onCheckedChange={selectHandler} />
    </div>
  );
};
export default AdminOrderPage;
