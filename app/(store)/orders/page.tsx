import { auth } from '@clerk/nextjs/server'

const OrdersPage = () => {
  const { userId } = auth()
  console.log(userId)
  return <section>OrdersPage</section>
}

export default OrdersPage
