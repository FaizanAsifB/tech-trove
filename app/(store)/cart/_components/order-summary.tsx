import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import useCart from '@/hooks/useCart'
import getStripe from '@/lib/load-stripe'
import { formatter } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

const loadStripe = getStripe()

const OrderSummary = () => {
  const searchParams = useSearchParams()

  const cartItems = useCart(state => state.items)
  const cartCount = cartItems.length

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  useEffect(() => {
    if (searchParams.get('canceled')) {
      toast.error(
        'Order canceled -- continue to shop around and checkout when you&apos;re ready.'
      )
    }
  }, [searchParams])

  const redirectToCheckout = async () => {
    const cartItemData = cartItems.map(item => {
      return { id: item.id, quantity: item.quantity }
    })
    try {
      const stripe = await loadStripe

      if (!stripe) throw new Error('Stripe failed to initialize.')

      const checkoutResponse = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItemData, totalPrice }),
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
  )
}

export default OrderSummary
