import useCart from "@/hooks/useCart";
import AuthLinks from "./auth-links";
import NavLinks from "./nav-links";
import ShoppingCart from "./shopping-cart";

const Header = () => {
  return (
    <header className="py-8">
      <div className="container ">
        <div className="flex items-center justify-between gap-6">
          <NavLinks />

          <div className="flex items-center gap-4">
            <AuthLinks />
            <ShoppingCart />
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
