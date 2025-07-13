import NextAuth from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
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
        async signIn({ user, account, profile }) {
            // Handle user creation/update via API route instead of direct Prisma calls
            if (account && user.email) {
                try {
                    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/user`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            image: user.image,
                            provider: account.provider,
                        }),
                    });

                    if (!response.ok) {
                        console.error('Failed to create/update user');
                        return false;
                    }
                } catch (error) {
                    console.error('Error in signIn callback:', error);
                    return false;
                }
            }
            return true;
        },
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
                // Fetch user data via API route instead of direct Prisma call
                try {
                    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/user/${user.id}`);
                    if (response.ok) {
                        const dbUser = await response.json();
                        token.sub = dbUser.id;
                        token.darkMode = dbUser.darkMode || false;
                        token.emailNotifications = dbUser.emailNotifications || false;
                        token.linkAnalytics = dbUser.linkAnalytics || false;
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    // Fallback to default values
                    token.sub = user.id;
                    token.darkMode = false;
                    token.emailNotifications = false;
                    token.linkAnalytics = false;
                }
            }

            if(trigger === 'update' && token.sub) {
                // Fetch updated user data via API route
                try {
                    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/user/${token.sub}`);
                    if (response.ok) {
                        const dbUser = await response.json();
                        token.name = dbUser.name;
                        token.darkMode = dbUser.darkMode || false;
                        token.emailNotifications = dbUser.emailNotifications || false;
                        token.linkAnalytics = dbUser.linkAnalytics || false;
                    }
                } catch (error) {
                    console.error('Error updating user data:', error);
                }
            }
            return token;
        }
    }
});