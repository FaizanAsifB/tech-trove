import { setRole } from "@/app/(admin)/_actions/role-action";
import { SearchUsers } from "@/app/(admin)/_components/search-users";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { User, clerkClient } from "@clerk/nextjs/server";
import { columns } from "./_components/columns";

const AddAdminPage = async (params: { searchParams: { search?: string } }) => {
  const query = params.searchParams.search;

  const users = query
    ? await clerkClient.users.getUserList({ query })
    : { data: [] as User[] };

  return (
    <section>
      <Heading
        title={"Add Admins"}
        description="Add new Admins to your store"
      />
      <SearchUsers />
      <DataTable columns={columns} data={users} filterVisible={false} />
      {users.data.map((user) => {
        return (
          <div key={user.id} className="flex items-center gap-4">
            <div>
              {user.firstName} {user.lastName}
            </div>
            <div>
              {
                user.emailAddresses.find(
                  (email) => email.id === user.primaryEmailAddressId,
                )?.emailAddress
              }
            </div>
            <div>{(user.publicMetadata.role as string) ?? "user"}</div>
            <div>
              <form action={setRole}>
                <input type="hidden" value={user.id} name="id" />
                <input type="hidden" value="admin" name="role" />
                <button type="submit">Make Admin</button>
              </form>
            </div>
            <div>
              <form action={setRole}>
                <input type="hidden" value={user.id} name="id" />
                <input type="hidden" value="user" name="role" />
                <button type="submit">Remove Admin</button>
              </form>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default AddAdminPage;
