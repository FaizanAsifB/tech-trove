"use client";

import { DataTable } from "@/components/ui/data-table";
import { deleteProduct } from "@/lib/actions";
import { ProductPageInfo } from "@/lib/definitions";
import { useRouter } from "next/navigation";
import { useOptimistic } from "react";
import { toast } from "sonner";
import { getProductColumns } from "./columns";

const DataTableWrapper = ({ products }: { products: ProductPageInfo[] }) => {
  const [optimisticProducts, setOptimisticProducts] = useOptimistic(
    products,
    (state, optimisticValue) => {
      return state.filter((item) => item.id !== optimisticValue);
    },
  );
  const router = useRouter();

  async function handleDeleteProduct(productId: string) {
    setOptimisticProducts(productId);
    await deleteProduct(productId);
    router.refresh();
    toast.success("Product deleted");
  }
  const columns = getProductColumns(handleDeleteProduct);

  return (
    <DataTable
      columns={columns}
      data={optimisticProducts}
      placeHolder="products"
    />
  );
};

export default DataTableWrapper;
