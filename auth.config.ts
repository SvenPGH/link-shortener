import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  providers: [],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtectedRoute = nextUrl.pathname.startsWith('/my-links') || nextUrl.pathname.startsWith('/profile');

      if (isProtectedRoute) {
        if (isLoggedIn) return true; // Allow access if logged in
        return false; // Redirect unauthenticated users to the login page
      }

      return true; // Allow access to all other pages
    },
  },
} satisfies NextAuthConfig;