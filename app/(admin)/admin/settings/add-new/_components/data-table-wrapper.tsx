"use client";

import { DataTable } from "@/components/ui/data-table";
import { Role, User } from "@prisma/client";
import { useEffect, useOptimistic, useState } from "react";
import { getUsersColumns } from "./columns";

const DataTableWrapper = ({ users }: { users: User[] }) => {
  const [optimisticUsers, setOptimisticUsers] = useState(users);

  const handleOptimisticUpdate = async (userId: string, newRole: Role) => {
    setOptimisticUsers((prev) =>
      prev.map((user) => {
        if (user.userId === userId) {
          return { ...user, role: newRole };
        }
        return user;
      }),
    );
  };

  useEffect(() => {
    setOptimisticUsers(users);
  }, [users]);

  const columns = getUsersColumns(handleOptimisticUpdate);
  return (
    <DataTable columns={columns} data={optimisticUsers} filterVisible={false} />
  );
};

export default DataTableWrapper;
