import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import prismaDb from "@/lib/prisma";
import Link from "next/link";
import { columns } from "./components/columns";

const CategoriesPage = async () => {
  const categories = await prismaDb.category.findMany({
    include: {
      images: {
        orderBy: {
          id: "desc",
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

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
          <DataTable
            columns={columns}
            data={categories}
            placeHolder="categories"
          />
        )}
      </div>
    </section>
  );
};
export default CategoriesPage;
