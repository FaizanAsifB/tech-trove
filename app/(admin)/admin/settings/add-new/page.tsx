import { SearchUsers } from "@/app/(admin)/_components/search-users";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { fetchUsersSearch } from "@/lib/queries";
import { columns } from "./_components/columns";

const AddAdminPage = async (params: { searchParams: { search?: string } }) => {
  const query = params.searchParams.search;

  const users = query ? await fetchUsersSearch(query) : [];

  return (
    <section className="space-y-6">
      <Heading
        title={"Add Admins"}
        description="Add new Admins to your store"
      />
      <SearchUsers />
      <DataTable columns={columns} data={users} filterVisible={false} />
    </section>
  );
};

export default AddAdminPage;
