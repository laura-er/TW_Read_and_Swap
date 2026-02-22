import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { SwapProvider } from '@/context/SwapContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { router } from './router';

export function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <FavoritesProvider>
                    <SwapProvider>
                        <RouterProvider router={router} />
                    </SwapProvider>
                </FavoritesProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}
