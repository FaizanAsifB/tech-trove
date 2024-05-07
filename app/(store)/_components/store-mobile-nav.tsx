import MobileNav from "@/components/ui/mobile-nav";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import AuthLinks from "./auth-links";
import NavLinks from "./nav-links";

const StoreMobileNav = () => {
  return (
    <MobileNav>
      <div>logo</div>
      <Separator />
      <h4>Categories</h4>
      <NavLinks />
      <Separator />
      <AuthLinks />
    </MobileNav>
  );
};

export default StoreMobileNav;
