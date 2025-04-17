import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname === '/login';
      const isOnProfile = nextUrl.pathname.startsWith('/my_profile');
    
      // If not logged in, block profile pages
      if (!isLoggedIn && isOnProfile) {
        return false; // triggers redirect to signIn page
      }
    
      // If logged in and on login page, redirect away
      if (isLoggedIn && isOnLogin) {
        return Response.redirect(new URL('/my_profile', nextUrl));
      }
    
      return true;
    }
  },
  providers: [],
} satisfies NextAuthConfig;