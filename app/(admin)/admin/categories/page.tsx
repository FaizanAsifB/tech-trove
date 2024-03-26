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

  const formattedCategories = categories.map(category => ({
    id: category.id,
    title: category.title,
    updatedAt: formattedDate(category.updatedAt),
    media: category.images.map(img => img.id),
  }))

  return (
    <section>
      <header className="flex justify-between items-center">
        <Heading
          title="Categories"
          description="Manage categories for your products"
        />
        <Button asChild>
          <Link href="categories/create">+ Add Category</Link>
        </Button>
      </header>
      <Separator />
      <div>
        {categories.length === 0 ? (
          <>
            <p>No Categories found.</p>
            <Button asChild>
              <Link href="categories/create">Create Category</Link>
            </Button>
          </>
        ) : (
          ''
        )}
        <DataTable columns={columns} data={categories} />
        {/* {categories.map(category => (
          <article key={category.id}>
            <h3>{category.title}</h3>
            <Button asChild>
              <Link href={`/admin/categories/edit/${category.id}`}>Edit</Link>
            </Button>
            <DeleteButton categoryId={category.id}></DeleteButton>
          </article>
        ))} */}
      </div>
    </section>
  )
}
export default CategoriesPage
