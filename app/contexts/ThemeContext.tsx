'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {useSession} from "next-auth/react";

interface ThemeContextType {
    darkMode: boolean;
    themeLoaded: boolean;
    toggleDarkMode: () => void;
    setDarkMode: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const SERVER_DEFAULT_THEME_IS_DARK = false;
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const { data: session, status } = useSession();
    const [darkMode, setDarkModeState] = useState(SERVER_DEFAULT_THEME_IS_DARK);
    const [themeLoaded, setThemeLoaded] = useState(false);

    useEffect(() => {
        const storedPreference = localStorage.getItem('theme');
        let clientPreference: boolean;

        if(storedPreference) {
            clientPreference = storedPreference === 'dark';
        } else {
            clientPreference = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? SERVER_DEFAULT_THEME_IS_DARK;
        }

        setDarkModeState(clientPreference);
        setThemeLoaded(true);
    }, [])

    useEffect(() => {
        if(status === 'authenticated' && session.user && !localStorage.getItem('theme')) {
            setDarkModeState(session.user.darkMode);
        }
    }, [status, session]);

    useEffect(() => {
        if(!themeLoaded) return;

        const root = document.documentElement;
        if(darkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [darkMode, themeLoaded]);

    const setDarkMode = (value: boolean) => {
        localStorage.setItem('theme', value ? 'dark' : 'light');
        setDarkModeState(value);
        if(!themeLoaded) setThemeLoaded(true);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <ThemeContext.Provider value={{ darkMode, themeLoaded, toggleDarkMode, setDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider.');
    }
    return context;
};