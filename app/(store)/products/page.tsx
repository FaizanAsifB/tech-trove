import Pagination from "@/components/ui/pagination";
import prismaDb from "@/lib/prisma";
import {
  fetchCategoryFilters,
  fetchFilteredProducts,
  fetchProducts,
  getProductCount,
} from "@/lib/queries";
import { PRODUCTS_PER_PAGE } from "@/utils/constants";
import ProductCard from "../_components/product-card";
import CategoryFilter from "./_components/category-filter";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const categories = await fetchCategoryFilters();

  const currentPage = Number(searchParams["page"] || 1);
  const filteredCategories = searchParams["filter"] || "";

  const products = filteredCategories
    ? await fetchFilteredProducts(filteredCategories)
    : await fetchProducts();
  const productCount = await getProductCount(filteredCategories);

  return (
    <section className="mt-8 flex flex-1 flex-col">
      <div className="container flex flex-1 flex-col gap-12 lg:flex-row lg:gap-20">
        <div className="space-y-4">
          <h6>Product Categories</h6>
          <CategoryFilter categories={categories} />
        </div>
        <div className="flex flex-1 flex-col space-y-4">
          <Pagination
            currentPage={currentPage}
            itemsPerPage={PRODUCTS_PER_PAGE}
            totalItems={productCount}
            title={"Product"}
            queryParamKey={"page"}
          >
            {productCount === 0 ? (
              <div className="flex flex-1 items-center justify-center">
                <p>No products found</p>
              </div>
            ) : (
              <div className="grid flex-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            )}
          </Pagination>
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
