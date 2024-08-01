import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx'
import './index.css';
import { Navbar } from './components/Navbar/index.tsx';
import { Footer } from './components/Footer/index.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <App />
        <Footer />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
