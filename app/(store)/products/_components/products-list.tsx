import Pagination from "@/components/ui/pagination";
import {
  fetchFilteredProducts,
  fetchProducts,
  getProductCount,
} from "@/lib/queries";
import { PRODUCTS_PER_PAGE } from "@/utils/constants";
import { Suspense } from "react";
import ProductCard from "../../_components/product-card";
import ProductsSkeleton from "./products-skeleton";

type ProductsListProp = {
  filteredCategories: string | string[] | undefined;
  currentPage: number;
};

const ProductsList = async ({
  filteredCategories,
  currentPage,
}: ProductsListProp) => {
  const products = filteredCategories
    ? await fetchFilteredProducts(filteredCategories)
    : await fetchProducts();

  const productCount = await getProductCount(filteredCategories);
  return (
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
  );
};

export default ProductsList;
