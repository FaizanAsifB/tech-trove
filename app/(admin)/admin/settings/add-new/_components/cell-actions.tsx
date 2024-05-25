"use client";

import { setRole } from "@/app/(admin)/_actions/role-action";
import { Button } from "@/components/ui/button";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { Role } from "@prisma/client";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { UserColumn } from "./columns";

type CellActionProps = {
  user: UserColumn;
  handleOptimisticUpdate: (userId: string, newRole: Role) => void;
};

const CellActions = ({ user, handleOptimisticUpdate }: CellActionProps) => {
  // const [optimisticRole, setOptimisticRole] = useState<Role>(user.role);

  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // useEffect(() => {
  //   setOptimisticRole(user.role);
  // }, [user.role]);

  const handleRoleChange = async (newRole: Role) => {
    setIsPending(true);
    handleOptimisticUpdate(user.userId, newRole);

    try {
      await setRole(user.userId, newRole);
      toast.success(
        `User ${newRole === "ADMIN" ? "added as" : "removed as"} an admin`,
      );
    } catch (error) {
      toast.error("Failed to change role. Please try again");
      // setOptimisticUser(user.role);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        onConfirm={() => handleRoleChange("USER")}
        infoText="remove this user as an admin."
      />
      {user.role === "ADMIN" && !isPending ? (
        <Button
          disabled={isPending}
          size={"sm"}
          variant={"destructive"}
          onClick={() => setOpen(true)}
        >
          {isPending ? (
            <>
              <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
              <span>Updating Role</span>
            </>
          ) : (
            "Remove Admin"
          )}
        </Button>
      ) : (
        <Button
          disabled={isPending}
          onClick={async () => handleRoleChange("ADMIN")}
        >
          {isPending ? (
            <>
              <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
              <span>Updating Role</span>
            </>
          ) : (
            "Make Admin"
          )}
        </Button>
      )}
    </>
  );
};
export default CellActions;
