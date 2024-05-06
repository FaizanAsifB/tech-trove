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
import { OrderInfoRow } from './_components/OrderInfoRow'

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
                      <ul className="space-y-2 ">
                        <li>
                          {order.orderItems.map(orderItem => (
                            <div
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
                                  {orderItem.quantity} x{' '}
                                  {formatter.format(
                                    parseFloat(String(orderItem.product.price))
                                  )}
                                </p>
                              </div>
                            </div>
                          ))}
                        </li>
                        <OrderInfoRow
                          title={'Order Date'}
                          data={order.createdAt.toLocaleString()}
                        />
                        <OrderInfoRow
                          title={'Delivery Address'}
                          data={order.address}
                        />
                        <OrderInfoRow
                          title={'Status'}
                          data={order.isPaid ? 'Paid' : 'Unpaid'}
                        />
                        <OrderInfoRow
                          title={'Total Price'}
                          data={formatter.format(
                            parseFloat(String(order.totalPrice))
                          )}
                        />
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
