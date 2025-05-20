'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const storedLoginStatus = localStorage.getItem('isPseudoLoggedIn');
        if (storedLoginStatus === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const login = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isPseudoLoggedIn', 'true');
        router.push('/');
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isPseudoLoggedIn');
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};