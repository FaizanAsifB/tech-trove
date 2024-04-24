'use client'

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
    <Button variant={'icon'} size={'icon'} asChild>
      <Link href={'/cart'}>
        <ShoppingCartIcon />
        {itemsInCart.length > 0 && <span>{totalQuantity}</span>}
      </Link>
    </Button>
  )
}

export default ShoppingCart
