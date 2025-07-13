import NextAuth from 'next-auth';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Google from 'next-auth/providers/google';
import { authConfig } from './auth.config'; // Import the edge-safe config

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig, // Spread the base, edge-safe config
  adapter: PrismaAdapter(prisma), // Add the Node.js database adapter
  session: { strategy: "jwt" },
  providers: [ // Define providers here where database access is available
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    ...authConfig.callbacks, // IMPORTANT: Inherit the `authorized` callback

    // These JWT/Session callbacks use the database and only run in the Node.js runtime
    async jwt({ token, user, trigger }) {
        if (user) {
            const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
            if (dbUser) {
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
    },
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
  }
});