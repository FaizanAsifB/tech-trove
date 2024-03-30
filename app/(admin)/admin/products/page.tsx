import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import prismaDb from '@/lib/prisma'
import { formattedDate } from '@/lib/utils'
import axios from 'axios'
import Link from 'next/link'
import DeleteButton from './components/DeleteButton'
import { columns } from './components/columns'

const ProductsPage = async () => {
  const products = await prismaDb.product.findMany({
    include: {
      images: {
        orderBy: {
          id: 'desc',
        },
      },
      category: {
        select: {
          title: true,
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  console.log(products)

  return (
    <section className="flex flex-col flex-1 space-y-6">
      <div className="flex justify-between items-center">
        <Heading
          title={`Products (${products.length})`}
          description="Manage your products"
        />
        <Button asChild>
          <Link href="products/create">Add Product</Link>
        </Button>
      </div>

      <div className="flex flex-col flex-1">
        {products.length === 0 ? (
          <div className="flex flex-col flex-1 justify-center items-center gap-1 text-center">
            <p>No Products found.</p>
            <Button asChild>
              <Link href="products/create">Add Product</Link>
            </Button>
          </div>
        ) : (
          <DataTable columns={columns} data={products} />
        )}
      </div>
    </section>
  )
}
export default ProductsPage
