"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/useCart";
import { ShoppingCart as ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

const ShoppingCart = () => {
  const itemsInCart = useCart((state) => state.items);

  const totalQuantity = itemsInCart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <Button variant={"icon"} size={"icon"} asChild className="relative z-10">
      <Link href={"/cart"} aria-label="Go to cart">
        <ShoppingCartIcon size={32} />
        {itemsInCart.length > 0 && (
          <Badge
            variant="default"
            aria-label="Total items in cart"
            className="absolute right-0 top-0 flex min-w-6 -translate-y-1/2  translate-x-1/2 items-center justify-center rounded-full px-1.5"
          >
            {totalQuantity}
          </Badge>
        )}
      </Link>
    </Button>
  );
};

export default ShoppingCart;
