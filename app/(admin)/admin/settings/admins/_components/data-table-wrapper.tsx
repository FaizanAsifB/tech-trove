"use client";

import { setRole } from "@/app/(admin)/_actions/role-action";
import { DataTable } from "@/components/ui/data-table";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useOptimistic } from "react";
import { toast } from "sonner";
import { getAdminColumns } from "./columns";

const DataTableWrapper = ({ admins }: { admins: User[] }) => {
  const [optimisticAdmins, setOptimisticAdmins] = useOptimistic(
    admins,
    (state, optimisticValue) => {
      return state.filter((user) => user.id !== optimisticValue);
    },
  );
  const router = useRouter();

  async function handleRemoveAdmin(userId: string) {
    setOptimisticAdmins(userId);
    await setRole(userId, "USER");

    router.refresh();
    toast.success("User removed as an admin");
  }
  const columns = getAdminColumns(handleRemoveAdmin);

  return (
    <DataTable
      columns={columns}
      data={optimisticAdmins}
      filterValue="email"
      placeHolder="admins"
    />
  );
};

export default DataTableWrapper;
