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
import { useState } from "react";
import { UserColumn } from "./columns";

type CellActionProps = {
  user: UserColumn;
};

const CellActions = ({ user }: CellActionProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        onConfirm={() => {}}
        deletedItem="Removed user as admin."
      />
      {user.role === "ADMIN" ? (
        <Button
          size={"sm"}
          variant={"destructive"}
          onClick={() => setOpen(true)}
        >
          Remove Admin
        </Button>
      ) : (
        <Button onClick={() => setRole(user.userId, "ADMIN")}>
          Make Admin
        </Button>
      )}
    </>
  );
};
export default CellActions;
