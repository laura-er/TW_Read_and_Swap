import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { SwapProvider } from '@/context/SwapContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { NotificationsProvider } from '@/context/NotificationsContext';
import { ReportsProvider } from '@/context/ReportsContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { router } from './router';

export function App() {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <AuthProvider>
                    <NotificationsProvider>
                        <ReportsProvider>
                            <FavoritesProvider>
                                <SwapProvider>
                                    <RouterProvider router={router} />
                                </SwapProvider>
                            </FavoritesProvider>
                        </ReportsProvider>
                    </NotificationsProvider>
                </AuthProvider>
            </LanguageProvider>
        </ThemeProvider>
    );
}
