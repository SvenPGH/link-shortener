'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

type AuthError = 'InvalidCheck' | 'OAuthSignin' | 'OAuthCallback' | 'Configuration' | 'AccessDenied' | 'Verification' | string;

function ErrorContent(): JSX.Element {
    const searchParams = useSearchParams();
    const error = searchParams.get('error') as AuthError;

    const getErrorMessage = (error: AuthError): string => {
        switch (error) {
            case 'InvalidCheck':
                return 'Authentication failed due to a security check. Please clear your browser cookies and try signing in again.';
            case 'OAuthSignin':
                return 'There was a problem with the OAuth provider. Please try again.';
            case 'OAuthCallback':
                return 'There was a problem processing your sign-in callback. Please try again.';
            case 'Configuration':
                return 'There is a problem with the server configuration. Please contact support.';
            case 'AccessDenied':
                return 'Access was denied. You may not have permission to sign in.';
            case 'Verification':
                return 'The verification token has expired or has already been used.';
            default:
                return 'An authentication error occurred. Please try again.';
        }
    };

    const getErrorTitle = (error: AuthError): string => {
        switch (error) {
            case 'InvalidCheck':
                return 'Security Check Failed';
            case 'OAuthSignin':
            case 'OAuthCallback':
                return 'OAuth Error';
            case 'Configuration':
                return 'Server Configuration Error';
            case 'AccessDenied':
                return 'Access Denied';
            case 'Verification':
                return 'Verification Error';
            default:
                return 'Sign In Error';
        }
    };

    const handleTryAgain = (): void => {
        // Clear any auth-related localStorage/sessionStorage
        if (typeof window !== 'undefined') {
            localStorage.removeItem('nextauth.message');
            sessionStorage.clear();
        }
        window.location.href = '/auth/signin';
    };

    const handleClearCookies = (): void => {
        if (typeof window !== 'undefined') {
            // Clear cookies for the current domain
            document.cookie.split(";").forEach((c) => {
                const eqPos = c.indexOf("=");
                const name = eqPos > -1 ? c.substr(0, eqPos) : c;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
            });
        }
        handleTryAgain();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <div className="text-center mb-6">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                        <svg
                            className="h-6 w-6 text-red-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {getErrorTitle(error)}
                    </h1>
                    <p className="text-gray-600 text-sm mb-6">
                        {getErrorMessage(error)}
                    </p>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={handleTryAgain}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                        Try Again
                    </button>

                    {error === 'InvalidCheck' && (
                        <button
                            onClick={handleClearCookies}
                            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors duration-200 font-medium"
                        >
                            Clear Cookies & Try Again
                        </button>
                    )}

                    <button
                        onClick={() => window.location.href = '/'}
                        className="w-full text-gray-500 py-2 px-4 rounded-md hover:text-gray-700 transition-colors duration-200"
                    >
                        Back to Home
                    </button>
                </div>

                {process.env.NODE_ENV === 'development' && (
                    <div className="mt-6 p-4 bg-gray-100 rounded-md">
                        <p className="text-xs text-gray-500 font-mono">
                            Debug Info: {error || 'No error code provided'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function AuthError(): JSX.Element {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        }>
            <ErrorContent />
        </Suspense>
    );
}