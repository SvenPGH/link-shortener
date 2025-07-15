import NextAuth from 'next-auth';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { authConfig } from './auth.config';
import Google from 'next-auth/providers/google';

export const {handlers, signIn, signOut, auth} = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        ...authConfig.callbacks,
        async jwt({ token, user, trigger, session }) {
            console.log('JWT Callback - Trigger:', trigger);
            console.log('JWT Callback - Token ID:', token.id);

            // Initial sign in - populate token with user data
            if (user) {
                console.log('JWT Callback - Initial sign in for user:', user.id);
                const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
                if (dbUser) {
                    console.log('JWT Callback - Fresh DB user on sign in:', {
                        name: dbUser.name,
                        darkMode: dbUser.darkMode,
                        emailNotifications: dbUser.emailNotifications,
                        linkAnalytics: dbUser.linkAnalytics
                    });
                    token.id = dbUser.id;
                    token.name = dbUser.name;
                    token.darkMode = dbUser.darkMode;
                    token.emailNotifications = dbUser.emailNotifications;
                    token.linkAnalytics = dbUser.linkAnalytics;
                }
            }

            /**
             * Trigger Database Fetch on Update to Update the Session with.
             */
            if (trigger === "update") {
                console.log('JWT Callback - Session update triggered');
                const dbUser = await prisma.user.findUnique({
                    where: { id: token.id as string }
                });
                if (dbUser) {
                    console.log('JWT Callback - Fresh DB user on update:', {
                        name: dbUser.name,
                        darkMode: dbUser.darkMode,
                        emailNotifications: dbUser.emailNotifications,
                        linkAnalytics: dbUser.linkAnalytics
                    });
                    token.name = dbUser.name;
                    token.darkMode = dbUser.darkMode;
                    token.emailNotifications = dbUser.emailNotifications;
                    token.linkAnalytics = dbUser.linkAnalytics;
                } else {
                    console.error('JWT Callback - No user found in DB for ID:', token.id);
                }
            }

            console.log('JWT Callback - Final token:', {
                id: token.id,
                name: token.name,
                darkMode: token.darkMode,
                emailNotifications: token.emailNotifications,
                linkAnalytics: token.linkAnalytics
            });

            return token;
        },

        async session({ session, token }) {
            console.log('Session Callback - Token:', {
                id: token.id,
                name: token.name,
                darkMode: token.darkMode,
                emailNotifications: token.emailNotifications,
                linkAnalytics: token.linkAnalytics
            });

            if (token) {
                session.user.id = token.id as string;
                session.user.name = token.name;
                session.user.darkMode = token.darkMode as boolean;
                session.user.emailNotifications = token.emailNotifications as boolean;
                session.user.linkAnalytics = token.linkAnalytics as boolean;
            }

            console.log('Session Callback - Final session user:', {
                id: session.user.id,
                name: session.user.name,
                darkMode: session.user.darkMode,
                emailNotifications: session.user.emailNotifications,
                linkAnalytics: session.user.linkAnalytics
            });

            return session;
        },
    },
});