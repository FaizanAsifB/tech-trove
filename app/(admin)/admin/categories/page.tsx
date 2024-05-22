import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { fetchCategories } from "@/lib/queries";
import Link from "next/link";
import DataTableWrapper from "./_components/data-table-wrapper";

const CategoriesPage = async () => {
  const categories = await fetchCategories();

  return (
    <section className="flex flex-1 flex-col space-y-6">
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${categories.length})`}
          description="Manage categories for your products"
        />
        <Button asChild>
          <Link href="categories/create">Add Category</Link>
        </Button>
      </div>

      <div className="flex flex-1 flex-col">
        {categories.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-1 text-center">
            <p>No Categories found.</p>
            <Button asChild>
              <Link href="categories/create">Create Category</Link>
            </Button>
          </div>
        ) : (
          <DataTableWrapper categories={categories} />
        )}
      </div>
    </section>
  );
};
export default CategoriesPage;
