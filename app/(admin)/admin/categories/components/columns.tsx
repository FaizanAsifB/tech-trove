'use client'

import { Button } from '@/components/ui/button'
import { toggleIsDefault } from '@/lib/actions'
import { formattedDate } from '@/lib/utils'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import type { Category, Image as CategoryImage } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import CellActions from './cell-actions'

export type CategoryColumn = Category & { images: CategoryImage[] }

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          <span>Title</span>
          <Button
            variant="ghost"
            size={'icon-sm'}
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      )
    },
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
                <Button
                  variant={'ghost'}
                  size={'icon-sm'}
                  className="absolute"
                  onClick={() =>
                    toggleIsDefault(img.public_id, img.categoryId!)
                  }
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
    },
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          <p>Last Updated</p>
          <Button
            variant="ghost"
            size={'icon-sm'}
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      )
    },
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
