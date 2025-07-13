import { auth } from '@/auth';

export default auth;
export const config = {
  matcher: ["/my-links/:path*", "/profile/:path*"],
};