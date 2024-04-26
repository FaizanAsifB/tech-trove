'use client'

import useCart from '@/hooks/useCart'
import CartItem from './_components/cart-item'

const CartPage = () => {
  const itemsInCart = useCart(state => state.items)

  return (
    <section className="mt-8">
      <div className="container">
        <h1 className="mb-8">Shopping Cart</h1>
        {itemsInCart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="flex gap-12 ">
            <ul className="w-3/5 space-y-4">
              {itemsInCart.map(product => (
                <CartItem key={product.id} product={product} />
              ))}
            </ul>
            <div className="border-2 flex-1">
              <h2>Order Summary</h2>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default CartPage
