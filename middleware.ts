import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
} from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/admin(.*)', '/orders(.*)'])

export default clerkMiddleware(
  async (auth, req) => {
    if (isProtectedRoute(req)) auth().protect()
  },
  { clockSkewInMs: 60 * 1000 }
)

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
