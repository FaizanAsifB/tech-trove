"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useCart from "@/hooks/useCart";
import getStripe from "@/lib/load-stripe";
import { formatter } from "@/lib/utils";
import { useState } from "react";

const loadStripe = getStripe();

const OrderSummary = () => {
  const [isLoading, setIsLoading] = useState(false);

  const cartItems = useCart((state) => state.items);
  const cartCount = cartItems.length;

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const redirectToCheckout = async () => {
    setIsLoading(true);
    const cartItemData = cartItems.map((item) => {
      return { id: item.id, quantity: item.quantity };
    });
    try {
      const stripe = await loadStripe;

      if (!stripe) throw new Error("Stripe failed to initialize.");

      const checkoutResponse = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItemData, totalPrice }),
      });

      const { sessionId } = await checkoutResponse.json();
      const stripeError = await stripe.redirectToCheckout({ sessionId });

      if (stripeError) {
        console.error(stripeError);
      }
    } catch (error) {
      setIsLoading(false);

      console.error(error);
    }
  };

  return (
    <div className="space-y-4 rounded-md bg-muted p-4 lg:grid lg:flex-1 lg:self-start">
      <h4>Order Summary</h4>
      <Separator />
      <div className="flex justify-between">
        <p>Grand Total</p>
        <p>{formatter.format(totalPrice)}</p>
      </div>
      <Button
        className="rounded-full"
        onClick={() => cartCount > 0 && redirectToCheckout()}
        disabled={cartCount === 0 || isLoading === true}
      >
        Checkout
      </Button>
    </div>
  );
};

export default OrderSummary;
