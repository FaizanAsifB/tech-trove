import { Skeleton } from "@/components/ui/skeleton";

const CartPageLoading = () => {
  return (
    <div className="container mt-8 space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-16 w-96" />
        <Skeleton className="h-5 w-80" />
      </div>

      <div className="flex flex-col gap-12 lg:flex-row">
        <div className="space-y-4 lg:w-3/5">
          <div className="space-y-4 rounded-lg border p-4 md:p-6">
            <div className=" grid items-center gap-4 md:grid-cols-[auto_1fr_auto] lg:gap-6">
              <Skeleton className="size-32 lg:size-24" />
              <div className="space-y-4">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5" />
              </div>
              <Skeleton className="h-10 w-36" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-16" />
            </div>

            <div className="flex items-center justify-center lg:justify-end">
              <Skeleton className="h-9 w-[80px]" />
            </div>
          </div>
        </div>
        <div className="space-y-4 rounded-md bg-muted p-4 lg:grid lg:flex-1 lg:self-start">
          <Skeleton className="h-8 w-48 bg-background" />
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-24 bg-background" />
              <Skeleton className="h-5 w-16 bg-background" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-5 w-24 bg-background" />
              <Skeleton className="h-5 w-16 bg-background" />
            </div>
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-5 w-24 bg-background" />
            <Skeleton className="h-5 w-16 bg-background" />
          </div>
          <Skeleton className="h-9 w-full bg-background" />
        </div>
      </div>
    </div>
  );
};

export default CartPageLoading;
