"use client";

import { setRole } from "@/app/(admin)/_actions/role-action";
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
import { useOptimistic, useState } from "react";
import { toast } from "sonner";
import { UserColumn } from "./columns";

type CellActionProps = {
  user: UserColumn;
  handleRemoveAdmin: (userId: string) => void;
};

const CellActions = ({ user, handleRemoveAdmin }: CellActionProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        onConfirm={async () => {
          await handleRemoveAdmin(user.userId);
        }}
        infoText="remove this user as an admin"
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
            onClick={() => navigator.clipboard.writeText(user.email!)}
          >
            Copy Email Address
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:bg-destructive focus:text-destructive-foreground"
            onClick={() => {
              setOpen(true);
            }}
          >
            Remove Admin
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default CellActions;
