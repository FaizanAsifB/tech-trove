import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { type CartItem } from '@/lib/definitions'
import { formatter } from '@/lib/utils'
import { X } from 'lucide-react'
import Image from 'next/image'

const CartItem = ({ product }: { product: CartItem }) => {
  return (
    <article className="flex gap-4">
      <Image
        src={product.images[0].url}
        alt={product.title}
        width={100}
        height={100}
      />
      <div className="font-semibold">
        <p>{product.title}</p>
        <p>{formatter.format(product.price)}</p>
      </div>
      <p>Quantity: {product.quantity}</p>
      <Button
        variant="destructive"
        size={'icon-sm'}
        className="rounded-full shadow-lg bg-destructive text-destructive-foreground"
      >
        <X />
      </Button>
      4
      <Separator />
    </article>
  )
}

export default CartItem
