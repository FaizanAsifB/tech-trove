"use server";

import prismaDb from "./prisma";

export const fetchCategories = async () =>
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
    orderBy: {
      updatedAt: "desc",
    },
  });

export const fetchProducts = async () => {
  const products = await prismaDb.product.findMany({
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

export const fetchFilteredProducts = async (categories: string[] | string) => {
  let whereClause = {};
  console.log(typeof categories === "string");
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

export const getProductCount = async (categories: string[] | string) => {
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

export const fetchProduct = async (id: string) => {
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

  const graphData = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];

  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }
  return graphData;
};
