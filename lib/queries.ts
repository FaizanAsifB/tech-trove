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
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  return products
}

export const fetchProduct = async (id: string) => {
  const product = await prismaDb.product.findFirst({
    where: {
      id,
    },
    include: {
      images: {
        orderBy: {
          id: 'desc',
        },
      },
      category: {
        select: {
          id: true,
          title: true,
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  return product
}
