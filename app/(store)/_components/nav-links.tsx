import { fetchCategories } from '@/lib/queries'
import Link from 'next/link'

const NavLinks = async () => {
  const categories = await fetchCategories()

  return (
    <nav className="flex gap-6">
      <Link href="/">Logo</Link>

      <ul className="flex gap-6">
        {categories.map(category => (
          <li key={category.id}>
            <Link
              href={`/products?filter=${category.title} `}
              className="shadow-[inset_0_0_0_0_hsl(var(--primary))]
               hover:shadow-[inset_200px_0_0_0_hsl(var(--primary))] hover:text-primary-foreground px-2 transition-all duration-500 "
            >
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavLinks
