'use client'

import { Separator } from '@/components/ui/separator'
import useCart from '@/hooks/useCart'
import { CheckIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

const CheckoutResultPage = () => {
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

  return (
    <section>
      <div className="bg-gray-100 dark:bg-gray-950 py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center justify-center rounded-full bg-green-100 p-2 dark:bg-green-900/20">
              <CheckIcon className="h-6 w-6 text-green-500 dark:text-green-400" />
            </div>
            <h1 className="text-3xl font-bold md:text-4xl">
              Thank you for your order!
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Your order has been successfully processed. We&apos;ll send you a
              confirmation email with the details.
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-2xl mx-auto grid gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold">Order Summary</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    alt="Product Image"
                    className="rounded-md"
                    height={64}
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: '64/64',
                      objectFit: 'cover',
                    }}
                    width={64}
                  />
                  <div>
                    <h3 className="font-medium">Acme Circles T-Shirt</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Quantity: 2
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">$99.00</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    alt="Product Image"
                    className="rounded-md"
                    height={64}
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: '64/64',
                      objectFit: 'cover',
                    }}
                    width={64}
                  />
                  <div>
                    <h3 className="font-medium">Aqua Filters</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Quantity: 1
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">$49.00</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <p className="font-medium">Total</p>
                <p className="font-medium text-2xl">$148.00</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="#"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CheckoutResultPage
