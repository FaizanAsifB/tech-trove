import { deleteOrder, fetchOrderById } from '@/lib/queries'
import CartItemsList from './_components/cart-items-list'
import OrderSummary from './_components/order-summary'

const CartPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const idToDelete = searchParams?.id
  const currentOrder = await fetchOrderById(idToDelete as string)
  if (idToDelete && currentOrder) {
    await deleteOrder(idToDelete as string)
  }

  return (
    <section className="mt-8">
      <div className="container">
        <CartItemsList>
          <OrderSummary />
        </CartItemsList>
      </div>
    </section>
  )
}

export default CartPage
