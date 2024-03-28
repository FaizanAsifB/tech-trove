import prismaDb from '@/lib/prisma'
import ProductForm from '../components/ProductForm'

const NewProductPage = async () => {
  const categories = await prismaDb.category.findMany({
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      title: 'asc',
    },
  })
  return <ProductForm categories={categories} />
}
export default NewProductPage
