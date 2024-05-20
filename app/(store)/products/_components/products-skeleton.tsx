import { Skeleton } from "@/components/ui/skeleton";

const ProductsSkeleton = () => {
  return (
    <div className="flex flex-1 flex-col space-y-4">
      <Skeleton className="h-5 w-40" />

      <div className="grid flex-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array(4)
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
  );
};

export default ProductsSkeleton;
