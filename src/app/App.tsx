import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { SwapProvider } from '@/context/SwapContext';
import { router } from './router';

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
          <SwapProvider>
              <RouterProvider router={router} />
          </SwapProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
