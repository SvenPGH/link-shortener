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
            if (user) {
                const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
                if (dbUser) {
                    token.id = dbUser.id;
                    token.name = dbUser.name;
                    token.darkMode = dbUser.darkMode;
                    token.emailNotifications = dbUser.emailNotifications;
                    token.linkAnalytics = dbUser.linkAnalytics;
                }
            }

            if (trigger === "update" && session) {
                token = { ...token, ...session };
            }
            return token;
        },

        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.name = token.name;
                session.user.darkMode = token.darkMode as boolean;
                session.user.emailNotifications = token.emailNotifications as boolean;
                session.user.linkAnalytics = token.linkAnalytics as boolean;
            }
            return session;
        },
    },
});