'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

const CheckoutResultPage = () => {
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Order placed! You will receive an email confirmation.')
    }

    if (searchParams.get('canceled')) {
      toast.error(
        'Order canceled -- continue to shop around and checkout when you’re ready.'
      )
    }
  }, [searchParams])

  return (
    <section>
      <div className="container">CheckoutResultPage</div>
    </section>
  )
}

export default CheckoutResultPage
