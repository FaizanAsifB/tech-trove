import { Button } from '@/components/ui/button'
import { DeleteDialog } from '@/components/ui/delete-dialog'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import useCart from '@/hooks/useCart'
import { type CartItem } from '@/lib/definitions'
import { formatter } from '@/lib/utils'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const CartItem = ({ product }: { product: CartItem }) => {
  const [isOpen, setIsOpen] = useState(false)

  const deleteItemInCart = useCart(state => state.deleteItem)
  const incrementItem = useCart(state => state.incrementItem)
  const decrementItem = useCart(state => state.decrementItem)
  return (
    <>
      <DeleteDialog
        onConfirm={() => deleteItemInCart(product.id)}
        open={isOpen}
        setOpen={setIsOpen}
        deletedItem={product.title}
      />
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
        <div className="flex items-center gap-2">
          <span>Quantity:</span>
          <Button
            onClick={() => {
              if (product.quantity === 1) {
                setIsOpen(true)
              }
              if (product.quantity > 1) {
                decrementItem(product.id)
              }
            }}
          >
            -
          </Button>
          <Input type="number" value={product.quantity} />
          <Button onClick={() => incrementItem(product.id)}>+</Button>
        </div>
        <Button
          variant="destructive"
          size={'icon-sm'}
          className="rounded-full shadow-lg bg-destructive text-destructive-foreground"
          onClick={() => setIsOpen(true)}
        >
          <X />
        </Button>
      </article>
      <Separator />
    </>
  )
}

export default CartItem
