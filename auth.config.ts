// middleware.ts
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  // Matcher to specify which routes the middleware should protect.
  matcher: ['/my-links/:path*', '/profile/:path*'],
};