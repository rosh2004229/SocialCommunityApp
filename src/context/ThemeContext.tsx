import React, { createContext, useEffect, useState } from 'react';
import { getTheme, saveTheme } from '../services/storage';

export type ThemeMode = 'light' | 'dark';

interface Colors {
    background: string;
    card: string;
    text: string;
    secondaryText: string;
    border: string;
    input: string;
    primary: string;
    danger: string;
}

interface ThemeContextType {
    theme: ThemeMode;
    colors: Colors;
    toggleTheme: () => void;
}

const lightColors: Colors = {
    background: '#F5F5F5',
    card: '#FFFFFF',
    text: '#111111',
    secondaryText: '#666666',
    border: '#DDDDDD',
    input: '#FFFFFF',
    primary: '#007AFF',
    danger: '#FF3B30'
};

const darkColors: Colors = {
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    secondaryText: '#AAAAAA',
    border: '#333333',
    input: '#252525',
    primary: '#0A84FF',
    danger: '#FF453A'
};

export const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    colors: lightColors,
    toggleTheme: () => { }
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<ThemeMode>('light');

    useEffect(() => {
        getTheme().then(saved => {
            if (saved) setTheme(saved);
        });
    }, []);

    const toggleTheme = () => {
        const next = theme === 'light' ? 'dark' : 'light';
        setTheme(next);
        saveTheme(next);
    };

    return (
        <ThemeContext.Provider value={{
            theme,
            colors: theme === 'light' ? lightColors : darkColors,
            toggleTheme
        }}>
            {children}
        </ThemeContext.Provider>
    );
};