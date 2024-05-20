"use client";

import { Button } from "@/components/ui/button";
import useCart from "@/hooks/useCart";
import { ProductPageInfo } from "@/lib/definitions";

type AddToCartProps = {
  product: ProductPageInfo;
};

const AddToCart = ({ product }: AddToCartProps) => {
  const addItem = useCart((state) => state.addItem);

  return (
    <Button className="w-full" onClick={() => addItem(product)}>
      Add To Cart
    </Button>
  );
};

export default AddToCart;
