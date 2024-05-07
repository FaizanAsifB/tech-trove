import Link from "next/link";
import AuthLinks from "./auth-links";
import NavLinks from "./nav-links";
import ShoppingCart from "./shopping-cart";
import StoreMobileNav from "./store-mobile-nav";

const Header = () => {
  return (
    <header className="py-8">
      <nav className="container flex items-center gap-6">
        <Link href="/">Logo</Link>
        <StoreMobileNav />
        <div className="flex flex-1 items-center justify-between ">
          <div className="hidden lg:block">
            <NavLinks />
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <AuthLinks />
            </div>
            <ShoppingCart />
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
