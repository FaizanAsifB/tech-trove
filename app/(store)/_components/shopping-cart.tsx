'use client'

import { Button } from '@/components/ui/button'
import useCart from '@/hooks/useCart'
import { ShoppingCart as ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'

const ShoppingCart = () => {
  const itemsInCart = useCart(state => state.items)

  return (
    <Button variant={'icon'} size={'icon'} asChild>
      <Link href={'/cart'}>
        <ShoppingCartIcon />
        <span>{itemsInCart.length}</span>
      </Link>
    </Button>
  )
}

export default ShoppingCart
