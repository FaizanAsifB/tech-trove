'use client'

import { Button } from '@/components/ui/button'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

const FeaturedPagination = ({ totalPages }: { totalPages: number }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('feature-page') || 1)

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )
  return (
    <div className=" flex justify-center items-center gap-6">
      <Button
        size={'sm'}
        disabled={currentPage === 1}
        onClick={() => {
          router.push(
            `${pathname}?${createQueryString(
              'feature-page',
              String(currentPage - 1)
            )}`,
            { scroll: false }
          )
        }}
      >
        &lt;
      </Button>
      <span>
        Page {currentPage} Of {totalPages}
      </span>
      <Button
        size={'sm'}
        disabled={currentPage >= totalPages}
        onClick={() => {
          router.push(
            `${pathname}?${createQueryString(
              'feature-page',
              String(currentPage + 1)
            )}`,
            { scroll: false }
          )
        }}
      >
        &gt;
      </Button>
    </div>
  )
}
export default FeaturedPagination
