import { Heading } from "@/components/ui/heading";
import {
  countPaidOrderItems,
  fetchDashboardAggregations,
  fetchGraphData,
} from "@/lib/queries";
import { formatter } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs/server";
import { CircleDollarSign, ShoppingBag } from "lucide-react";
import { redirect } from "next/navigation";
import DashboardDataCard from "./_components/dashboard-data-card";
import OverviewChart from "./_components/overview-chart";

const page = async () => {
  const aggregations = await fetchDashboardAggregations();
  const user = await currentUser();

  const orderItemsCount = await countPaidOrderItems();
  const graphData = await fetchGraphData();

  if (!user) redirect("/");

  return (
    <section className="flex-1 space-y-6">
      <Heading title="Dashboard" description="Overview of your store" />
      <h1>Welcome back, {user?.firstName}</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardDataCard
          title="Total Revenue"
          data={formatter.format(
            parseFloat(String(aggregations._sum.totalPrice)) || 0,
          )}
          icon={<CircleDollarSign />}
        />
        <DashboardDataCard
          title="Total Orders"
          data={aggregations._count.id}
          icon={<ShoppingBag />}
        />
        <DashboardDataCard
          title="Total Sales"
          data={orderItemsCount}
          icon={<CircleDollarSign />}
        />
      </div>
      <DashboardDataCard
        title="Overview"
        data={<OverviewChart data={graphData} />}
      />
      {/* <OverviewChart data={graphData} /> */}
    </section>
  );
};
export default page;
