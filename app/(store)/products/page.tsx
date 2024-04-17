import Pagination from '@/components/ui/pagination'
import { PRODUCTS_PER_PAGE } from '@/lib/constants'
import prismaDb from '@/lib/prisma'
import { fetchProducts } from '@/lib/queries'
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

  const products = await fetchProducts()
  const currentPage = Number(searchParams['page'] || 1)
  const filteredCategories = searchParams['filter'] || ''
  const productCount = await prismaDb.product.count({})

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(name, value)

    return params.toString()
  }

  console.log(searchParams)

  return (
    <section className="mt-8">
      <div className="container flex gap-20">
        <div className="space-y-4">
          <h6>Product Categories</h6>
          <CategoryFilter categories={categories} />
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
