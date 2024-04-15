import { Image as ImageDb, Product } from '@prisma/client'
import ProductCard from './product-card'

type FeaturedProductsProps = {
  products: (Product & { images: ImageDb[] })[]
}

const FeaturedProductsPage = async ({ products }: FeaturedProductsProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  )
}
export default FeaturedProductsPage
