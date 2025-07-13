// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { prisma } from '@/lib/prisma'

// Force Node.js runtime for this route
export const runtime = 'nodejs'

const handler = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account && user.email) {
        try {
          await prisma.user.upsert({
            where: { email: user.email },
            update: {
              name: user.name,
              image: user.image,
            },
            create: {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
              darkMode: false,
              emailNotifications: false,
              linkAnalytics: false,
            },
          })
        } catch (error) {
          console.error('Error creating/updating user:', error)
          return false
        }
      }
      return true
    },
    async jwt({ token, user, trigger }) {
      if (user) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: {
              id: true,
              darkMode: true,
              emailNotifications: true,
              linkAnalytics: true,
            },
          })
          
          if (dbUser) {
            token.sub = dbUser.id
            token.darkMode = dbUser.darkMode
            token.emailNotifications = dbUser.emailNotifications
            token.linkAnalytics = dbUser.linkAnalytics
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
          token.sub = user.id
          token.darkMode = false
          token.emailNotifications = false
          token.linkAnalytics = false
        }
      }

      if (trigger === 'update' && token.sub) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.sub },
            select: {
              name: true,
              darkMode: true,
              emailNotifications: true,
              linkAnalytics: true,
            },
          })
          
          if (dbUser) {
            token.name = dbUser.name
            token.darkMode = dbUser.darkMode
            token.emailNotifications = dbUser.emailNotifications
            token.linkAnalytics = dbUser.linkAnalytics
          }
        } catch (error) {
          console.error('Error updating user data:', error)
        }
      }
      
      return token
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
        session.user.darkMode = token.darkMode as boolean
        session.user.emailNotifications = token.emailNotifications as boolean
        session.user.linkAnalytics = token.linkAnalytics as boolean
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }