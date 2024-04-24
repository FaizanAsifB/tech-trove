import useCart from '@/hooks/useCart'
import AuthButtons from './auth-buttons'
import NavLinks from './nav-links'
import ShoppingCart from './shopping-cart'

const Header = () => {
  return (
    <header className="py-8">
      <div className="container flex justify-between">
        <div className="flex gap-6 justify-center items-center">
          <NavLinks />
          <AuthButtons />

          <ShoppingCart />
        </div>
      </div>
    </header>
  )
}
export default Header
