import Logo from "@/components/logo";
import Link from "next/link";
import AuthLinks from "./auth-links";
import NavLinks from "./nav-links";
import ShoppingCart from "./shopping-cart";
import StoreMobileNav from "./store-mobile-nav";

const Header = () => {
  return (
    <header className="my-8 border-b pb-4">
      <nav className="container flex items-center gap-4 lg:gap-6">
        <StoreMobileNav />
        <Link href="/" className="w-36">
          <Logo />
        </Link>
        <div className="hidden flex-1 items-center justify-between lg:flex">
          <NavLinks />

          <AuthLinks />
        </div>
        <div className="ml-auto flex items-center">
          <ShoppingCart />
        </div>
      </nav>
    </header>
  );
};
export default Header;
