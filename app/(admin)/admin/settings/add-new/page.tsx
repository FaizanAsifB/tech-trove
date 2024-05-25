import { SearchUsers } from "@/app/(admin)/_components/search-users";
import { Heading } from "@/components/ui/heading";
import { fetchUsersSearch } from "@/lib/queries";
import DataTableWrapper from "./_components/data-table-wrapper";

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
      <DataTableWrapper users={users} />
    </section>
  );
};

export default AddAdminPage;
