import { Skeleton } from "@/components/ui/skeleton";

const OrdersLoading = () => {
  return (
    <>
      <Skeleton className="h-[20px] w-full rounded-full" />
      <Skeleton className="h-[500px] w-full rounded-full" />
    </>
  );
};
export default OrdersLoading;
