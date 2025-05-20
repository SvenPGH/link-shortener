'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
    darkMode: boolean;
    themeLoaded: boolean;
    toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const SERVER_DEFAULT_THEME_IS_DARK = false;

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [darkMode, setDarkMode] = useState(SERVER_DEFAULT_THEME_IS_DARK);
    const [themeLoaded, setThemeLoaded] = useState(false);

    useEffect(() => {
        const storedPreference = localStorage.getItem('theme');

        let clientPreference: boolean;
        if(storedPreference) {
            clientPreference = storedPreference === 'dark';
        } else {
            clientPreference = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? SERVER_DEFAULT_THEME_IS_DARK;
        }

        setDarkMode(clientPreference);
        setThemeLoaded(true);

        const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            if(!localStorage.getItem('theme')) setDarkMode(e.matches);
        };

        if (mediaQuery) {
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, [])

    useEffect(() => {
        if (!themeLoaded) return;

        const root = document.documentElement;
        if (darkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode, themeLoaded]);


    const toggleDarkMode = () => {
        setDarkMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem('theme', newMode ? 'dark' : 'light');
            return newMode;
        });
        if(!themeLoaded) setThemeLoaded(true);
    };

    return (
        <ThemeContext.Provider value={{darkMode: darkMode, themeLoaded: themeLoaded, toggleDarkMode: toggleDarkMode}}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use the ThemeContext
export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider. Make sure your component is a child of <ThemeProvider>.');
    }
    return context;
};