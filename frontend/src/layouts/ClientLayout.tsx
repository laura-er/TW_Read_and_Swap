import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/client/Navbar';
import { LoginPromptModal } from '@/components/ui/LoginPromptModal';
import { useFavorites } from '@/context/FavoritesContext';

export function ClientLayout() {
    const { showLoginModal, closeLoginModal } = useFavorites();

    return (
        <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
            <Navbar />
            <main className="flex-1 w-full mx-auto max-w-7xl px-4 sm:px-6 py-8">
                <Outlet />
            </main>
            <LoginPromptModal isOpen={showLoginModal} onClose={closeLoginModal} />
        </div>
    );
}
