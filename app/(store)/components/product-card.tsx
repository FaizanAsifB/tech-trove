import { formatter } from '@/lib/utils'
import { Image as ImageDb, Product } from '@prisma/client'

import Image from 'next/image'

const ProductCard = ({
  product,
}: {
  product: Product & { images: ImageDb[] }
}) => {
  return (
    <article className="border-none shadow-none space-y-3">
      <div className="relative h-52">
        <Image
          src={product.images.find(image => image.isPrimary)!.url}
          fill
          alt={product.title}
          className="object-contain bg-stone-100 rounded-lg py-4"
        />
      </div>
      <h4>{product.title}</h4>
      <div>
        <p className="text-secondary-foreground">{product.description}</p>
        <span>{formatter.format(Number(product.price))}</span>
      </div>
    </article>
  )
}

export default ProductCard
