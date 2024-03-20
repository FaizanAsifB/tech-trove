import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import prismaDb from '@/lib/prisma'
import axios from 'axios'
import Link from 'next/link'
import DeleteButton from './components/DeleteButton'

const CategoriesPage = async () => {
  const categories = await prismaDb.category.findMany()

  return (
    <section>
      <Heading
        title="Categories"
        description="Manage categories for your products"
      />
      <Button asChild>
        <Link href="categories/create">Create Category</Link>
      </Button>
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
        {categories.map(category => (
          <article key={category.id}>
            <h3>{category.title}</h3>
            <Button asChild>
              <Link href={`/admin/categories/edit/${category.id}`}>Edit</Link>
            </Button>
            <DeleteButton categoryId={category.id}></DeleteButton>
          </article>
        ))}
      </div>
    </section>
  )
}
export default CategoriesPage
