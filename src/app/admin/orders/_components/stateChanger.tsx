import { Button } from "@/components/ui/button";
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

enum orderStatusType {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  DELIVERED = "DELIVERED",
}

type PropsType = {
  saveChange: () => void;
  statusHandler: (_orderStatus: orderStatusType) => void;
  orderStatus: orderStatusType;
};

export function StateChanger({
  saveChange,
  statusHandler,
  orderStatus,
}: PropsType) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          {/* <div className=" border w-full flex justify-between mt-5"> */}
          {/* <h1 className="text-2xl font-black ">Orders</h1> */}
          <Button variant="secondary">Change delivery state</Button>
          {/* </div> */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change delivery state</DialogTitle>
          </DialogHeader>
          <div className="flex my-6 justify-evenly">
            <Button
              onClick={() => statusHandler(orderStatusType.PENDING)}
              className="bg-yellow-200 text-yellow-800"
            >
              {orderStatusType.PENDING}
            </Button>
            <Button
              onClick={() => statusHandler(orderStatusType.DELIVERED)}
              className="bg-green-200 text-green-800"
            >
              {orderStatusType.DELIVERED}
            </Button>
            <Button
              onClick={() => statusHandler(orderStatusType.CANCELLED)}
              className="bg-red-200 text-red-800"
            >
              {orderStatusType.CANCELLED}
            </Button>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={saveChange}>
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
