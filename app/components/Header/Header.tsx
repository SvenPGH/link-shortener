'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import { useTheme } from "@/app/contexts/ThemeContext";

export default function Header() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { darkMode } = useTheme(); // Using 'darkMode' as per your variable name

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const profileButtonRef = useRef<HTMLButtonElement>(null);

    const UserIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
    );

    const handleLoginClick = (): void => {
        setIsLoggedIn(true);
        setIsPopupOpen(false);
    }

    const handleProfileButtonClick = (): void => {
        setIsPopupOpen(prev => !prev);
    }

    const handleLogout = (): void => {
        setIsLoggedIn(false);
        setIsPopupOpen(false);
        console.log("User logged out (pseudo)");
        router.push('/');
    }

    const handleProfileNavigation = (path: string) => {
        setIsPopupOpen(false);
        router.push(path);
    }

    useEffect(() => {
        if (!isPopupOpen) return;
        function handleClickOutside(event: MouseEvent) {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target as Node) &&
                profileButtonRef.current &&
                !profileButtonRef.current.contains(event.target as Node)
            ) {
                setIsPopupOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isPopupOpen]);

    const logoDisplayHeight = 36;
    const logoDisplayWidth = Math.round(logoDisplayHeight * (18 / 9));
    const imageSrc = darkMode ? '/svpicon_cropped_alpha_dark.png' : '/svpicon_cropped_alpha.png';

    return (
        <header className="fixed top-0 left-0 right-0 z-30 grid grid-cols-[auto_1fr_auto] items-center p-4 sm:p-6 bg-white dark:bg-black transition-colors duration-500 ease-in-out">
            <Link href="/" aria-label="Go to Home" className="col-start-1">
                <Image src={imageSrc} alt="SVP.GL Home" width={logoDisplayWidth} height={logoDisplayHeight} priority/>
            </Link>

            <div className="col-start-3 relative">
                {isLoggedIn ? (
                    <button
                        ref={profileButtonRef}
                        onClick={handleProfileButtonClick}
                        aria-label="User account"
                        aria-expanded={isPopupOpen}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300 transition-colors duration-300 ease-in-out"
                    >
                        <UserIcon/>
                    </button>
                ) : (
                    <button
                        onClick={handleLoginClick}
                        aria-label="Log in"
                        className="flex items-center justify-center h-10 px-4 text-sm font-medium rounded-2xl bg-gray-800 dark:bg-gray-200 text-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400 dark:focus:ring-offset-black transition-colors duration-300 ease-in-out" // This button also has its own transition duration (300ms)
                    >
                        Log In
                    </button>
                )}

                {isPopupOpen && isLoggedIn && (
                    <div
                        ref={popupRef}
                        className="absolute right-0 mt-2 w-56 origin-top-right bg-white dark:bg-gray-900 rounded-2xl shadow-lg focus:outline-none z-40 transition-colors duration-300 ease-in-out" // Added transition to popup background
                        role="menu"
                        aria-orientation="vertical"
                    >
                        <div className="py-1" role="none">
                            <button
                                onClick={() => handleProfileNavigation('/profile')}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700/60 rounded-t-lg transition-colors duration-150 ease-in-out" // Shorter transition for menu items
                                role="menuitem"
                            >
                                Profile
                            </button>
                            <button
                                onClick={() => handleProfileNavigation('/my-links')}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700/60 transition-colors duration-150 ease-in-out" // Shorter transition for menu items
                                role="menuitem"
                            >
                                My Links
                            </button>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-neutral-700/60 rounded-b-lg transition-colors duration-150 ease-in-out" // Shorter transition for menu items
                                role="menuitem"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}