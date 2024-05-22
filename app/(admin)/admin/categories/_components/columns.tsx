"use client";

import { Button } from "@/components/ui/button";
import { formattedDate } from "@/lib/utils";
import type { Category, Image as CategoryImage } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import CellActions from "./cell-actions";
import RowImages from "./row-images";

export type CategoryColumn = Category & { images: CategoryImage[] };

export const getCategoryColumns = (
  handleDeleteCategory: (categoryId: string) => void,
) => {
  const columns: ColumnDef<CategoryColumn>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <div className="flex items-center">
            <span>Title</span>
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
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "images",
      header: "Media",
      cell: ({ row }) => {
        const images: CategoryImage[] = row.getValue("images");
        return <RowImages images={images} />;
      },
    },
    {
      accessorKey: "navPos",
      header: ({ column }) => {
        return (
          <div className="flex items-center">
            <span>Nav Position</span>
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
          category={row.original}
          handleDeleteCategory={handleDeleteCategory}
        />
      ),
    },
  ];
  return columns;
};
