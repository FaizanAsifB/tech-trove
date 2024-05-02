'use client'

import useCart from '@/hooks/useCart'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

const OrderSuccessToast = () => {
  const searchParams = useSearchParams()
  const deleteAll = useCart(state => state.deleteAll)

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Order placed! You will receive an email confirmation.')
    }

    if (searchParams.get('canceled')) {
      toast.error(
        'Order canceled -- continue to shop around and checkout when you’re ready.'
      )
      deleteAll()
    }
  }, [searchParams, deleteAll])

  return <></>
}

export default OrderSuccessToast
