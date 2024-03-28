'use client'

import { Button } from '@/components/ui/button'
import { toggleIsDefault } from '@/lib/actions'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { Image as CategoryImage } from '@prisma/client'
import Image from 'next/image'
import { useOptimistic, useTransition } from 'react'
import { twMerge } from 'tailwind-merge'

type RowImagesProps = {
  images: CategoryImage[]
}

const RowImages = ({ images }: RowImagesProps) => {
  const [isPending, startTransition] = useTransition()
  const [optimisticImages, addOptimisticImages] = useOptimistic(
    images,
    updateFn
  )

  function updateFn(state: CategoryImage[], imgId: string) {
    return state.map(img => {
      if (img.id === imgId) {
        return {
          ...img,
          isDefault: true,
        }
      }
      return {
        ...img,
        isDefault: false,
      }
    })
  }

  return (
    <div className="flex items-center">
      {optimisticImages.map(img => {
        return (
          <div
            key={img.id}
            className="relative w-[calc(620px/6)] h-[calc(720px/12)] overflow-hidden"
          >
            <Image
              fill
              className="object-cover object-center translate-y-2"
              src={img.url}
              alt=""
            />
            <Button
              variant={'ghost'}
              size={'icon-sm'}
              className="absolute"
              onClick={() => {
                if (img.isDefault) return
                startTransition(() => addOptimisticImages(img.id))
                toggleIsDefault(img.public_id, img.categoryId!)
              }}
            >
              <CheckCircleIcon
                className={twMerge(
                  'h-6 w-6 text-muted-foreground/40 ',
                  img.isDefault ? 'text-green-600' : ''
                )}
              />
            </Button>
          </div>
        )
      })}
    </div>
  )
}
export default RowImages
