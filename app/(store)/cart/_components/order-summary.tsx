"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useCart from "@/hooks/useCart";
import getStripe from "@/lib/load-stripe";
import { formatter } from "@/lib/utils";
import { SHIPPING_COST } from "@/utils/constants";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

const loadStripe = getStripe();

const OrderSummary = () => {
  const [isLoading, setIsLoading] = useState(false);

  const cartItems = useCart((state) => state.items);
  const cartCount = cartItems.length;

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const shippingCost = subTotal >= 100 ? 0 : SHIPPING_COST;

  const totalPrice = subTotal + shippingCost;

  const redirectToCheckout = async () => {
    setIsLoading(true);
    const cartItemData = cartItems.map((item) => {
      return { id: item.id, quantity: item.quantity };
    });
    try {
      const checkoutResponse = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItemData, totalPrice }),
      });

      const stripe = await loadStripe;
      if (!stripe) throw new Error("Stripe failed to initialize.");

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
      <div className="space-y-1.5">
        <div className="flex justify-between">
          <p className="text-muted-foreground">Subtotal Total</p>
          <p>{formatter.format(subTotal)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-muted-foreground">Shipping</p>
          <p>{formatter.format(shippingCost)}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p>Grand Total</p>
        <p>{formatter.format(totalPrice)}</p>
      </div>
      <Button
        className="w-full"
        size={"lg"}
        onClick={() => cartCount > 0 && redirectToCheckout()}
        disabled={cartCount === 0 || isLoading === true || subTotal === 0}
      >
        {isLoading ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" />
            <span className="ml-2">Proceeding to Checkout</span>
          </>
        ) : (
          "Proceed to Checkout"
        )}
      </Button>
    </div>
  );
};

export default OrderSummary;
