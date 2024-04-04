import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import prismaDb from '@/lib/prisma'
import { formattedDate, formatter } from '@/lib/utils'
import { columns } from './components/columns'

const OrdersPage = async () => {
  const orders = await prismaDb.order.findMany({
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formattedOrders = orders.map(item => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems
      .map(orderItem => orderItem.product.title)
      .join(', '),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price)
      }, 0)
    ),
    isPaid: item.isPaid,
    createdAt: formattedDate(item.createdAt),
  }))

  return (
    <section className="flex flex-col flex-1 space-y-6">
      <Heading
        title={`Orders (${orders.length})`}
        description="Manage orders for your products"
      />

      <DataTable
        columns={columns}
        data={formattedOrders}
        placeHolder={'orders'}
      />
    </section>
  )
}
export default OrdersPage
