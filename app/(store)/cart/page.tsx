'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import useCart from '@/hooks/useCart'
import getStripe from '@/lib/load-stripe'
import { formatter } from '@/lib/utils'
import axios from 'axios'
import Link from 'next/link'
import { useEffect } from 'react'
import CartItem from './_components/cart-item'

const loadStripe = getStripe()

const CartPage = () => {
  const cartItems = useCart(state => state.items)
  const cartCount = cartItems.length
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  const redirectToCheckout = async () => {
    try {
      const stripe = await loadStripe

      if (!stripe) throw new Error('Stripe failed to initialize.')

      const checkoutResponse = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems }),
      })

      const { sessionId } = await checkoutResponse.json()
      const stripeError = await stripe.redirectToCheckout({ sessionId })

      if (stripeError) {
        console.error(stripeError)
      }
    } catch (error) {
      console.error(error)
    }
  }

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
            <div className="flex-1 bg-muted rounded-md p-4 space-y-4 grid self-start">
              <h4>Order Summary</h4>
              <Separator />
              <div className="flex justify-between">
                <p>Grand Total</p>
                <p>{formatter.format(totalPrice)}</p>
              </div>
              <Button
                className="rounded-full"
                onClick={() => cartCount > 0 && redirectToCheckout()}
                disabled={cartCount === 0}
              >
                Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default CartPage
