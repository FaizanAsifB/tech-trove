import { Button } from '@/components/ui/button'
import { DeleteDialog } from '@/components/ui/delete-dialog'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import useCart from '@/hooks/useCart'
import { type CartItem } from '@/lib/definitions'
import { formatter } from '@/lib/utils'
import { Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const disallowedSymbols = ['e', '+', '-', '.', 'E', ',']

const CartItem = ({ product }: { product: CartItem }) => {
  const [isOpen, setIsOpen] = useState(false)

  const deleteItemInCart = useCart(state => state.deleteItem)
  const incrementItem = useCart(state => state.incrementItem)
  const decrementItem = useCart(state => state.decrementItem)
  const setQuantity = useCart(state => state.setQuantity)

  return (
    <>
      <DeleteDialog
        onConfirm={() => deleteItemInCart(product.id)}
        open={isOpen}
        setOpen={setIsOpen}
        deletedItem={product.title}
      />
      <article className=" grid grid-cols-[auto_1fr_auto_auto]  gap-4 items-center">
        <div className="relative h-16 w-16">
          <Image
            src={product.images[0].url}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>
        <div className="font-semibold">
          <p>{product.title}</p>
          <p>{formatter.format(product.price * product.quantity)}</p>
        </div>
        <div className="flex items-center relative max-w-32 rounded-md border border-foreground">
          <Button
            onClick={() => {
              if (product.quantity === 1) {
                setIsOpen(true)
              }
              if (product.quantity > 1) {
                decrementItem(product.id)
              }
            }}
            variant={'ghost'}
            size={'icon'}
            className="absolute left-0 "
          >
            <Minus />
          </Button>
          <Input
            inputMode="numeric"
            type="number"
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-12 text-center border-none"
            value={product.quantity}
            onChange={e => setQuantity(product.id, Number(e.target.value))}
            min="1"
            step="1"
            onPaste={e => e.preventDefault()}
            onKeyDown={e => {
              if (
                e.key === 'Backspace' ||
                (e.key === 'Delete' && product.quantity < 10)
              ) {
                e.preventDefault()
                setQuantity(product.id, 1)
              }
              disallowedSymbols.includes(e.key) && e.preventDefault()
            }}
          />
          <Button
            onClick={() => incrementItem(product.id)}
            variant={'ghost'}
            size={'icon'}
            className="absolute right-0"
          >
            <Plus />
          </Button>
        </div>
        <Button
          variant="ghost"
          size={'icon-sm'}
          className="text-destructive hover:text-destructive hover:bg- hover:scale-110"
          onClick={() => setIsOpen(true)}
        >
          <Trash2 />
        </Button>
      </article>
      <Separator />
    </>
  )
}

export default CartItem
