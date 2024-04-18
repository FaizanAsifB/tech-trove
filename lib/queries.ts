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

export const fetchProducts = async (categories: string[] | string) => {
  let whereClause = {}

  if (typeof categories === 'string') {
    whereClause = {
      category: {
        title: categories,
      },
    }
  }

  if (Array.isArray(categories) && categories.length > 1) {
    whereClause = {
      category: {
        title: {
          in: categories,
        },
      },
    }
  }
  const products = await prismaDb.product.findMany({
    where: whereClause,
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

export const getProductCount = async (categories: string[] | string) => {
  let whereClause = {}

  if (typeof categories === 'string') {
    whereClause = {
      category: {
        title: categories,
      },
    }
  }

  if (Array.isArray(categories) && categories.length > 1) {
    whereClause = {
      category: {
        title: {
          in: categories,
        },
      },
    }
  }

  const productCount = await prismaDb.product.count({
    where: whereClause,
  })

  return productCount
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
