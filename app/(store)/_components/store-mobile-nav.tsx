import MobileNav from "@/components/ui/mobile-nav";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import AuthLinks from "./auth-links";
import NavLinks from "./nav-links";
import Logo from "@/components/logo";

const StoreMobileNav = () => {
  return (
    <MobileNav>
      <Logo />
      <Separator />
      <h4>Categories</h4>
      <NavLinks />
      <Separator />
      <AuthLinks />
    </MobileNav>
  );
};

export default StoreMobileNav;
