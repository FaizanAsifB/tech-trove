import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { fetchAdmins } from "@/lib/queries";
import { checkRole } from "@/lib/roles";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import DataTableWrapper from "./_components/data-table-wrapper";

const AdminsPage = async () => {
  if (!checkRole("ADMIN")) {
    redirect("/");
  }

  const admins = await fetchAdmins();
  return (
    <section>
      <Heading title={"Admins"} description="Manage Admins of your store">
        <Button asChild>
          <Link href={"/admin/settings/add-new"}>Add Admin</Link>
        </Button>
      </Heading>
      <DataTableWrapper admins={admins} />
    </section>
  );
};

export default AdminsPage;
