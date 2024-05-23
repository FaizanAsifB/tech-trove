"use client";

import { Button } from "@/components/ui/button";
import { formattedDate } from "@/lib/utils";
import type { Order } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type OrderColumn = Omit<Order, "updatedAt" | "totalPrice"> & {
  totalPrice: string;
  products: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "orderNr",
    header: "Order Number",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          <p>Order Date</p>
          <Button
            variant="ghost"
            size={"icon-sm"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const formatted = formattedDate(new Date(row.getValue("createdAt")));

      return <div>{formatted}</div>;
    },
  },
];
