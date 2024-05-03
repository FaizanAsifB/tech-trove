import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { fetchOrders } from '@/lib/queries'
import { auth } from '@clerk/nextjs/server'

const OrdersPage = async () => {
  const { userId } = auth()

  if (!userId) return null

  const orders = await fetchOrders(userId)
  console.log(userId)
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
                        <p>
                          Order Date{' '}
                          {order.createdAt.toISOString().split('T')[0]}
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {order.createdAt.toLocaleString()}
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
