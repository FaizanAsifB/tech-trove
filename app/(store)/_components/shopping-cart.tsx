'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import useCart from '@/hooks/useCart'
import { ShoppingCart as ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'

const ShoppingCart = () => {
  const itemsInCart = useCart(state => state.items)

  const totalQuantity = itemsInCart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  return (
    <Button variant={'icon'} size={'icon'} asChild className="relative z-10">
      <Link href={'/cart'}>
        <ShoppingCartIcon size={32} />
        {itemsInCart.length > 0 && (
          <Badge
            variant="default"
            aria-label="Total items in cart"
            className="absolute top-0 right-0 rounded-full min-w-6 px-1.5  translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          >
            {totalQuantity}
          </Badge>
        )}
      </Link>
    </Button>
  )
}

export default ShoppingCart
