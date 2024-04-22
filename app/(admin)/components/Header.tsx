import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { CircleUser, Search } from 'lucide-react'
import MobileNav from './MobileNav'

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
