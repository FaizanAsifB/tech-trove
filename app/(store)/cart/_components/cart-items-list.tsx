"use client";

import useCart from "@/hooks/useCart";
import { deleteOrder } from "@/lib/queries";
import { useSearchParams } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { toast } from "sonner";
import CartItem from "./cart-item";

const CartItemsList = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();

  const cartItems = useCart((state) => state.items);

  useEffect(() => {
    if (searchParams.get("canceled")) {
      toast.error(
        "Order canceled -- continue to shop around and checkout when you&apos;re ready.",
      );
    }
  }, [searchParams]);

  return (
    <>
      <h1 className="mb-8">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-12 lg:flex-row">
          <ul className="space-y-4 lg:w-3/5">
            {cartItems.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </ul>
          {children}
        </div>
      )}
    </>
  );
};

export default CartItemsList;
