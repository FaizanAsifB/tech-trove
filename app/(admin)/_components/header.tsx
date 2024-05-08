import { SignedIn, UserButton } from "@clerk/nextjs";
import AdminMobileNav from "./admin-mobile-nav";

const Header = () => {
  return (
    <header className="flex h-14 flex-row-reverse items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <AdminMobileNav />
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
};
export default Header;
