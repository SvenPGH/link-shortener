'use client';

import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { signIn } from "next-auth/react";

const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        <path d="M1 1h22v22H1z" fill="none" />
    </svg>
);

const GitHubIcon = () => (
    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.799 24 17.301 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
);

const AppleIcon = () => (
    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.393 10.272a4.032 4.032 0 00-3.013-2.06C14.832 7.98 13.702 8 12.304 8c-1.75 0-3.062-.031-4.312.604a4.786 4.786 0 00-3.032 2.847c-.699 1.781-.764 4.868.002 6.415a4.26 4.26 0 003.186 2.128c.44.093.843.14 1.303.14 1.164 0 2.055-.449 3.305-.449.962 0 2.117.45 3.305.45.793 0 1.531-.168 2.091-.396a4.655 4.655 0 002.746-3.129c.099-.526.12-.988.12-1.531 0-1.653-.312-3.179-.92-4.108zm-5.664.011c.008-.008.018-.011.018-.011.52-.497.992-1.278.992-2.131 0-.997-.539-1.989-1.433-2.333a2.084 2.084 0 00-2.168.495c-.52.505-.961 1.28-.961 2.147 0 .983.586 1.975 1.481 2.31a1.954 1.954 0 002.071-.477z"/>
    </svg>
);

export default function LoginPage() {
    const handleOAuthSignIn = (provider: string) => {
        console.log(`Attempting to sign in with ${provider}`);
        alert(`TODO: Implement Sign in with ${provider}`);
    };
    const oauthButtonBaseStyle = "w-full flex items-center justify-center px-4 py-3 text-sm font-medium rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 ease-in-out";
    const oauthButtonStyle = `${oauthButtonBaseStyle} bg-gray-800 dark:bg-gray-200 text-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-300 focus:ring-gray-500 dark:focus:ring-gray-400 dark:focus:ring-offset-black`;
    return (
        <div className="grid place-items-center min-h-[calc(100vh-var(--header-height,30vh))] py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-xs space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Sign In
                    </h2>
                </div>

                <div className="space-y-4 mt-8">
                    <button onClick={() => handleOAuthSignIn('google')} className={oauthButtonStyle}>
                        <GoogleIcon />
                        Sign in with Google
                    </button>
                    <button onClick={() => handleOAuthSignIn('github')} className={oauthButtonStyle}>
                        <GitHubIcon />
                        Sign in with GitHub
                    </button>
                    <button onClick={() => handleOAuthSignIn('apple')} className={oauthButtonStyle}>
                        <AppleIcon />
                        Sign in with Apple
                    </button>
                </div>

                <div className="text-center mt-8">
                    <Link href="/" className="text-sm font-medium border-sm rounded-2xl p-2 shadow-sm border hover:bg-gray-300 dark:hover:bg-gray-200 dark:text-gray-900 transition-colors border-gray-700 text-gray-600 dark:bg-gray-200 dark:border-white">
                        Go back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}