import NextAuth from 'next-auth';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma"; // Assuming this is your prisma client instance
import { authConfig } from './auth.config';

export const {handlers, signIn, signOut, auth,} = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig, // Spread the rest of the edge-safe config
    callbacks: {
        // Your existing authorized callback from authConfig will be included here
        ...authConfig.callbacks,

        // Server-only JWT and session callbacks
        async jwt({ token, user }) {
            if (user?.id) {
                // When a user logs in, fetch their data and add it to the token
                const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
                if (dbUser) {
                    token.id = dbUser.id;
                    token.darkMode = dbUser.darkMode;
                    token.emailNotifications = dbUser.emailNotifications;
                    token.linkAnalytics = dbUser.linkAnalytics;
                }
            }
            return token;
        },
        async session({ session, token }) {
            // Add the custom properties from the token to the client-side session
            if (token.id && session.user) {
                session.user.id = token.id as string;
                session.user.darkMode = token.darkMode as boolean;
                session.user.emailNotifications = token.emailNotifications as boolean;
                session.user.linkAnalytics = token.linkAnalytics as boolean;
            }
            return session;
        },
    },
});