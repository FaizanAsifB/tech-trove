import prismaDb from './prisma'

export const fetchCategories = async () =>
  await prismaDb.category.findMany({
    include: {
      images: {
        where: {
          isPrimary: true,
        },
        orderBy: {
          id: 'desc',
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

export const fetchProducts = async () => {
  const products = await prismaDb.product.findMany({
    include: {
      images: {
        orderBy: {
          id: 'desc',
        },
      },
      category: {
        select: {
          title: true,
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  return products
}
