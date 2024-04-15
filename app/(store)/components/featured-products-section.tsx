import { FEATURED_PER_PAGE } from '@/lib/constants'
import prismaDb from '@/lib/prisma'
import ProductsPagination from '../../../components/ui/pagination'
import FeaturedProducts from './featured-products'

const FeaturedProductsSection = async ({
  currentPage,
}: {
  currentPage: number
}) => {
  const featuredCount = await prismaDb.product.count({
    where: {
      isFeatured: true,
    },
  })

  return (
    <section>
      <div className="container space-y-8">
        <h2>Featured Products</h2>
        <ProductsPagination
          currentPage={currentPage}
          itemsPerPage={FEATURED_PER_PAGE}
          totalItems={featuredCount}
          title={'Product'}
          queryParamKey={'feature-page'}
        >
          <FeaturedProducts currentPage={currentPage} />
        </ProductsPagination>
      </div>
    </section>
  )
}
export default FeaturedProductsSection
