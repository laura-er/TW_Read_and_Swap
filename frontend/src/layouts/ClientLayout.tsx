import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/client/Navbar';
import { LoginPromptModal } from '@/components/ui/LoginPromptModal';
import { useFavorites } from '@/context/FavoritesContext';

export function ClientLayout() {
    const { showLoginModal, closeLoginModal } = useFavorites();

    return (
        <div className="min-h-screen flex flex-col" style={{ background: "transparent" }}>
            <Navbar />
            <main className="flex-1 w-full">
                <Outlet />
            </main>
            <LoginPromptModal isOpen={showLoginModal} onClose={closeLoginModal} />
        </div>
    );
}