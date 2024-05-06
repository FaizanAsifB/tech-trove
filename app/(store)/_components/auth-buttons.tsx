import { Button } from '@/components/ui/button'
import { checkRole } from '@/lib/roles'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const AuthButtons = () => {
  return (
    <>
      <SignedIn>
        <Link href={'/orders'}>Orders</Link>
        {checkRole('admin') ? <Link href={'/admin'}>Admin </Link> : null}
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <Button>Sign In</Button>
        </SignInButton>
      </SignedOut>
    </>
  )
}

export default AuthButtons
