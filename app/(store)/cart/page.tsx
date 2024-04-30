'use client'

import useCart from '@/hooks/useCart'

import CartItem from './_components/cart-item'
import OrderSummary from './_components/order-summary'

const CartPage = () => {
  const cartItems = useCart(state => state.items)

  return (
    <section className="mt-8">
      <div className="container">
        <h1 className="mb-8">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="flex gap-12 ">
            <ul className="w-3/5 space-y-4">
              {cartItems.map(product => (
                <CartItem key={product.id} product={product} />
              ))}
            </ul>
            <OrderSummary />
          </div>
        )}
      </div>
    </section>
  )
}

export default CartPage
