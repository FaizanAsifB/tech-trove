import prismaDb from '@/lib/prisma'
import React from 'react'
import ProductCard from '../../components/product-card'

const ProductCards = async () => {
  const products = await prismaDb.product.findMany({
    include: {
      images: {
        orderBy: {
          id: 'desc',
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  return (
    <div className="grid grid-cols-3 gap-8">
      {products.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  )
}

export default ProductCards
