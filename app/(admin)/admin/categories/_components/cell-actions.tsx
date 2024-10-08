"use client";

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
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CategoryColumn } from "./columns";

type CellActionProps = {
  category: CategoryColumn;
  handleDeleteCategory: (categoryId: string) => void;
};

const CellActions = ({ category, handleDeleteCategory }: CellActionProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        onConfirm={() => handleDeleteCategory(category.id)}
        infoText={`delete ${category.title}`}
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
            onClick={() => navigator.clipboard.writeText(category.id)}
          >
            Copy category ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push(`/admin/categories/edit/${category.id}`)}
          >
            Edit category
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive focus:bg-destructive focus:text-destructive-foreground"
            onClick={() => {
              setOpen(true);
            }}
          >
            Delete category
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default CellActions;
