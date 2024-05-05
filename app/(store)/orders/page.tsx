import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { fetchOrders } from '@/lib/queries'
import { formatter } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'

const OrdersPage = async () => {
  const { userId } = auth()

  if (!userId) return null

  const orders = await fetchOrders(userId)

  return (
    <section>
      <div className="container">
        <h1>Orders</h1>

        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul>
            {orders.map(order => (
              <li key={order.id}>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="w-full flex justify-between">
                        <p>Order Number {order.id}</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul>
                        <li>
                          {order.orderItems.map(orderItem => (
                            <article
                              key={orderItem.productId}
                              className="flex items-center gap-2"
                            >
                              <div className="relative size-24 ">
                                <Image
                                  src={orderItem.product.images[0].url}
                                  alt={orderItem.product.title}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                              <div>
                                <p>{orderItem.product.title}</p>
                                <p>
                                  {orderItem.quantity} x{''}
                                  {formatter.format(
                                    parseFloat(String(orderItem.product.price))
                                  )}
                                </p>
                              </div>
                            </article>
                          ))}
                        </li>
                        <li>Order Date {order.createdAt.toLocaleString()}</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default OrdersPage
