'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import useCart from '@/hooks/useCart'
import { formatter } from '@/lib/utils'
import CartItem from './_components/cart-item'

const CartPage = () => {
  const itemsInCart = useCart(state => state.items)
  const totalPrice = itemsInCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

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
            <div className="flex-1 bg-muted rounded-md p-4 space-y-4 grid self-start">
              <h4>Order Summary</h4>
              <Separator />
              <div className="flex justify-between">
                <p>Grand Total</p>
                <p>{formatter.format(totalPrice)}</p>
              </div>
              <Button>Checkout</Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default CartPage
