import { auth } from '@/auth';

export default auth;

// The matcher specifies which routes the middleware will protect.
// This is more efficient than running it on every single request.
export const config = {
  matcher: [
    "/my-links/:path*",
    "/profile/:path*"
  ],
};