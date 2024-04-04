import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import prismaDb from '@/lib/prisma'
import Link from 'next/link'
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

  const formattedProducts = products.map(product => {
    return { ...product, price: parseFloat(String(product?.price)) }
  })
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
          <DataTable
            columns={columns}
            data={formattedProducts}
            placeHolder="products"
          />
        )}
      </div>
    </section>
  )
}
export default ProductsPage
