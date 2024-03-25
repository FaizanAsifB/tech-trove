'use client'

import { Button } from '@/components/ui/button'
import { formattedDate } from '@/lib/utils'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import type { Category, Image as CategoryImage } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import CellActions from './cell-actions'

export type CategoryColumn = Category & { images: CategoryImage[] }

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'images',
    header: 'Media',
    cell: ({ row }) => {
      const images: CategoryImage[] = row.getValue('images')
      return (
        <div className="flex items-center">
          {images.map(img => {
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
                <Button variant={'ghost'} size={'icon-sm'} className="absolute">
                  <CheckCircleIcon className="h-6 w-6 text-muted-foreground/40 " />
                </Button>
              </div>
            )
          })}
        </div>
      )
    },
  },
  {
    accessorKey: 'updatedAt',
    header: 'Last Updated',
    cell: ({ row }) => {
      const formatted = formattedDate(row.getValue('updatedAt'))

      return <div>{formatted}</div>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellActions category={row.original} />,
  },
]
