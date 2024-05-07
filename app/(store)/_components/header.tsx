import Link from "next/link";
import AuthLinks from "./auth-links";
import NavLinks from "./nav-links";
import ShoppingCart from "./shopping-cart";
import StoreMobileNav from "./store-mobile-nav";

const Header = () => {
  return (
    <header className="py-8">
      <nav className="container flex items-center gap-4 lg:gap-6">
        <StoreMobileNav />
        <Link href="/">Logo</Link>
        <div className="hidden flex-1 items-center justify-between lg:flex">
          <NavLinks />

          <div className="flex items-center gap-4">
            <AuthLinks />
          </div>
        </div>
        <div className="ml-auto flex items-center">
          <ShoppingCart />
        </div>
      </nav>
    </header>
  );
};
export default Header;
