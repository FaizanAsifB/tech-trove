import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import prismaDb from '@/lib/prisma'
import Link from 'next/link'

const CategoriesPage = async () => {
  const categories = await prismaDb.category.findMany()
  console.log(categories)

  return (
    <section>
      <Heading
        title="Categories"
        description="Manage categories for your products"
      />
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
            <button>edit</button>
            <button>delete</button>
          </article>
        ))}
      </div>
    </section>
  )
}
export default CategoriesPage
