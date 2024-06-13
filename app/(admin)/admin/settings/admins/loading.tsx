import { Skeleton } from "@/components/ui/skeleton";

const AdminsLoading = () => {
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <Skeleton className="h-24 w-48 " />
        <Skeleton className="h-10 w-24" />
      </div>

      <Skeleton className="h-10 w-96 " />

      <Skeleton className="h-96 w-full rounded-sm" />
    </>
  );
};
export default AdminsLoading;
