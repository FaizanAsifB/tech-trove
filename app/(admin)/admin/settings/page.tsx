import { DataTable } from "@/components/ui/data-table";
import prismaDb from "@/lib/prisma";
import { fetchAdmins } from "@/lib/queries";
import { checkRole } from "@/lib/roles";
import { clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { setRole } from "../../_actions/role-action";
import { SearchUsers } from "../../_components/search-users";
import { columns } from "./_components/columns";

export default async function SettingsPage(params: {
  searchParams: { search?: string };
}) {
  if (!checkRole("admin")) {
    redirect("/");
  }

  const query = params.searchParams.search;

  const admins = await fetchAdmins();

  const users = query
    ? await clerkClient.users.getUserList({ query })
    : { data: [] };

  return (
    <>
      <h1>Settings</h1>

      <DataTable
        columns={columns}
        data={admins}
        filterValue="email"
        placeHolder="admins"
      />

      {/* {admins.map((admin) => (
        <div key={admin.id}>{admin.email}</div>
      ))} */}

      <SearchUsers />

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
    </>
  );
}
