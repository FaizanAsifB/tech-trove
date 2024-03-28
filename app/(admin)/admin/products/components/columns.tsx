'use client'

import { Button } from '@/components/ui/button'
import { formattedDate } from '@/lib/utils'
import type { Category, Image as CategoryImage } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import CellActions from './cell-actions'
import RowImages from './row-images'

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
    accessorKey: 'category',
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
          <span>IsFeatured</span>
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
    accessorKey: 'images',
    header: 'Media',
    cell: ({ row }) => {
      const images: CategoryImage[] = row.getValue('images')
      return <RowImages images={images} />
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
