'use client'

import { Category } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'media',
    header: 'Media',
  },
  {
    accessorKey: 'updatedAt',
    header: 'Last Updated',
  },
]
