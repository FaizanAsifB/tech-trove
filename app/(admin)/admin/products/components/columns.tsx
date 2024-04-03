'use client'

import { Button } from '@/components/ui/button'
import { formattedDate } from '@/lib/utils'
import { Product, Image as ProductImage } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, CheckCircleIcon, MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import CellActions from './cell-actions'
import RowImages from './row-images'

export type ProductColumn = Omit<Product, 'price'> & { price: number } & {
  images: ProductImage[]
}

export const columns: ColumnDef<ProductColumn>[] = [
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
    accessorKey: 'description',
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          <span>Description</span>
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
    accessorKey: 'category.title',
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          <span>Category</span>
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
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          <span>Price</span>
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
    accessorKey: 'isFeatured',
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          <span>Featured</span>
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
      return row.getValue('isFeatured') ? (
        <CheckCircleIcon className="h-6 w-6 text-green-600 mx-auto" />
      ) : null
    },
  },
  {
    accessorKey: 'images',
    header: 'Media',
    cell: ({ row }) => {
      const images: ProductImage[] = row.getValue('images')
      return images.map(img => (
        <div key={img.id} className="relative w-16 h-16 overflow-hidden">
          <Image
            fill
            className="object-contain object-center"
            src={img.url}
            alt=""
          />
        </div>
      ))
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
    cell: ({ row }) => <CellActions product={row.original} />,
  },
]
