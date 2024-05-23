"use client";

import { setRole } from "@/app/(admin)/_actions/role-action";
import { Button } from "@/components/ui/button";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
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
        onConfirm={async () => {
          await setRole(user.userId, "USER");
          router.refresh();
          toast.success("User removed as an admin");
        }}
        infoText="remove this user as an admin."
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
        <Button
          onClick={async () => {
            await setRole(user.userId, "ADMIN");
            router.refresh();
            toast.success("User added as an admin");
          }}
        >
          Make Admin
        </Button>
      )}
    </>
  );
};
export default CellActions;
