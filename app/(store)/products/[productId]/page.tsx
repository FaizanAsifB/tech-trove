import { Button } from '@/components/ui/button'
import prismaDb from '@/lib/prisma'
import { fetchProduct } from '@/lib/queries'
import { formatter } from '@/lib/utils'
import { notEqual } from 'assert'
import Image from 'next/image'
import ProductCard from '../../_components/product-card'

const ProductsPage = async ({
  params,
}: {
  params: { [key: string]: string }
}) => {
  const product = await fetchProduct(params.productId)
  if (!product) return null

  const relatedProducts = await prismaDb.product.findMany({
    where: {
      categoryId: product.categoryId,
      NOT: { id: product.id },
    },
    take: 3,
    include: {
      images: {
        orderBy: {
          id: 'desc',
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  return (
    <section className="mt-8">
      <div className="container space-y-24">
        <article className="grid grid-cols-[auto_1fr] gap-20 ">
          <div className="relative h-64 w-96 bg-stone-100 rounded-sm">
            <Image
              src={product.images[0].url}
              fill
              alt={product.title}
              className="object-contain p-8 "
            />
          </div>
          <div className="py-4 border-red-400 border-2 grid ">
            <div className="space-y-1 ">
              <h4 className="font-bold">{product.title}</h4>
              <small className="inline-block">{product.category.title}</small>
              <p className="text-sm">
                {formatter.format(Number(product.price))}
              </p>
            </div>
            <div className="mt-6 mb-4">
              <h6>Description</h6>
              <p className="text-secondary-foreground">{product.description}</p>
            </div>
            <Button className="self-end">Add To Cart</Button>
          </div>
        </article>
        <div>
          <h5>Related Products</h5>
          <div className="flex flex-wrap gap-4">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductsPage
