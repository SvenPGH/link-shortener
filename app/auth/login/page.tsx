'use client';

import Link from 'next/link';

import GithubIcon from "@/app/components/Icons/GithubIcon";
import GoogleIcon from "@/app/components/Icons/GoogleIcon";
import AppleIcon from "@/app/components/Icons/AppleIcon";

// import { useRouter } from 'next/navigation';
// import { signIn } from "next-auth/react";

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
                        <GoogleIcon/>
                        Sign in with Google
                    </button>
                    <button onClick={() => handleOAuthSignIn('github')} className={oauthButtonStyle}>
                        <GithubIcon/>
                        Sign in with GitHub
                    </button>
                    <button onClick={() => handleOAuthSignIn('apple')} className={oauthButtonStyle}>
                        <AppleIcon/>
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