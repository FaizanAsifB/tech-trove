import { Button } from '@/components/ui/button'
import { formatter } from '@/lib/utils'
import { Image as ImageDb, Product } from '@prisma/client'

import Image from 'next/image'
import Link from 'next/link'

const ProductCard = ({
  product,
}: {
  product: Product & { images: ImageDb[] }
}) => {
  return (
    <article>
      <Link href={`/products/${product.id}`} className="group space-y-3">
        <div className="relative h-52 w-64 overflow-clip bg-stone-100 rounded-sm ">
          <Image
            src={product.images.find(image => image.isPrimary)!.url}
            fill
            alt={product.title}
            className="object-contain group-hover:scale-110 px-4"
          />
        </div>
        <h4>{product.title}</h4>
        <div>
          <p className="text-secondary-foreground">{product.description}</p>
          <span>{formatter.format(Number(product.price))}</span>
        </div>
      </Link>
    </article>
  )
}

export default ProductCard
