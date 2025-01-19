import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ThemeToggle } from './components/ThemeToggle';
import { ThemeProvider } from './contexts/ThemeContext';
import { Routes } from './Routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background text-foreground">
            <ThemeToggle />
            <main className="container mx-auto flex items-center justify-center min-h-screen">
              <Routes />
            </main>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;