'use server'

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

export const fetchFilteredProducts = async (categories: string[] | string) => {
  let whereClause = {}
  console.log(typeof categories === 'string')
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

export const fetchProductsById = async (ids: string[]) => {
  const products = await prismaDb.product.findMany({
    where: {
      id: {
        in: ids,
      },
    },
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

  if (!categories) {
    const allProducts = await prismaDb.product.count({})
    return allProducts
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

export const fetchOrder = async (id: string) => {
  const order = await prismaDb.order.findFirst({
    where: {
      id,
    },
    include: {
      orderItems: {
        include: {
          product: {
            include: {
              images: true,
            },
          },
        },
      },
    },
  })
  return order
}

export const fetchOrders = async (userId: string) => {
  const order = await prismaDb.order.findMany({
    where: {
      userId,
    },
    include: {
      orderItems: {
        include: {
          product: {
            include: {
              images: true,
            },
          },
        },
      },
    },
  })
  return order
}
