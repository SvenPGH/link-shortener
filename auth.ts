import NextAuth from 'next-auth';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { authConfig } from './auth.config'; // Import the edge-safe config

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    ...authConfig.callbacks,

    // These callbacks use the database and will only run in the Node.js runtime
    async session({ session, token }) {
        const customToken = token as any;

        if (customToken.sub && session.user) {
            session.user.id = customToken.sub;
            session.user.darkMode = customToken.darkMode;
            session.user.emailNotifications = customToken.emailNotifications;
            session.user.linkAnalytics = customToken.linkAnalytics;
        }
        return session;
    },
    async jwt({ token, user, trigger }) {
        if (user) {
            const dbUser = await prisma.user.findUnique({ where: { id: user.id }});
            if(dbUser) {
                token.sub = dbUser.id;
                token.darkMode = dbUser.darkMode;
                token.emailNotifications = dbUser.emailNotifications;
                token.linkAnalytics = dbUser.linkAnalytics;
            }
        }
        if (trigger === "update" && token.sub) {
            const dbUser = await prisma.user.findUnique({ where: { id: token.sub as string } });
            if (dbUser) {
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