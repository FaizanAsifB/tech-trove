"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { ArrowLeft, Store } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AdminMobileNav from "./admin-mobile-nav";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean).length;

  return (
    <header className="flex h-14 items-center justify-between gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      {pathSegments > 2 ? (
        <Button variant={"icon"} onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
      ) : null}
      <Button asChild variant={"outline"} className="mx-auto gap-2 text-lg">
        <Link href={"/"}>
          <Store size={24} /> Store
        </Link>
      </Button>
      <SignedIn>
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <UserButton />
          </div>
        </div>
      </SignedIn>
      <AdminMobileNav />
    </header>
  );
};
export default Header;
