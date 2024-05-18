import { Button } from "@/components/ui/button";
import { deleteCategory } from "@/lib/actions";

function DeleteButton({ categoryId }: { categoryId: string }) {
  async function handleDelete() {
    await deleteCategory(`/api/categories/${categoryId}`);
  }
  return <Button onClick={handleDelete}>Delete</Button>;
}

export default DeleteButton;
