import { SignedIn, UserButton } from '@clerk/nextjs'
import MobileNav from './mobile-nav'

const Header = () => {
  return (
    <header className="flex flex-row-reverse h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <MobileNav />

      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  )
}
export default Header
