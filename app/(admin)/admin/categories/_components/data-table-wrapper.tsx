"use client";

import { DataTable } from "@/components/ui/data-table";
import { deleteCategory } from "@/lib/actions";
import { Category, Image } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useOptimistic } from "react";
import { toast } from "sonner";
import { getCategoryColumns } from "./columns";

const DataTableWrapper = ({
  categories,
}: {
  categories: (Category & { images: Image[] })[];
}) => {
  const [optimisticCategories, setOptimisticCategories] = useOptimistic(
    categories,
    (state, optimisticValue: string) => {
      return state.filter((item) => item.id !== optimisticValue);
    },
  );
  const router = useRouter();

  async function handleDeleteProduct(categoryId: string) {
    setOptimisticCategories(categoryId);
    await deleteCategory(categoryId);
    router.refresh();
    toast.success("Category deleted");
  }
  const columns = getCategoryColumns(handleDeleteProduct);

  return (
    <DataTable
      columns={columns}
      data={optimisticCategories}
      placeHolder="categories"
    />
  );
};

export default DataTableWrapper;
