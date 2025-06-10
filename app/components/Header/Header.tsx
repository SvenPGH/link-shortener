'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import { useTheme } from "@/app/contexts/ThemeContext";

import UserIcon from "@/app/components/Icons/UserIcon";

export default function Header() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { darkMode } = useTheme();

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const profileButtonRef = useRef<HTMLButtonElement>(null);

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

    const profileButtonBaseClasses = "relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ease-in-out focus:outline-none";
    const profileButtonColors = "bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300";
    const openPopupRingClasses = "ring-2 ring-indigo-500 dark:ring-indigo-400 ring-offset-2 dark:ring-offset-black";

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
                        className={`${profileButtonBaseClasses} ${profileButtonColors} ${isPopupOpen ? openPopupRingClasses : 'focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-300 focus:ring-offset-2 dark:focus:ring-offset-black'}`}
                    >
                        <UserIcon/>
                    </button>
                ) : (
                    <button
                        onClick={handleLoginClick}
                        aria-label="Log in"
                        className="flex items-center justify-center h-10 px-4 text-sm font-medium rounded-2xl bg-gray-800 dark:bg-gray-200 text-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400 dark:focus:ring-offset-black transition-colors duration-300 ease-in-out"
                    >
                        Log In
                    </button>
                )}

                {isPopupOpen && isLoggedIn && (
                    <div
                        ref={popupRef}
                        className="absolute right-0 mt-2 w-56 origin-top-right bg-white dark:bg-gray-900 rounded-2xl shadow-lg focus:outline-none z-40 transition-colors duration-300 ease-in-out"
                        role="menu"
                        aria-orientation="vertical"
                    >
                        <div className="py-1" role="none">
                            <button onClick={() => handleProfileNavigation('/profile')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700/60 rounded-t-lg transition-colors duration-150 ease-in-out" role="menuitem">
                                Profile
                            </button>
                            <button onClick={() => handleProfileNavigation('/my-links')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700/60 transition-colors duration-150 ease-in-out" role="menuitem">
                                My Links
                            </button>
                            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-neutral-700/60 rounded-b-lg transition-colors duration-150 ease-in-out" role="menuitem">
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}