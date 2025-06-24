import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            darkMode: boolean;
            emailNotifications: boolean;
            linkAnalytics: boolean;
        } & DefaultSession['user'];
    }

    interface User {
        darkMode: boolean;
        emailNotifications: boolean;
        linkAnalytics: boolean;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        darkMode: boolean;
        emailNotifications: boolean;
        linkAnalytics: boolean;
    }
}