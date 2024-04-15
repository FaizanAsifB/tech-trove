import { fetchCategories } from '@/lib/fetch'
import prismaDb from '@/lib/prisma'
import Link from 'next/link'

const header = async () => {
  const categories = await fetchCategories()

  return (
    <header className="py-8">
      <div className="container flex justify-between">
        <nav className="flex gap-6">
          <Link href="/">Logo</Link>

          <ul className="flex gap-6">
            {categories.map(category => (
              <li key={category.id}>
                <Link href={`/${category.title.toLowerCase()}`}>
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex gap-6">
          <div>login</div>
          <div>Cart</div>
        </div>
      </div>
    </header>
  )
}
export default header
