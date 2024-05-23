import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { checkRole } from "@/lib/roles";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  if (!checkRole("ADMIN")) {
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
