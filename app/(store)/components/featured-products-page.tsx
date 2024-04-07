import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatter } from '@/lib/utils'
import { Image as ImageDb, Product } from '@prisma/client'
import Image from 'next/image'

type FeaturedProductsProps = {
  products: (Product & { images: ImageDb[] })[]
}

const FeaturedProductsPage = async ({ products }: FeaturedProductsProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <article key={product.id} className="border-none shadow-none space-y-2">
          <div className="relative h-52">
            <Image
              src={product.images.find(image => image.isPrimary)!.url}
              fill
              alt={product.title}
              className="object-contain bg-stone-100 rounded-lg py-4"
            />
          </div>
          <h4 className="text-2xl font-semibold leading-none tracking-tight">
            {product.title}
          </h4>
          <div>
            <p className="text-secondary-foreground">{product.description}</p>
            <span>{formatter.format(Number(product.price))}</span>
          </div>
        </article>
      ))}
    </div>
  )
}
export default FeaturedProductsPage
