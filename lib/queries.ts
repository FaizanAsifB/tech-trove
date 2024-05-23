"use server";

import { FEATURED_PER_PAGE, GRAPH_DATA } from "@/utils/constants";
import { EmailAddress } from "@clerk/nextjs/server";
import prismaDb from "./prisma";

export const fetchCategories = async (
  orderBy: Record<string, string> = { updatedAt: "desc" },
) =>
  await prismaDb.category.findMany({
    include: {
      images: {
        where: {
          isPrimary: true,
        },
        orderBy: {
          id: "desc",
        },
      },
    },
    orderBy,
  });

export const fetchCategoryFilters = async () => {
  const categories = await prismaDb.category.findMany({
    select: {
      id: true,
      title: true,
    },
  });
  return categories;
};

export const fetchProducts = async () => {
  const products = await prismaDb.product.findMany({
    include: {
      images: {
        orderBy: {
          id: "desc",
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
      updatedAt: "desc",
    },
  });

  return products;
};

export const fetchFilteredProducts = async (categories: string[] | string) => {
  let whereClause = {};

  if (typeof categories === "string") {
    whereClause = {
      category: {
        title: categories,
      },
    };
  }

  if (Array.isArray(categories) && categories.length > 1) {
    whereClause = {
      category: {
        title: {
          in: categories,
        },
      },
    };
  }
  const products = await prismaDb.product.findMany({
    where: whereClause,
    include: {
      images: {
        orderBy: {
          id: "desc",
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return products;
};

export const fetchCategoryNavPos = async (navPos: number) => {
  const categories = await prismaDb.category.findFirst({
    where: {
      navPos,
    },
    select: {
      navPos: true,
    },
  });
  return categories;
};

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
          id: "desc",
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return products;
};

export const getProductCount = async (
  categories: string[] | string | undefined,
) => {
  let whereClause = {};

  if (typeof categories === "string") {
    whereClause = {
      category: {
        title: categories,
      },
    };
  }

  if (Array.isArray(categories) && categories.length > 1) {
    whereClause = {
      category: {
        title: {
          in: categories,
        },
      },
    };
  }

  if (!categories) {
    const allProducts = await prismaDb.product.count({});
    return allProducts;
  }

  const productCount = await prismaDb.product.count({
    where: whereClause,
  });

  return productCount;
};

export const fetchProductById = async (id: string) => {
  const product = await prismaDb.product.findFirst({
    where: {
      id,
    },
    include: {
      images: {
        orderBy: {
          id: "desc",
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
      updatedAt: "desc",
    },
  });

  return product;
};

export const fetchRelatedProducts = async (
  categoryId: string,
  productId: string,
) => {
  const relatedProducts = await prismaDb.product.findMany({
    where: {
      categoryId: categoryId,
      NOT: { id: productId },
    },
    take: 4,
    include: {
      images: {
        orderBy: {
          id: "desc",
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return relatedProducts;
};

export const fetchFeaturedProducts = async (currentPage: number) => {
  const products = await prismaDb.product.findMany({
    where: {
      isFeatured: true,
    },
    take: FEATURED_PER_PAGE,
    skip: FEATURED_PER_PAGE * (currentPage - 1) || 0,
    include: {
      images: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return products;
};

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
  });
  return order;
};

export const deleteOrder = async (id: string) => {
  const order = await prismaDb.order.delete({
    where: {
      id,
    },
  });
  return order;
};

export const fetchOrders = async () => {
  const order = await prismaDb.order.findMany({
    include: {
      orderItems: {
        include: {
          product: {
            select: {
              title: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return order;
};

export const fetchOrdersByUserId = async (userId: string) => {
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
  });
  return order;
};

export const fetchOrderById = async (id: string) => {
  const order = await prismaDb.order.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });
  return order;
};

export const fetchDashboardAggregations = async () => {
  const total = await prismaDb.order.aggregate({
    _sum: {
      totalPrice: true,
    },
    _count: {
      id: true,
    },
    where: {
      isPaid: true,
    },
  });
  return total;
};

export const countPaidOrderItems = async () => {
  const paidOrderItemsCount = await prismaDb.orderItem.count({
    where: {
      order: {
        isPaid: true,
      },
    },
  });
  return paidOrderItemsCount;
};

export const fetchGraphData = async () => {
  const data = await prismaDb.order.groupBy({
    by: "createdAt",
    where: {
      isPaid: true,
    },
    _sum: {
      totalPrice: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const monthlyRevenue: { [key: number]: number } = {};

  data.forEach((item) => {
    const month = item.createdAt.getMonth();
    monthlyRevenue[month] =
      (monthlyRevenue[month] || 0) + parseFloat(String(item._sum.totalPrice));
  });

  const graphData = GRAPH_DATA;

  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }
  return graphData;
};

export const fetchAdmins = async () => {
  const admins = prismaDb.user.findMany({
    where: {
      role: "ADMIN",
    },
  });

  return admins;
};

export const fetchUsersSearch = async (query: string) => {
  const users = prismaDb.user.findMany({
    where: {
      OR: [
        {
          email: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
  });
  return users;
};
