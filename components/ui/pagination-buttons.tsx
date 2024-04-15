'use client'

import { useCallback } from 'react'
import { Button } from './button'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type PaginationButtonsProps = {
  totalPages: number
  queryParamKey: string
}

const PaginationButtons = ({
  totalPages,
  queryParamKey,
}: PaginationButtonsProps) => {
  const searchParams = useSearchParams()

  const router = useRouter()
  const pathname = usePathname()
  const currentPage = Number(searchParams.get(queryParamKey) || 1)

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
              queryParamKey,
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
              queryParamKey,
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

export default PaginationButtons
