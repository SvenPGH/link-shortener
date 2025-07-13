import type { Session } from 'next-auth';
import type { NextRequest } from 'next/server';

export const authConfig = {
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        authorized({ auth, request }: { auth: Session | null; request: NextRequest }) {
            const isLoggedIn = !!auth?.user;
            const { nextUrl } = request;
            const isProtectedRoute = nextUrl.pathname.startsWith('/my-links') || nextUrl.pathname.startsWith('/profile');

            if (isProtectedRoute) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to the login page
            }
            return true;
        },
    },
    providers: [],
};