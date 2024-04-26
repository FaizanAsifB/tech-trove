import useCart from '@/hooks/useCart'
import AuthButtons from './auth-buttons'
import NavLinks from './nav-links'
import ShoppingCart from './shopping-cart'

const Header = () => {
  return (
    <header className="py-8">
      <div className="container ">
        <div className="flex gap-6 justify-between items-center">
          <NavLinks />

          <div className="flex items-center gap-4">
            <AuthButtons />
            <ShoppingCart />
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header
