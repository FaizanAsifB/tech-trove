import { fetchCategories } from '@/lib/fetch'
import CategoryCard from './category-card'

const CategoryCards = async () => {
  const categories = await fetchCategories()
  return (
    <section className="container space-y-8">
      <h2>Shop by Category</h2>
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
