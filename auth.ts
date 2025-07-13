import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import Google from 'next-auth/providers/google';
import NextAuth from 'next-auth/next';
import { authConfig } from './auth.config';

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // It's important to merge the callbacks, keeping the `authorized` callback from the config
    ...authConfig.callbacks,

    // These callbacks use the database and will only run on the server (Node.js runtime)
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