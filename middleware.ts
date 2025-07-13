import NextAuth from 'next-auth';
import { authConfig } from './auth.config'; // Import ONLY the edge-safe config

// Initialize NextAuth using only the edge-safe config.
// This creates an `auth` function that is compatible with the Edge Runtime.
export default NextAuth(authConfig).auth;

export const config = {
  // Use the matcher to specify which routes the middleware should protect.
  matcher: ['/my-links/:path*', '/profile/:path*'],
};