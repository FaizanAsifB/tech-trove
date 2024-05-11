import { Button } from "@/components/ui/button";
import { fetchCategories } from "@/lib/queries";
import Link from "next/link";
import CategoryCard from "./category-card";

const CategoryCards = async () => {
  const categories = await fetchCategories();
  return (
    <section className="container space-y-8">
      <div className="flex flex-col items-start justify-between lg:flex-row lg:items-center">
        <h2>Shop by Category</h2>
        <Button asChild variant={"link"} className="px-0">
          <Link href={"/products"}>See all products</Link>
        </Button>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            imgUrl={category.images[0].url}
          />
        ))}
      </div>
    </section>
  );
};
export default CategoryCards;
