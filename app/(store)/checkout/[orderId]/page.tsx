import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchOrder } from "@/lib/queries";
import { formatter } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import OrderSuccessToast from "../_components/order-success-toast";

const CheckoutResultPage = async ({
  params,
}: {
  params: { orderId: string };
}) => {
  const orderId = params.orderId;

  const order = await fetchOrder(orderId);
  const orderItems = order?.orderItems;

  if (!orderItems) {
    return null;
  }

  const totalPrice = orderItems.reduce((total, item) => {
    return total + Number(item.product.price) * item.quantity;
  }, 0);

  return (
    <section>
      <div className="bg-gray-100 py-12 md:py-24">
        <OrderSuccessToast />
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <div className="inline-flex items-center justify-center rounded-full bg-green-100 p-2 ">
              <CheckIcon className="h-6 w-6 text-green-500 " />
            </div>
            <h1 className="text-3xl font-bold md:text-4xl">
              Thank you for your order!
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Your order has been successfully processed.
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto grid max-w-2xl gap-8">
          <div className="rounded-lg  bg-white shadow-sm">
            <div className="border-b border-gray-200 p-6 ">
              <h2 className="text-lg font-semibold">Order Summary</h2>
            </div>
            <div className="space-y-4 p-6">
              {orderItems?.map((orderItem) => {
                const product = {
                  ...orderItem.product,
                  price: parseFloat(String(orderItem.product.price)),
                };
                return (
                  <div
                    key={product.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        alt="Product Image"
                        className="size-32 rounded-md object-contain lg:size-24"
                        height={96}
                        src={product.images[0].url}
                        width={96}
                      />
                      <div>
                        <h3 className="font-medium">{product.title}</h3>
                        <p className="text-sm  text-gray-500">
                          Quantity: {orderItem.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {formatter.format(parseFloat(String(product.price)))}
                      </p>
                    </div>
                  </div>
                );
              })}

              <Separator />
              <div className="flex items-center justify-between">
                <p className="font-medium">Total</p>
                <p className="text-2xl font-medium">
                  {formatter.format(totalPrice)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutResultPage;
