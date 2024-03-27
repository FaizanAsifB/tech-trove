import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import prismaDb from '@/lib/prisma'
import { formattedDate } from '@/lib/utils'
import axios from 'axios'
import Link from 'next/link'
import DeleteButton from './components/DeleteButton'
import { columns } from './components/columns'

const CategoriesPage = async () => {
  const categories = await prismaDb.category.findMany({
    include: {
      images: {
        orderBy: {
          id: 'desc',
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  // const formattedCategories = categories.map(category => ({
  //   id: category.id,
  //   title: category.title,
  //   updatedAt: formattedDate(category.updatedAt),
  //   media: category.images.map(img => img.id),
  // }))

  return (
    <section className="flex flex-col flex-1 space-y-6">
      <div className="flex justify-between items-center">
        <Heading
          title={`Categories (${categories.length})`}
          description="Manage categories for your products"
        />
        <Button asChild>
          <Link href="categories/create">Add Category</Link>
        </Button>
      </div>

      <div className="flex flex-col flex-1">
        {categories.length === 0 ? (
          <div className="flex flex-col flex-1 justify-center items-center gap-1 text-center">
            <p>No Categories found.</p>
            <Button asChild>
              <Link href="categories/create">Create Category</Link>
            </Button>
          </div>
        ) : (
          <DataTable columns={columns} data={categories} />
        )}
      </div>
    </section>
  )
}
export default CategoriesPage
