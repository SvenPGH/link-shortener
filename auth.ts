import NextAuth from 'next-auth';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import type { JWT } from 'next-auth/jwt';

import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        /**
         * TODO: Add Apple | Github Auth here as well
         */
    ],
    callbacks: {
        async session({ session, token }) {
            const customToken = token as JWT & {
                darkMode: boolean;
                emailNotifications: boolean;
                linkAnalytics: boolean;
            };

            if(customToken.sub && session.user) {
                session.user.id = customToken.sub;
                session.user.darkMode = customToken.darkMode;
                session.user.emailNotifications = customToken.emailNotifications;
                session.user.linkAnalytics = customToken.linkAnalytics;
            }
            return session;
        },
        async jwt({ token, user, trigger }) {
            if(user) {
                const dbUser = await prisma.user.findUnique({ where: { id: user.id } })
                if(dbUser) {
                    token.sub = dbUser.id;
                    token.darkMode = dbUser.darkMode;
                    token.emailNotifications = dbUser.emailNotifications;
                    token.linkAnalytics = dbUser.linkAnalytics;
                }
            }

            if(trigger === 'update' && token.sub) {
                const dbUser = await prisma.user.findUnique({ where: { id: token.sub } });
                if(dbUser) {
                    token.name = dbUser.name;
                    token.darkMode = dbUser.darkMode;
                    token.emailNotifications = dbUser.emailNotifications;
                    token.linkAnalytics = dbUser.linkAnalytics;
                }
            }
            return token;
        }
    }
});