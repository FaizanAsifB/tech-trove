import prismaDb from '@/lib/prisma'
import { Image, Product } from '@prisma/client'
import FeaturedPagination from './featured-pagination'
import FeaturedProductsPage from './featured-products-page'

const FEATURED_PER_PAGE = 3

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

  const featuredCount = await prismaDb.product.count({
    where: {
      isFeatured: true,
    },
  })

  const totalPages = Math.ceil(featuredCount / FEATURED_PER_PAGE)
  return (
    <section>
      <div className="container space-y-8">
        <h2>Featured Products</h2>
        <FeaturedProductsPage products={featuredProducts} />
        <FeaturedPagination totalPages={totalPages} />
      </div>
    </section>
  )
}
export default FeaturedProducts
