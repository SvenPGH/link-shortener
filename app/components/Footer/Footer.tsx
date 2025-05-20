'use client'

import {useTheme} from "@/app/contexts/ThemeContext";

import SunIcon from "@/app/components/Icons/SunIcon";
import MoonIcon from "@/app/components/Icons/MoonIcon";

export default function Footer() {
    const {darkMode, toggleDarkMode} = useTheme();
    return (
        <footer className="row-start-3 grid place-items-center gap-2 text-center py-6 pb-20 sm:pb-24">
            <p className="text-xs text-gray-700 dark:text-gray-400">Link Shortening Service</p>
            <p className="text-xs text-gray-700 dark:text-gray-400">by Sven Puite</p>
            <button onClick={toggleDarkMode} aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"} className="fixed bottom-6 right-6 w-10 h-10 flex items-center justify-center rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-800 text-white border border-gray-700 hover:bg-gray-700 focus:ring-gray-300 dark:focus:ring-offset-white dark:bg-gray-200 dark:text-gray-800 dark:border-gray-300 dark:hover:bg-gray-300 dark:focus:ring-gray-500 transition-colors duration-300 ease-in-out">
                {darkMode ? <SunIcon/> : <MoonIcon/>}
            </button>
        </footer>
    );
}