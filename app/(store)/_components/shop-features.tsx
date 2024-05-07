import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign, CreditCard, Headset, Package } from "lucide-react";

const ShopFeatures = () => {
  return (
    <section>
      <div className="container grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-none">
          <CardHeader className="gap-3 pb-2">
            <Package />
            <CardTitle className="">Free Shipping</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Free shipping for orders above $100</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-none">
          <CardHeader className="gap-3 pb-2">
            <CircleDollarSign />
            <CardTitle className="">Money Guarantee</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Within 30 days for an exchange</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-none">
          <CardHeader className="gap-3 pb-2">
            <Headset />
            <CardTitle className="">Online Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p>24 hours a day, 7 days a week</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-none">
          <CardHeader className="gap-3 pb-2">
            <CreditCard />
            <CardTitle className="">Flexible Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Pay with multiple credit cards</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
export default ShopFeatures;
