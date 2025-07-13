export { auth as middleware } from './auth';

export const config = {
    matcher: ['/my-links/:path*', '/profile/:path*'],
};