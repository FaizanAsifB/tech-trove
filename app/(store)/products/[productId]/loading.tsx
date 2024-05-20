import { Skeleton } from "@/components/ui/skeleton";

const ProductPageLoading = () => {
  return (
    <div className="container mt-8 space-y-24">
      <div className="grid gap-12 md:grid-cols-2 lg:gap-20 ">
        <Skeleton className="h-[400px] rounded-sm bg-stone-100" />
        <div className="flex flex-col py-4 ">
          <div className="space-y-2 ">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-2 w-16" />
            <Skeleton className="h-3 w-24" />
          </div>
          <div className="mb-4 mt-8 flex-1">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="mt-4 h-3/4 w-full" />
          </div>
          <Skeleton className="h-6 w-full" />
        </div>
      </div>
      <div>
        <Skeleton className="h-5 w-36" />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="h-32" />
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-8" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPageLoading;
