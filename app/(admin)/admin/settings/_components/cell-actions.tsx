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
import { UserColumn } from "./columns";
import { toast } from "sonner";

type CellActionProps = {
  user: UserColumn;
};

const CellActions = ({ user }: CellActionProps) => {
  const [optimisticUser, addOptimisticUser] = useOptimistic(user);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        onConfirm={async () => {
          await setRole(optimisticUser.userId, "USER");
          router.refresh();
          toast.success("User removed as an admin");
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
            onClick={() => navigator.clipboard.writeText(optimisticUser.email!)}
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
