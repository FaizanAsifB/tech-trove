import prismaDb from "@/lib/prisma";
import { FEATURED_PER_PAGE } from "@/utils/constants";
import { Image as ImageDb, Product } from "@prisma/client";
import ProductCard from "./product-card";

const FeaturedProducts = async ({ currentPage }: { currentPage: number }) => {
  const featuredProducts = await prismaDb.product.findMany({
    where: {
      isFeatured: true,
    },
    take: FEATURED_PER_PAGE,
    skip: FEATURED_PER_PAGE * (currentPage - 1) || 0,
    include: {
      images: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {featuredProducts.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};
export default FeaturedProducts;
