"use client";

import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteProduct } from "@/lib/actions";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductColumn } from "./columns";
import { toast } from "sonner";

type CellActionProps = {
  product: ProductColumn;
};

const CellActions = ({ product }: CellActionProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        onConfirm={() => {
          deleteProduct(product.id);
          toast.success("Product deleted");
          router.refresh();
        }}
        deletedItem="category"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(product.id)}
          >
            Copy product ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push(`/admin/products/edit/${product.id}`)}
          >
            Edit product
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive focus:bg-destructive focus:text-destructive-foreground"
            onClick={() => {
              setOpen(true);
            }}
          >
            Delete product
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default CellActions;
