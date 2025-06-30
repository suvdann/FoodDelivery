"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

export type Payment = {
  id: string;
  number: number;
  customer: string;
  food: string;
  date: string;
  total: number;
  status: "PENDING" | "DELIVERED" | "CANCELLED";
  address: string;
};

export const customColums = (selectHandler: any): ColumnDef<Payment>[] => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => () => {
            table.toggleAllPageRowsSelected(!!value);
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            selectHandler(row.original.id, value);
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "number",
      header: "№",
    },
    {
      accessorKey: "customer",
      header: "Customer",
    },
    {
      accessorKey: "food",
      header: "Food",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "total",
      header: "Total",
    },
    {
      accessorKey: "status",
      header: "Delivery state",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;

        const color =
          status === "PENDING"
            ? "bg-yellow-200 text-yellow-800"
            : status === "DELIVERED"
            ? "bg-green-200 text-green-800"
            : "bg-red-200 text-red-800";

        return (
          <span
            className={`px-2 py-[2px] rounded-full text-xs font-bold w-fit ${color}`}
          >
            {status}
          </span>
        );
      },
    },

    // {
    //   accessorKey: "status",
    //   header: "Delivery state",
    // },
  ];
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "number",
    header: "№",
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "food",
    header: "Food",
  },
  {
    accessorKey: "date",
    header: "Date",
  },

  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "address",
    header: "Delivery address",
  },
  {
    accessorKey: "status",
    header: "Delivery state",
  },
];
