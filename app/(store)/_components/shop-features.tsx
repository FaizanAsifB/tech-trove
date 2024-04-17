import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CircleDollarSign, CreditCard, Headset, Package } from 'lucide-react'

const ShopFeatures = () => {
  return (
    <section>
      <div className="container grid grid-cols-4 gap-4">
        <Card className="border-none shadow-none">
          <CardHeader className="pb-2 gap-3">
            <Package />
            <CardTitle className="">Free Shipping</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Free shipping for order above $100</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-none">
          <CardHeader className="pb-2 gap-3">
            <CircleDollarSign />
            <CardTitle className="">Money Guarantee</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Within 30 days for an exchange</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-none">
          <CardHeader className="pb-2 gap-3">
            <Headset />
            <CardTitle className="">Online Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p>24 hours a day, 7 days a week</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-none">
          <CardHeader className="pb-2 gap-3">
            <CreditCard />
            <CardTitle className="">Flexible Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Pay with multiple credit cards</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
export default ShopFeatures
