import { Suspense } from "react";
import CategoryCards from "./_components/category-cards";
import FeaturedProductsSection from "./_components/featured-products-section";
import Hero from "./_components/hero";
import ShopFeatures from "./_components/shop-features";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const currentPage = Number(searchParams["feature-page"] || 1);
  return (
    <div className="space-y-16 ">
      <Hero />
      <CategoryCards />
      <FeaturedProductsSection currentPage={currentPage} />
      <ShopFeatures />
    </div>
  );
}
