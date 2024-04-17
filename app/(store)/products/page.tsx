import { Checkbox } from '@/components/ui/checkbox'
import Pagination from '@/components/ui/pagination'
import { PRODUCTS_PER_PAGE } from '@/lib/constants'
import prismaDb from '@/lib/prisma'
import { fetchProducts } from '@/lib/queries'
import React from 'react'
import ProductCard from '../_components/product-card'

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const categories = await prismaDb.category.findMany({
    select: {
      id: true,
      title: true,
    },
  })
  const products = await fetchProducts()
  const currentPage = Number(searchParams['page'] || 1)
  const productCount = await prismaDb.product.count({})

  return (
    <section className="mt-8">
      <div className="container flex gap-20">
        <div className="space-y-4">
          <h6>Product Categories</h6>
          <ul className="space-y-3 text-sm">
            {categories.map(category => (
              <li key={category.id} className="flex gap-2 items-center">
                <Checkbox />
                {category.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <Pagination
            currentPage={currentPage}
            itemsPerPage={PRODUCTS_PER_PAGE}
            totalItems={productCount}
            title={'Product'}
            queryParamKey={'page'}
          >
            <div className="grid grid-cols-3 gap-8">
              {products.map(product => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          </Pagination>
        </div>
      </div>
    </section>
  )
}

export default ProductsPage
