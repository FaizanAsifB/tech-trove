import { Button } from '@/components/ui/button'
import { formatter } from '@/lib/utils'
import { Image as ImageDb, Product } from '@prisma/client'

import Image from 'next/image'
import Link from 'next/link'

const ProductCard = ({
  product,
}: {
  product: Product & { images: ImageDb[] } & { category: { title: string } }
}) => {
  return (
    <article className="border-none shadow-none ">
      <Link
        href={`/${product.category.title.toLowerCase()}/${product.id}`}
        className="group space-y-3"
      >
        <div className="relative h-52 overflow-clip bg-stone-100 ">
          <Image
            src={product.images.find(image => image.isPrimary)!.url}
            fill
            alt={product.title}
            className="object-contain p-8 group-hover:scale-110"
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
