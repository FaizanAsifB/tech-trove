import { FEATURED_PER_PAGE } from '@/lib/constants'
import prismaDb from '@/lib/prisma'
import { Image as ImageDb, Product } from '@prisma/client'
import ProductCard from './product-card'

const FeaturedProducts = async ({ currentPage }: { currentPage: number }) => {
  const featuredProducts = await prismaDb.product.findMany({
    where: {
      isFeatured: true,
    },
    take: FEATURED_PER_PAGE,
    skip: FEATURED_PER_PAGE * (currentPage - 1) || 0,
    include: {
      images: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })
  return (
    <div className="grid grid-cols-3 gap-4">
      {featuredProducts.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  )
}
export default FeaturedProducts
