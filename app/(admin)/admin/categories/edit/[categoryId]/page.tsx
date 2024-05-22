import prismaDb from "@/lib/prisma";
import CategoryForm from "../../_components/CategoryForm";

const EditCategoryPage = async ({
  params,
}: {
  params: { categoryId: string };
}) => {
  const { categoryId } = params;
  const category = await prismaDb.category.findFirst({
    where: {
      id: categoryId,
    },
    include: {
      images: true,
    },
  });
  return <CategoryForm initialData={category} />;
};
export default EditCategoryPage;
