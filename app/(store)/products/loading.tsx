import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProductsLoading = () => {
  return (
    <div className="mt-8 flex flex-1 flex-col">
      <div className="container flex flex-1 flex-col gap-12 lg:flex-row lg:gap-20">
        <div className="space-y-4">
          <Skeleton className="h-5 w-36" />
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} className="h-4 w-24" />
            ))}
        </div>
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
      </div>
    </div>
  );
};

export default ProductsLoading;
