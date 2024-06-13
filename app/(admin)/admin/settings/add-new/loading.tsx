import { Skeleton } from "@/components/ui/skeleton";

const AdminsLoading = () => {
  return (
    <>
      <Skeleton className="h-24 w-48 " />
      <div className="flex w-full items-center">
        <Skeleton className="h-24 " />
        <Skeleton className="h-10" />
      </div>

      <Skeleton className="h-96 w-full rounded-sm" />
    </>
  );
};
export default AdminsLoading;
