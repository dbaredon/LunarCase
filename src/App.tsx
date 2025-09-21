import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { LIGHT_THEME } from './framework/theme';
import { Transactions } from './app/transactions/Transactions';
import { Sidebar } from './app/sidebar/Sidebar';
import { Home } from './app/home/Home';

export const App = () => {
  return (
    <ThemeProvider theme={LIGHT_THEME}>
      <BrowserRouter>
        <StyledApp>
          <Sidebar />
          <StyledMain>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/transactions"
                element={<Transactions userId="Fake-ID" />}
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
  padding: 32px;
  flex-grow: 1;
  overflow: auto;
`;
