import type { Session } from 'next-auth';
import type { NextRequest } from 'next/server';

export const authConfig = {
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }: { auth: Session | null; request: NextRequest }) {
            const isLoggedIn = !!auth?.user;
            const isProtectedRoute = nextUrl.pathname.startsWith('/my-links') || nextUrl.pathname.startsWith('/profile');

            if (isProtectedRoute) {
                if (isLoggedIn) return true;
                return false;
            }
            return true;
        },
    },
    providers: [],
};