import { CartItem } from '@/lib/definitions'
import stripe from '@/lib/stipe'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, res: NextResponse) {
  const headersList = headers()
  const { cartItems }: { cartItems: CartItem[] } = await req.json()

  const lineItems = cartItems.map(item => {
    return {
      price_data: {
        currency: 'USD',
        product_data: {
          name: item.title,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }
  })

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${headersList.get(
        'origin'
      )}/checkout/{CHECKOUT_SESSION_ID}?success=true`,
      cancel_url: `${headersList.get(
        'origin'
      )}/checkout/{CHECKOUT_SESSION_ID}?canceled=true`,
    })

    console.log('Session created:', session.id)

    return NextResponse.json({ sessionId: session.id })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: 'Error creating checkout session' })
  }
}
