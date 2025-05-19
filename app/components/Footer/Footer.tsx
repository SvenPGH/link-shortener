'use client'

import {useTheme} from "@/app/contexts/ThemeContext"; // Assuming this is your ThemeContext path

export default function Footer() {
    const {darkMode, toggleDarkMode} = useTheme();

    const SunIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
    );

    const MoonIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
    );

    return (
        <footer className="row-start-3 grid place-items-center gap-2 text-center py-6 pb-20 sm:pb-24">
            <p className="text-xs text-gray-700 dark:text-gray-400">Full Time Link Shortener</p>
            <p className="text-xs text-gray-700 dark:text-gray-400">by Sven Puite</p>
            <button onClick={toggleDarkMode} aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"} className="fixed bottom-6 right-6 w-12 h-12 flex items-center justify-center rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-800 text-white border border-gray-700 hover:bg-gray-700 focus:ring-gray-300 dark:focus:ring-offset-white dark:bg-gray-200 dark:text-gray-800 dark:border-gray-300 dark:hover:bg-gray-300 dark:focus:ring-gray-500 transition-colors duration-300 ease-in-out">
                {darkMode ? <SunIcon/> : <MoonIcon/>}
            </button>
        </footer>
    );
}