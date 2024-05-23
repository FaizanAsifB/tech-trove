import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import prismaDb from "@/lib/prisma";
import { fetchAdmins } from "@/lib/queries";
import { checkRole } from "@/lib/roles";
import { clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { setRole } from "../../_actions/role-action";
import { SearchUsers } from "../../_components/search-users";
import { columns } from "./_components/columns";

export default async function SettingsPage() {
  if (!checkRole("admin")) {
    redirect("/");
  }

  return (
    <section className="flex flex-1 flex-col space-y-6">
      <Heading
        title={"Settings"}
        description="Manage settings for your store"
      />

      <Button asChild variant={"outline"}>
        <Link href={"/admin/settings/admins"}>View Admins</Link>
      </Button>

      <Button asChild variant={"outline"}>
        <Link href={"/admin/settings/add-new"}>Add Admin</Link>
      </Button>
    </section>
  );
}
