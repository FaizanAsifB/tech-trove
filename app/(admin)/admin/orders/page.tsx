import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import prismaDb from "@/lib/prisma";
import { formattedDate, formatter } from "@/lib/utils";
import { columns } from "./components/columns";

const OrdersPage = async () => {
  const orders = await prismaDb.order.findMany({
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders = orders.map((item) => ({
    ...item,
    products: item.orderItems
      .map((orderItem) => orderItem.product.title)
      .join(", "),
    totalPrice: String(item.totalPrice),
  }));

  return (
    <section className="flex flex-1 flex-col space-y-6">
      <Heading
        title={`Orders (${orders.length})`}
        description="Manage orders for your products"
      />

      <DataTable
        columns={columns}
        data={formattedOrders}
        placeHolder={"orders"}
      />
    </section>
  );
};
export default OrdersPage;
