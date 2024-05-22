import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import prismaDb from "@/lib/prisma";
import Link from "next/link";
import DataTableWrapper from "./components/data-table-wrapper";
import { fetchProducts } from "@/lib/queries";

const ProductsPage = async () => {
  const products = await fetchProducts();

  const formattedProducts = products.map((product) => {
    return { ...product, price: parseFloat(String(product?.price)) };
  });
  return (
    <section className="flex flex-1 flex-col space-y-6">
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${products.length})`}
          description="Manage your products"
        />
        <Button asChild>
          <Link href="products/create">Add Product</Link>
        </Button>
      </div>

      <div className="flex flex-1 flex-col">
        {products.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-1 text-center">
            <p>No Products found.</p>
            <Button asChild>
              <Link href="products/create">Add Product</Link>
            </Button>
          </div>
        ) : (
          <DataTableWrapper products={formattedProducts} />
        )}
      </div>
    </section>
  );
};
export default ProductsPage;
