import { CartItem } from '@/lib/definitions'
import prismaDb from '@/lib/prisma'
import { fetchProductsById } from '@/lib/queries'
import stripe from '@/lib/stripe'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, res: NextResponse) {
  const headersList = headers()
  const { cartItemData }: { cartItemData: { id: string; quantity: number }[] } =
    await req.json()

  const products = await fetchProductsById(cartItemData.map(item => item.id))

  if (!cartItemData || cartItemData.length === 0) {
    return new NextResponse('No Cart items found', { status: 400 })
  }

  const formattedProducts = products.map(item => ({
    title: item.title,
    price: item.price.toNumber() * 100,
    quantity: cartItemData.find(cartItem => cartItem.id === item.id)!.quantity,
  }))

  const lineItems = formattedProducts.map(item => {
    return {
      price_data: {
        currency: 'USD',
        product_data: {
          name: item.title,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }
  })

  const order = await prismaDb.order.create({
    data: {
      isPaid: false,
      orderItems: {
        create: cartItemData.map(product => ({
          product: {
            connect: {
              id: product.id,
            },
          },
        })),
      },
    },
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
      success_url: `${headersList.get('origin')}/checkout/${
        order.id
      }?success=true`,
      cancel_url: `${headersList.get('origin')}/cart?canceled=true`,
      metadata: { orderId: order.id },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: 'Error creating checkout session' })
  }
}
