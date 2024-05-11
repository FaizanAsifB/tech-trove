import { Button } from "@/components/ui/button";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { Store } from "lucide-react";
import Link from "next/link";
import AdminMobileNav from "./admin-mobile-nav";

const Header = () => {
  return (
    <header className="flex h-14 flex-row-reverse items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <AdminMobileNav />
      <SignedIn>
        <div className="flex items-center gap-4">
          <Button asChild variant={"outline"} className="gap-2 text-lg">
            <Link href={"/"}>
              <Store size={24} /> Store
            </Link>
          </Button>
          <UserButton />
        </div>
      </SignedIn>
    </header>
  );
};
export default Header;
