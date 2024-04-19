import { Button } from '@/components/ui/button'
import { fetchCategories } from '@/lib/queries'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { ShoppingCart } from 'lucide-react'
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
        <div className="flex gap-6 justify-center items-center">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
          <Button variant={'icon'} size={'icon'} asChild>
            <Link href={'/cart'}>
              <ShoppingCart />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
export default Header
