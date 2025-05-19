'use client'

import Image from 'next/image';
import Link from 'next/link';
import {useState} from "react";
import {useRouter} from 'next/navigation';
import {useTheme} from "@/app/contexts/ThemeContext";

export default function Header() {
    const router = useRouter();
    const {darkMode} = useTheme();

    const UserIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
    );

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLoginClick = (): void => {
        router.push('/login');
    }

    const handleUserClick = (): void => {
        setIsLoggedIn(false);
        // router.push('/profile');
    }

    const logoDisplayHeight = 36;
    const logoDisplayWidth = Math.round(logoDisplayHeight * (18 / 9));
    const imageSrc = darkMode ? '/svpicon_cropped_alpha-dark.png' : '/svpicon_cropped_alpha.png';

    return (
        <header className="fixed top-0 left-0 right-0 z-10 grid grid-cols-[auto_1fr_auto] items-center p-4 sm:p-6">
            <Link href="/" aria-label="Go to Home" className="col-start-1">
                <Image src={imageSrc} alt="SVP.GL Home" width={logoDisplayWidth} height={logoDisplayHeight} priority/>
            </Link>
            <div className="col-start-3">
                {isLoggedIn ? (
                    <button onClick={handleUserClick} aria-label="User account" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors duration-300 ease-in-out">
                        <UserIcon/>
                    </button>
                ) : (
                    <button onClick={handleLoginClick} aria-label="Log in" className=" px-4 py-2 text-sm font-medium rounded-2xl bg-gray-800 dark:bg-gray-200 text-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400 dark:focus:ring-offset-black transition-colors duration-300 ease-in-out">
                        Log In
                    </button>
                )}
            </div>
        </header>
    );
}