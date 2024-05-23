import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { columns } from "./components/columns";
import { fetchOrders } from "@/lib/queries";

const OrdersPage = async () => {
  const orders = await fetchOrders();

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
