import { Button } from '@/components/ui/button'
import { formatter } from '@/lib/utils'
import { Image as ImageDb, Product } from '@prisma/client'

import Image from 'next/image'
import Link from 'next/link'

type ProductCardProps = {
  product: Product & {
    images: ImageDb[]
  }
  isRelatedProduct?: boolean
}

const ProductCard = ({
  product,
  isRelatedProduct = false,
}: ProductCardProps) => {
  return (
    <article>
      <Link href={`/products/${product.id}`} className="group space-y-3 ">
        <div className="relative min-h-52  overflow-clip bg-stone-100 rounded-sm ">
          <Image
            src={product.images.find(image => image.isPrimary)!.url}
            fill
            alt={product.title}
            className="object-contain group-hover:scale-110 p-4 aspect-square max-w-full"
          />
        </div>
        <h4 className={isRelatedProduct ? 'text-sm' : ''}>{product.title}</h4>
        <div className={isRelatedProduct ? 'text-sm' : ''}>
          <p className="text-secondary-foreground truncate">
            {product.description}
          </p>
          <span>{formatter.format(Number(product.price))}</span>
        </div>
      </Link>
    </article>
  )
}

export default ProductCard
