import prismaDb from '@/lib/prisma'
import ProductForm from '../../components/ProductForm'

const EditProductPage = async ({
  params,
}: {
  params: { productId: string }
}) => {
  const { productId } = params
  const product = await prismaDb.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
    },
  })

  const categories = await prismaDb.category.findMany({
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      title: 'asc',
    },
  })

  if (!product) {
    return null
  }

  const formattedProduct = {
    ...product,
    price: parseFloat(String(product?.price)),
  }
  return <ProductForm initialData={formattedProduct} categories={categories} />
}
export default EditProductPage
