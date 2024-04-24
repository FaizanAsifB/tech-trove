'use client'

import useCart from '@/hooks/useCart'
import CartItem from './_components/cart-item'

const CartPage = () => {
  const itemsInCart = useCart(state => state.items)

  return (
    <section>
      <div className="container">
        <h1>Shopping Cart</h1>
        {itemsInCart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {itemsInCart.map(product => (
              <CartItem key={product.id} product={product} />
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default CartPage
