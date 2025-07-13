import type {NextAuthConfig} from 'next-auth';

export const authConfig = {
    pages: {signIn: '/auth/login',},
    callbacks: {
        authorized({auth, request: {nextUrl}}) {
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
} satisfies NextAuthConfig;