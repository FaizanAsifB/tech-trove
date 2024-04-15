import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { fetchCategories } from '@/lib/fetch'
import Link from 'next/link'
import CategoryCard from './category-card'

const CategoryCards = async () => {
  const categories = await fetchCategories()
  return (
    <section className="container space-y-8">
      <div className="flex items-center justify-between">
        <h2>Shop by Category</h2>
        <Button asChild variant={'link'}>
          <Link href={'/products'}>See all products</Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-8">
        {categories.map(category => (
          <CategoryCard
            key={category.id}
            title={category.title}
            imgUrl={category.images[0].url}
          />
        ))}
      </div>
    </section>
  )
}
export default CategoryCards
