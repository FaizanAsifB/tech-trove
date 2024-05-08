import { Button } from "@/components/ui/button";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { Separator } from "@/components/ui/separator";
import useCart from "@/hooks/useCart";
import { type CartItem } from "@/lib/definitions";
import { formatter } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ItemQuantityInput from "./item-quantity-input";

const CartItem = ({ product }: { product: CartItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const deleteItemInCart = useCart((state) => state.deleteItem);

  return (
    <>
      <DeleteDialog
        onConfirm={() => deleteItemInCart(product.id)}
        open={isOpen}
        setOpen={setIsOpen}
        deletedItem={product.title}
      />
      <article className="space-y-4 rounded-lg border p-4 md:p-6">
        <div className=" grid items-center gap-4 md:grid-cols-[auto_1fr_auto]">
          <div className="relative size-32 lg:size-24">
            <Image
              src={product.images[0].url}
              alt={product.title}
              fill
              className="object-contain"
            />
          </div>
          <div>
            <p>{product.title}</p>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          <ItemQuantityInput
            quantity={product.quantity}
            id={product.id}
            setIsOpen={setIsOpen}
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">Total Price</p>
          <p>{formatter.format(product.price * product.quantity)}</p>
        </div>

        <div className="flex items-center justify-end">
          <Button
            variant="destructive"
            size={"sm"}
            className="gap-2"
            onClick={() => setIsOpen(true)}
          >
            <Trash2 className="size-4" />
            Remove
          </Button>
        </div>
      </article>
    </>
  );
};

export default CartItem;
