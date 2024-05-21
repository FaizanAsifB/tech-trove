import { fetchCategoryFilters } from "@/lib/queries";

import { Suspense } from "react";
import CategoryFilter from "./_components/category-filter";
import ProductsList from "./_components/products-list";
import ProductsSkeleton from "./_components/products-skeleton";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const categories = await fetchCategoryFilters();

  const currentPage = Number(searchParams["page"] || 1);
  const filteredCategories = searchParams["filter"] || "";

  return (
    <section className="mt-8 flex flex-1 flex-col">
      <div className="container flex flex-1 flex-col gap-12 lg:flex-row lg:gap-20">
        <div className="space-y-4">
          <h6>Product Categories</h6>
          <CategoryFilter
            categories={categories}
            filteredCategories={filteredCategories}
          />
        </div>
        <Suspense fallback={<ProductsSkeleton />}>
          <ProductsList
            filteredCategories={filteredCategories}
            currentPage={currentPage}
          />
        </Suspense>
      </div>
    </section>
  );
};

export default ProductsPage;
