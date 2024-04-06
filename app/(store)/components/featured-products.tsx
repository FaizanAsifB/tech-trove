import prismaDb from '@/lib/prisma'
import FeaturedPagination from './featured-pagination'
import FeaturedProductsPage from './featured-products-page'

const FeaturedProducts = async (currentPage: number) => {
  const featuredProducts = await prismaDb.product.findMany({
    where: {
      isFeatured: true,
    },
    skip: 4 * (currentPage - 1),
    take: 4,
    orderBy: {
      updatedAt: 'desc',
    },
  })

  const featuredCount = await prismaDb.product.count({
    where: {
      isFeatured: true,
    },
  })

  const totalPages = Math.ceil(featuredCount / 4)
  return (
    <section>
      <div className="container">
        <h2>Featured Products</h2>
        <FeaturedProductsPage />
        <FeaturedPagination totalPages={totalPages} />
      </div>
    </section>
  )
}
export default FeaturedProducts
