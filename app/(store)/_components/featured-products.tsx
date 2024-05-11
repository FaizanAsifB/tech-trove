import { fetchFeaturedProducts } from "@/lib/queries";
import ProductCard from "./product-card";

const FeaturedProducts = async ({ currentPage }: { currentPage: number }) => {
  const featuredProducts = await fetchFeaturedProducts(currentPage);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {featuredProducts.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};
export default FeaturedProducts;
