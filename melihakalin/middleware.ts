import { withAuth } from 'next-auth/middleware';

export default withAuth({
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: '/sign-in',
    signOut: '/',
    newUser: '/dashboard?newuser=true',
    // error: '/error',
  },
});
export const config = { matcher: ['/dashboard/:path*'] };
