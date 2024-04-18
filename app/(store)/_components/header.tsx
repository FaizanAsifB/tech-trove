import prismaDb from '@/lib/prisma'
import { fetchCategories } from '@/lib/queries'
import Link from 'next/link'

const Header = async () => {
  const categories = await fetchCategories()

  return (
    <header className="py-8">
      <div className="container flex justify-between">
        <nav className="flex gap-6">
          <Link href="/">Logo</Link>

          <ul className="flex gap-6">
            {categories.map(category => (
              <li key={category.id}>
                <Link href={`/products?filter=${category.title} `}>
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
export default Header
