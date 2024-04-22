import Pagination from '@/components/ui/pagination'
import prismaDb from '@/lib/prisma'
import { fetchProducts, getProductCount } from '@/lib/queries'
import { PRODUCTS_PER_PAGE } from '@/utils/constants'
import ProductCard from '../_components/product-card'
import CategoryFilter from './_components/category-filter'

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

  const currentPage = Number(searchParams['page'] || 1)
  const filteredCategories = searchParams['filter'] || ''

  const products = await fetchProducts(filteredCategories)
  const productCount = await getProductCount(filteredCategories)

  return (
    <section className="mt-8 flex-1 flex flex-col">
      <div className="container flex gap-20 flex-1">
        <div className="space-y-4">
          <h6>Product Categories</h6>
          <CategoryFilter categories={categories} />
        </div>
        <div className="space-y-4 flex flex-col flex-1">
          <Pagination
            currentPage={currentPage}
            itemsPerPage={PRODUCTS_PER_PAGE}
            totalItems={productCount}
            title={'Product'}
            queryParamKey={'page'}
          >
            {productCount === 0 ? (
              <div className="flex-1 flex justify-center items-center">
                <p>No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-8 flex-1">
                {products.map(product => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            )}
          </Pagination>
        </div>
      </div>
    </section>
  )
}

export default ProductsPage
