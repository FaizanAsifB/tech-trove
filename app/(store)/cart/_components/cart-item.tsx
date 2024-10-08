import { Button } from "@/components/ui/button";
import { DeleteDialog } from "@/components/ui/delete-dialog";
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
        infoText={`delete ${product.title} from the cart`}
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
            <p className="text-muted-foreground">{product.category.title}</p>
          </div>
          <div>
            <ItemQuantityInput
              quantity={product.quantity}
              id={product.id}
              setIsOpen={setIsOpen}
            />
            {product.quantity === 0 ? (
              <small className="text-destructive">Enter a valid quantity</small>
            ) : null}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">Total Price</p>
          <p>{formatter.format(product.price * product.quantity)}</p>
        </div>

        <div className="flex items-center justify-center lg:justify-end">
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
