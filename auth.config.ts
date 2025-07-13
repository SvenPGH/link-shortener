// auth.config.ts
import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import Apple from 'next-auth/providers/apple';

export const authConfig = {
    pages: {
        signIn: '/auth/login',
    },
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        // GitHub({
        //     clientId: process.env.AUTH_GITHUB_ID,
        //     clientSecret: process.env.AUTH_GITHUB_SECRET,
        // }),
        // Apple({
        //     clientId: process.env.AUTH_APPLE_ID,
        //     clientSecret: process.env.AUTH_APPLE_SECRET,
        // }),
    ],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isProtectedRoute = nextUrl.pathname.startsWith('/my-links') || nextUrl.pathname.startsWith('/profile');

            if (isProtectedRoute) {
                if (isLoggedIn) return true;
                return Response.redirect(new URL('/auth/login', nextUrl));
            }
            return true;
        },
    },
} satisfies NextAuthConfig;