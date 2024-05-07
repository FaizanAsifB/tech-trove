import { Button } from "@/components/ui/button";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useCart from "@/hooks/useCart";
import { type CartItem } from "@/lib/definitions";
import { formatter } from "@/lib/utils";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const disallowedSymbols = ["e", "+", "-", ".", "E", ","];

const CartItem = ({ product }: { product: CartItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const deleteItemInCart = useCart((state) => state.deleteItem);
  const incrementItem = useCart((state) => state.incrementItem);
  const decrementItem = useCart((state) => state.decrementItem);
  const setQuantity = useCart((state) => state.setQuantity);

  return (
    <>
      <DeleteDialog
        onConfirm={() => deleteItemInCart(product.id)}
        open={isOpen}
        setOpen={setIsOpen}
        deletedItem={product.title}
      />
      <article className=" grid grid-cols-[auto_1fr] items-center gap-4 md:grid-cols-[auto_1fr_auto_auto]">
        <div className="relative size-32 lg:size-16">
          <Image
            src={product.images[0].url}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>
        <div className="font-semibold">
          <p>{product.title}</p>
          <p>{formatter.format(product.price * product.quantity)}</p>
        </div>
        <div className="col-span-2 flex items-center justify-center gap-2">
          <div className="relative flex max-w-32 items-center rounded-md border border-foreground">
            <Button
              onClick={() => {
                if (product.quantity === 1) {
                  setIsOpen(true);
                }
                if (product.quantity > 1) {
                  decrementItem(product.id);
                }
              }}
              variant={"ghost"}
              size={"icon"}
              className="absolute left-0 "
            >
              <Minus />
            </Button>
            <Input
              inputMode="numeric"
              type="number"
              className="border-none px-12 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              value={product.quantity}
              onChange={(e) => setQuantity(product.id, Number(e.target.value))}
              min="1"
              step="1"
              onPaste={(e) => e.preventDefault()}
              onKeyDown={(e) => {
                if (
                  e.key === "Backspace" ||
                  (e.key === "Delete" && product.quantity < 10)
                ) {
                  e.preventDefault();
                  setQuantity(product.id, 1);
                }
                disallowedSymbols.includes(e.key) && e.preventDefault();
              }}
            />
            <Button
              onClick={() => incrementItem(product.id)}
              variant={"ghost"}
              size={"icon"}
              className="absolute right-0"
            >
              <Plus />
            </Button>
          </div>
          <Button
            variant="ghost"
            size={"icon-sm"}
            className="hover:bg- text-destructive hover:scale-110 hover:text-destructive"
            onClick={() => setIsOpen(true)}
          >
            <Trash2 />
          </Button>
        </div>
      </article>
      <Separator />
    </>
  );
};

export default CartItem;
