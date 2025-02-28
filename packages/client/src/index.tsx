import 'core-js';
import 'normalize.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import { io } from 'socket.io-client';
import { Router } from './pages/router';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/auth.provider';

export const socket = io('ws://localhost:4000', {
  ackTimeout: 10000,
  retries: 3,
});

socket.on('connect', () => {
  console.log('WebSocket connected');
});

const GlobalStyles = createGlobalStyle`
  body {
    font-family: sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: #171a21
  }
`;

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <GlobalStyles />
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
