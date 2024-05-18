"use client";

import { Button } from "@/components/ui/button";
import { deleteProduct } from "@/lib/actions";

function DeleteButton({ categoryId }: { categoryId: string }) {
  async function handleDelete() {
    await deleteProduct(`/api/categories/${categoryId}`);
  }
  return <Button onClick={handleDelete}>Delete</Button>;
}

export default DeleteButton;
