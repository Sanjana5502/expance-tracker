import { createRoot } from 'react-dom/client'
import React from 'react';
import App from './App.jsx'
import { GlobalProvider } from './context/globalContext';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import { GlobalStyle } from './styles/GlobalStyle';
import { BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <GlobalStyle />
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider> 
        <GlobalProvider>
          <App />
        </GlobalProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
)
