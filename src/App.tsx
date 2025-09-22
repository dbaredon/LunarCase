import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { LIGHT_THEME, DARK_THEME } from './framework/theme';
import Transactions from './app/transactions/Transactions';
import { Sidebar } from './app/sidebar/Sidebar';
import { Home } from './app/home/Home';

// Saving of color theme
export const App = () => {
    const prefersDark =
        typeof window !== 'undefined'
            ? window.matchMedia?.('(prefers-color-scheme: dark)').matches
            : false;
    
    const [isDark, setIsDark] = React.useState<boolean>(() => {
        const saved = typeof window !== 'undefined'
            ? window.localStorage.getItem('themeMode')
            : null;
        if (saved === 'dark') return true;
        if (saved === 'light') return false;
        return prefersDark;
    });

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('themeMode', isDark ? 'dark' : 'light');
        }
    }, [isDark]);

    const toggleTheme = React.useCallback(() => {
        setIsDark(v => !v);
    }, []);

    return (
        <ThemeProvider theme={isDark ? DARK_THEME : LIGHT_THEME}>
            <BrowserRouter>
                <StyledApp>
                    <Sidebar />
                    <StyledMain>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route
                                path="/transactions"
                                element={
                                    <Transactions
                                        userId="Fake-ID"
                                        isDark={isDark}
                                        onToggleTheme={toggleTheme}
                                    />
                                }
                            />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </StyledMain>
                </StyledApp>
            </BrowserRouter>
        </ThemeProvider>
    );
};

const StyledApp = styled.div`
    display: flex;
    height: 100vh;
    overflow: hidden;
    font-family: sans-serif;
`;

const StyledMain = styled.main`
    background-color: ${({ theme }) => theme.background};
+ color: ${({ theme }) => theme.text};
    padding: 32px;
    flex-grow: 1;
    overflow: auto;
`;
