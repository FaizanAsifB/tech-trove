"use client";

import { Button } from "@/components/ui/button";
import { ProductPageInfo } from "@/lib/definitions";
import { formattedDate } from "@/lib/utils";
import { Product, Image as ProductImage } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CheckCircleIcon } from "lucide-react";
import Image from "next/image";
import CellActions from "./cell-actions";

export type ProductColumn = Omit<Product, "price"> & { price: number } & {
  images: ProductImage[];
};

export const getProductColumns = (
  handleDeleteProduct: (productId: string) => void,
) => {
  const columns: ColumnDef<ProductColumn>[] = [
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
      accessorKey: "category.title",
      header: ({ column }) => {
        return (
          <div className="flex items-center">
            <span>Category</span>
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
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <div className="flex items-center">
            <span>Price</span>
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
      accessorKey: "isFeatured",
      header: ({ column }) => {
        return (
          <div className="flex items-center">
            <span>Featured</span>
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
        return row.getValue("isFeatured") ? (
          <CheckCircleIcon className="mx-auto h-6 w-6 text-green-600" />
        ) : null;
      },
    },
    {
      accessorKey: "images",
      header: "Media",
      cell: ({ row }) => {
        const images: ProductImage[] = row.getValue("images");
        return images.map((img) => (
          <div key={img.id} className="relative h-16 w-16 overflow-hidden">
            <Image
              fill
              className="object-contain object-center"
              src={img.url}
              alt=""
            />
          </div>
        ));
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
          product={row.original}
          handleDeleteProduct={handleDeleteProduct}
        />
      ),
    },
  ];

  return columns;
};
