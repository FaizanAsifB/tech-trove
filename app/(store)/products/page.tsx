import { Checkbox } from '@/components/ui/checkbox'
import prismaDb from '@/lib/prisma'
import React from 'react'
import ProductCards from './components/product-cards'

const ProductsPage = async () => {
  const categories = await prismaDb.category.findMany()
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
        <ProductCards />
      </div>
    </section>
  )
}

export default ProductsPage
