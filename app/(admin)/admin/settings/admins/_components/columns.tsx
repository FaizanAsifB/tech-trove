"use client";

import { Button } from "@/components/ui/button";
import { formattedDate } from "@/lib/utils";
import type { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import CellActions from "./cell-actions";

export type UserColumn = User;

export const getAdminColumns = (
  handleRemoveAdmin: (userId: string) => void,
) => {
  const columns: ColumnDef<UserColumn>[] = [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <div className="flex items-center">
            <span>Name</span>
            <Button
              variant="ghost"
              size={"icon-sm"}
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },

    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <div className="flex items-center">
            <span>Email</span>
            <Button
              variant="ghost"
              size={"icon-sm"}
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => {
        return (
          <div className="flex items-center">
            <p>Last Updated</p>
            <Button
              variant="ghost"
              size={"icon-sm"}
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const formatted = formattedDate(row.getValue("updatedAt"));

        return <div>{formatted}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <CellActions
          user={row.original}
          handleRemoveAdmin={handleRemoveAdmin}
        />
      ),
    },
  ];
  return columns;
};
