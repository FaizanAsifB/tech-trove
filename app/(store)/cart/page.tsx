'use client'

import useCart from '@/hooks/useCart'

const CartPage = () => {
  const itemsInCart = useCart(state => state.items)
  return (
    <section>
      <div className="container">
        <h1>Cart</h1>
        {itemsInCart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {itemsInCart.map(product => (
              <li key={product.id}>
                {product.title} - {product.price}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default CartPage
